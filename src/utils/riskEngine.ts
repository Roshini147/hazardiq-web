/**
 * HAZARDIQ Explainable Risk Engine
 * Implements deterministic mathematical indexing for multi-hazard risk assessment.
 * Note: No fake "99.9% AI accuracy" claims; clear explainable weighted factor model.
 */

export interface RiskFactorsInput {
  hazardSeverity: number;   // 0 - 100 (e.g. Inundation depth, tidal surge, chemical toxicity)
  populationExposure: number; // 0 - 100 (Density and raw count exposed)
  vulnerabilityIndex: number; // 0 - 100 (Proportion of children, elderly, persons with disabilities)
  historicalDisasterFreq: number; // 0 - 100 (Flooding frequency over past 10 years)
  evacuationBottleneck: number;   // 0 - 100 (Road constriction, lack of flyovers/arterials)
}

export interface RiskScoreResult {
  compositeScore: number;     // 0 - 100
  riskCategory: 'Critical' | 'High' | 'Moderate' | 'Low';
  priorityLevel: 'P1 — IMMEDIATE' | 'P2 — WITHIN 6 HRS' | 'P3 — PREPARE' | 'P4 — MONITOR';
  priorityCode: 'P1' | 'P2' | 'P3' | 'P4';
  breakdown: {
    hazardComponent: number;
    exposureComponent: number;
    vulnerabilityComponent: number;
    historicalComponent: number;
    bottleneckComponent: number;
  };
  explanation: string;
}

export function calculateRiskScore(factors: RiskFactorsInput): RiskScoreResult {
  // Explainable Weights: Hazard (35%), Vulnerability (25%), Exposure (20%), Bottleneck (10%), History (10%)
  const wHazard = 0.35;
  const wVuln = 0.25;
  const wExpo = 0.20;
  const wBottle = 0.10;
  const wHist = 0.10;

  const hComp = factors.hazardSeverity * wHazard;
  const vComp = factors.vulnerabilityIndex * wVuln;
  const eComp = factors.populationExposure * wExpo;
  const bComp = factors.evacuationBottleneck * wBottle;
  const histComp = factors.historicalDisasterFreq * wHist;

  const rawScore = hComp + vComp + eComp + bComp + histComp;
  const compositeScore = Math.min(100, Math.max(0, Math.round(rawScore)));

  let riskCategory: RiskScoreResult['riskCategory'] = 'Low';
  let priorityLevel: RiskScoreResult['priorityLevel'] = 'P4 — MONITOR';
  let priorityCode: RiskScoreResult['priorityCode'] = 'P4';

  if (compositeScore >= 85) {
    riskCategory = 'Critical';
    priorityLevel = 'P1 — IMMEDIATE';
    priorityCode = 'P1';
  } else if (compositeScore >= 70) {
    riskCategory = 'High';
    priorityLevel = 'P2 — WITHIN 6 HRS';
    priorityCode = 'P2';
  } else if (compositeScore >= 50) {
    riskCategory = 'Moderate';
    priorityLevel = 'P3 — PREPARE';
    priorityCode = 'P3';
  }

  const explanation =
    `Composite Risk Score ${compositeScore}/100 computed from: ` +
    `Hazard Severity (${factors.hazardSeverity} * 35%) + Vulnerability (${factors.vulnerabilityIndex} * 25%) + ` +
    `Exposure (${factors.populationExposure} * 20%) + Access Bottleneck (${factors.evacuationBottleneck} * 10%) + ` +
    `Historical Recurrence (${factors.historicalDisasterFreq} * 10%). Deterministic mathematical weighting.`;

  return {
    compositeScore,
    riskCategory,
    priorityLevel,
    priorityCode,
    breakdown: {
      hazardComponent: Math.round(hComp * 10) / 10,
      exposureComponent: Math.round(eComp * 10) / 10,
      vulnerabilityComponent: Math.round(vComp * 10) / 10,
      historicalComponent: Math.round(histComp * 10) / 10,
      bottleneckComponent: Math.round(bComp * 10) / 10,
    },
    explanation,
  };
}
