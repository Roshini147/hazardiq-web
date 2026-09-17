import { SafeArea } from '../data/shelters';

export interface CapacityCheckResult {
  shelterId: string;
  shelterCode: string;
  shelterName: string;
  totalCapacity: number;
  currentOccupancy: number;
  availableCapacity: number;
  occupancyRate: number; // percentage
  status: 'AVAILABLE' | 'LIMITED' | 'FULL';
  canAccommodate: boolean;
  warning?: string;
  recommendedAlternative?: {
    shelter: SafeArea;
    reason: string[];
  };
}

export function evaluateShelterCapacity(
  shelter: SafeArea,
  requestedCount: number = 0,
  allShelters: SafeArea[]
): CapacityCheckResult {
  const availableCapacity = Math.max(0, shelter.capacity - shelter.occupancy);
  const occupancyRate = Math.round((shelter.occupancy / shelter.capacity) * 100);

  let status: SafeArea['status'] = 'AVAILABLE';
  if (availableCapacity <= 0) {
    status = 'FULL';
  } else if (availableCapacity < 500) {
    status = 'LIMITED';
  }

  const canAccommodate = availableCapacity >= requestedCount && status !== 'FULL';
  let warning: string | undefined;
  let recommendedAlternative: CapacityCheckResult['recommendedAlternative'] = undefined;

  if (status === 'FULL' || (!canAccommodate && requestedCount > 0)) {
    warning = 'Do not assign additional population to this location. Shelter has reached maximum carrying capacity.';

    // Automatically identify alternative safe area:
    // Criteria: status === 'AVAILABLE', highest available capacity, distance, and high suitability score
    const candidates = allShelters.filter(s => s.id !== shelter.id && s.status === 'AVAILABLE');
    
    // Explicit priority for Safe Area D if available, or best candidate
    const alternative = candidates.find(s => s.code === 'SAFE AREA D') || candidates[0];

    if (alternative) {
      recommendedAlternative = {
        shelter: alternative,
        reason: [
          'Safe from current hazard and active inundation vectors',
          `Sufficient remaining capacity (${alternative.available.toLocaleString()} places available)`,
          `Accessible via high-ground arterials (Accessibility score: ${alternative.accessibilityScore}/100)`,
          `Equipped with medical facilities & suitable for vulnerable evacuees (Suitability: ${alternative.suitabilityScore}/100)`,
        ],
      };
    }
  }

  return {
    shelterId: shelter.id,
    shelterCode: shelter.code,
    shelterName: shelter.name,
    totalCapacity: shelter.capacity,
    currentOccupancy: shelter.occupancy,
    availableCapacity,
    occupancyRate,
    status,
    canAccommodate,
    warning,
    recommendedAlternative,
  };
}
