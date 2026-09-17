import { SafeArea } from '../data/shelters';
import { RiskZone } from '../data/hazards';

export interface RelocationPriorityScore {
  habitationOrZoneName: string;
  score: number; // 0 - 100
  priorityLevel: 'P1 — IMMEDIATE' | 'P2 — WITHIN 6 HRS' | 'P3 — PREPARE' | 'P4 — MONITOR';
  priorityCode: 'P1' | 'P2' | 'P3' | 'P4';
  factors: {
    hazardSeverity: number;
    populationExposure: number;
    vulnerability: number;
    historicalRisk: number;
    accessibility: number;
  };
  explanation: string;
}

export interface ShelterAllocationItem {
  shelterId: string;
  shelterCode: string;
  shelterName: string;
  distanceKm: number;
  availableCapacity: number;
  allocatedCount: number;
  remainingCapacityAfter: number;
  status: 'ALLOCATED' | 'RESERVE';
}

export interface RelocationPlanResult {
  zoneCode: string;
  zoneName: string;
  populationRequiringRelocation: number;
  priority: string;
  recommendedSafeAreas: ShelterAllocationItem[];
  totalAvailableCapacity: number;
  totalAllocated: number;
  deficit: number;
  isFeasible: boolean;
  statusText: string;
  officialRecommendation: string;
}

export function calculateRelocationPriority(
  zoneName: string,
  factors: {
    hazardSeverity: number;
    populationExposure: number;
    vulnerability: number;
    historicalRisk: number;
    accessibility: number; // lower accessibility = higher urgency/score
  }
): RelocationPriorityScore {
  // Invert accessibility for risk calculation: poor access increases relocation urgency
  const accessUrgency = 100 - factors.accessibility;

  // Weightings: Vulnerability 30%, Hazard 25%, Exposure 20%, Historical 15%, Access Urgency 10%
  const composite =
    factors.vulnerability * 0.30 +
    factors.hazardSeverity * 0.25 +
    factors.populationExposure * 0.20 +
    factors.historicalRisk * 0.15 +
    accessUrgency * 0.10;

  const score = Math.min(100, Math.max(0, Math.round(composite)));

  let priorityLevel: RelocationPriorityScore['priorityLevel'] = 'P4 — MONITOR';
  let priorityCode: RelocationPriorityScore['priorityCode'] = 'P4';

  if (score >= 85) {
    priorityLevel = 'P1 — IMMEDIATE';
    priorityCode = 'P1';
  } else if (score >= 70) {
    priorityLevel = 'P2 — WITHIN 6 HRS';
    priorityCode = 'P2';
  } else if (score >= 50) {
    priorityLevel = 'P3 — PREPARE';
    priorityCode = 'P3';
  }

  return {
    habitationOrZoneName: zoneName,
    score,
    priorityLevel,
    priorityCode,
    factors,
    explanation:
      `Priority score ${score}/100 calculated from Vulnerability (${factors.vulnerability}), ` +
      `Hazard Severity (${factors.hazardSeverity}), Population Exposure (${factors.populationExposure}), ` +
      `Historical Risk (${factors.historicalRisk}), and Evacuation Bottlenecks.`,
  };
}

export function generateRelocationPlan(
  zone: RiskZone,
  shelters: SafeArea[]
): RelocationPlanResult {
  const reqPop = zone.exposedPopulation;
  
  // Filter out FULL shelters
  const eligibleShelters = shelters
    .filter(s => s.status !== 'FULL' && s.available > 0)
    .sort((a, b) => {
      // Sort by suitability * accessibility / distance
      const scoreA = (a.suitabilityScore + a.accessibilityScore) / Math.max(1, a.distanceKm);
      const scoreB = (b.suitabilityScore + b.accessibilityScore) / Math.max(1, b.distanceKm);
      return scoreB - scoreA;
    });

  let remainingToAllocate = reqPop;
  let totalAvailableInEligible = 0;
  const allocations: ShelterAllocationItem[] = [];

  for (const s of eligibleShelters) {
    totalAvailableInEligible += s.available;
    const canTake = Math.min(remainingToAllocate, s.available);
    if (canTake > 0) {
      allocations.push({
        shelterId: s.id,
        shelterCode: s.code,
        shelterName: s.name,
        distanceKm: s.distanceKm,
        availableCapacity: s.available,
        allocatedCount: canTake,
        remainingCapacityAfter: s.available - canTake,
        status: 'ALLOCATED',
      });
      remainingToAllocate -= canTake;
    } else if (allocations.length < 4) {
      allocations.push({
        shelterId: s.id,
        shelterCode: s.code,
        shelterName: s.name,
        distanceKm: s.distanceKm,
        availableCapacity: s.available,
        allocatedCount: 0,
        remainingCapacityAfter: s.available,
        status: 'RESERVE',
      });
    }
  }

  const isFeasible = remainingToAllocate === 0;
  const totalAllocated = reqPop - remainingToAllocate;

  return {
    zoneCode: zone.code,
    zoneName: zone.name,
    populationRequiringRelocation: reqPop,
    priority: zone.priority,
    recommendedSafeAreas: allocations,
    totalAvailableCapacity: totalAvailableInEligible,
    totalAllocated,
    deficit: remainingToAllocate,
    isFeasible,
    statusText: isFeasible ? 'FEASIBLE 🟢' : 'CAPACITY DEFICIT 🔴',
    officialRecommendation:
      'Distribute the affected population across suitable safe areas based on remaining capacity, safety, and accessibility.',
  };
}
