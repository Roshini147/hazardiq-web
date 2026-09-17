export interface RiskZone {
  id: string;
  name: string;
  code: string;
  areaName: string;
  riskLevel: 'Critical' | 'High' | 'Moderate' | 'Low';
  hazardType: string;
  riskScore: number;
  exposedPopulation: number;
  households: number;
  vulnerableGroups: {
    children: number;
    elderly: number;
    pwd: number; // persons with disabilities
    otherVulnerable: number;
  };
  priority: 'P1 — IMMEDIATE' | 'P2 — WITHIN 6 HRS' | 'P3 — PREPARE' | 'P4 — MONITOR';
  priorityCode: 'P1' | 'P2' | 'P3' | 'P4';
  riskFactors: string[];
  historicalRisk: number;
  accessibilityScore: number;
  color: string;
  coordinates: [number, number][]; // Polygon coordinates [lat, lng]
  center: [number, number];
  recommendedAction: string;
  lastUpdated: string;
}

export const CHENNAI_RISK_ZONES: RiskZone[] = [
  {
    id: 'zone-a',
    code: 'ZONE A',
    name: 'Zone A — Velachery & Pallikaranai Marsh Basin',
    areaName: 'Velachery - Pallikaranai Sector',
    riskLevel: 'Critical',
    hazardType: 'Flood + Coastal Exposure',
    riskScore: 91,
    exposedPopulation: 4200,
    households: 1050,
    vulnerableGroups: {
      children: 520,
      elderly: 380,
      pwd: 95,
      otherVulnerable: 650,
    },
    priority: 'P1 — IMMEDIATE',
    priorityCode: 'P1',
    riskFactors: [
      'High hazard intensity (Extreme Inundation Zone)',
      'Dense low-lying habitation',
      'High vulnerable population concentration',
      'Limited evacuation arterial access',
      'Previous disaster exposure (2015 & 2023 flood history)',
    ],
    historicalRisk: 88,
    accessibilityScore: 58,
    color: '#dc2626', // Red
    center: [12.975, 80.222],
    coordinates: [
      [12.985, 80.210],
      [12.992, 80.235],
      [12.968, 80.245],
      [12.958, 80.225],
      [12.970, 80.205],
    ],
    recommendedAction: 'Immediate phased evacuation to Safe Area A & Safe Area D relief centres.',
    lastUpdated: '10 mins ago',
  },
  {
    id: 'zone-b',
    code: 'ZONE B',
    name: 'Zone B — Manali & Ennore Lowland Corridor',
    areaName: 'Manali - Ennore Industrial Lowlands',
    riskLevel: 'High',
    hazardType: 'Industrial Runoff + Severe Waterlogging',
    riskScore: 78,
    exposedPopulation: 3100,
    households: 775,
    vulnerableGroups: {
      children: 390,
      elderly: 270,
      pwd: 65,
      otherVulnerable: 420,
    },
    priority: 'P2 — WITHIN 6 HRS',
    priorityCode: 'P2',
    riskFactors: [
      'Chemical runoff risk mixed with flood waters',
      'Water ingress from Buckingham Canal',
      'Moderate elderly and child population density',
      'Single primary evacuation corridor',
    ],
    historicalRisk: 75,
    accessibilityScore: 68,
    color: '#ea580c', // Orange
    center: [13.162, 80.265],
    coordinates: [
      [13.175, 80.245],
      [13.185, 80.278],
      [13.155, 80.292],
      [13.142, 80.262],
      [13.152, 80.242],
    ],
    recommendedAction: 'Stage emergency transport teams. Prepare relocation within 6 hours.',
    lastUpdated: '25 mins ago',
  },
  {
    id: 'zone-c',
    code: 'ZONE C',
    name: 'Zone C — Saidapet & Adyar Riverbank',
    areaName: 'Saidapet Adyar Basin',
    riskLevel: 'Moderate',
    hazardType: 'Riverine Surge + Secondary Waterlogging',
    riskScore: 64,
    exposedPopulation: 2800,
    households: 700,
    vulnerableGroups: {
      children: 310,
      elderly: 240,
      pwd: 48,
      otherVulnerable: 350,
    },
    priority: 'P3 — PREPARE',
    priorityCode: 'P3',
    riskFactors: [
      'Chembarambakkam reservoir discharge exposure',
      'Riverbank proximity within 150m',
      'Secondary storm drain overflow',
    ],
    historicalRisk: 70,
    accessibilityScore: 74,
    color: '#eab308', // Yellow
    center: [13.018, 80.228],
    coordinates: [
      [13.028, 80.218],
      [13.032, 80.242],
      [13.008, 80.248],
      [12.998, 80.225],
      [13.010, 80.212],
    ],
    recommendedAction: 'Issue advisory. Position rescue boats along Adyar river causeway.',
    lastUpdated: '40 mins ago',
  },
  {
    id: 'zone-d',
    code: 'ZONE D',
    name: 'Zone D — Royapuram & Coastal Harbor Belt',
    areaName: 'Royapuram Coastal Belt',
    riskLevel: 'Critical',
    hazardType: 'Coastal Storm Surge + High Tide Inundation',
    riskScore: 89,
    exposedPopulation: 3800,
    households: 950,
    vulnerableGroups: {
      children: 480,
      elderly: 330,
      pwd: 82,
      otherVulnerable: 580,
    },
    priority: 'P1 — IMMEDIATE',
    priorityCode: 'P1',
    riskFactors: [
      'Direct oceanic wave overtopping risk',
      'High settlement density along shoreline',
      'Fisherfolk settlements with semi-pucca dwellings',
      'Severe seawater intrusion into access roads',
    ],
    historicalRisk: 84,
    accessibilityScore: 54,
    color: '#dc2626', // Red
    center: [13.108, 80.295],
    coordinates: [
      [13.125, 80.285],
      [13.135, 80.308],
      [13.095, 80.315],
      [13.085, 80.292],
      [13.100, 80.280],
    ],
    recommendedAction: 'Execute coastal shoreline evacuation to regional inland relief hub.',
    lastUpdated: '15 mins ago',
  },
  {
    id: 'zone-e',
    code: 'ZONE E',
    name: 'Zone E — Guindy & Alandur Elevated Zone',
    areaName: 'Guindy - Alandur Ridge',
    riskLevel: 'Low',
    hazardType: 'Localized Surface Runoff',
    riskScore: 32,
    exposedPopulation: 1900,
    households: 475,
    vulnerableGroups: {
      children: 180,
      elderly: 140,
      pwd: 22,
      otherVulnerable: 180,
    },
    priority: 'P4 — MONITOR',
    priorityCode: 'P4',
    riskFactors: [
      'Elevated topographical contour (+16m MSL)',
      'Natural drainage gradient towards Adyar',
      'Modern stormwater network intact',
    ],
    historicalRisk: 30,
    accessibilityScore: 92,
    color: '#16a34a', // Green
    center: [13.002, 80.202],
    coordinates: [
      [13.015, 80.188],
      [13.022, 80.212],
      [12.990, 80.220],
      [12.980, 80.198],
      [12.992, 80.182],
    ],
    recommendedAction: 'Routine monitoring. Zone suitable for transit logistical staging.',
    lastUpdated: '1 hour ago',
  },
];
