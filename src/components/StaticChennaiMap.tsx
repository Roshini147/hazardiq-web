import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  AlertTriangle,
  Building2,
  Hospital,
  Eye,
  EyeOff,
  RotateCcw,
  Layers,
  MapPin,
  Wind,
  Droplets,
  Flame,
  Users,
  Compass,
  ArrowUpRight,
  Info,
  Maximize2,
  CheckCircle2,
} from 'lucide-react';

export type HazardFilterType =
  | 'all'
  | 'flood'
  | 'cyclone'
  | 'multi-hazard'
  | 'vulnerability'
  | 'exposure'
  | 'carrying-capacity'
  | 'relocation-priority';

export interface StaticZoneOverlay {
  id: string;
  name: string;
  nameTa: string;
  code: string;
  areaName: string;
  riskLevel: 'Extreme Risk' | 'High Risk' | 'Moderate Risk' | 'Low Risk';
  hazardType: 'Flood' | 'Cyclone' | 'Multi-Hazard';
  riskScore: number;
  exposedPopulation: number;
  households: number;
  vulnerabilityScore: number;
  carryingCapacity: number;
  capacityDeficit: number;
  availableShelterCapacity: number;
  relocationPriority: 'P1 — IMMEDIATE' | 'P2 — WITHIN 6 HRS' | 'P3 — PREPARE' | 'P4 — MONITOR';
  recommendedAction: string;
  recommendedActionTa: string;
  points: string; // SVG polygon points
  center: { x: number; y: number };
  color: string;
}

export const CHENNAI_STATIC_ZONES: StaticZoneOverlay[] = [
  {
    id: 'zone-velachery-pallikaranai',
    name: 'Zone XIV — Velachery & Pallikaranai Marsh Basin',
    nameTa: 'மண்டலம் XIV — வேளச்சேரி & பள்ளிக்கரணை சதுப்புநிலப் பகுதி',
    code: 'ZONE A',
    areaName: 'Pallikaranai - Velachery Sector',
    riskLevel: 'Extreme Risk',
    hazardType: 'Flood',
    riskScore: 94,
    exposedPopulation: 4200,
    households: 1050,
    vulnerabilityScore: 92,
    carryingCapacity: 2500,
    capacityDeficit: 1700,
    availableShelterCapacity: 2600,
    relocationPriority: 'P1 — IMMEDIATE',
    recommendedAction: 'Mandatory immediate evacuation. Divert evacuees to Safe Area D (Guindy Hub).',
    recommendedActionTa: 'கட்டாய உடனடி வெளியேற்றம். மக்களை கிண்டி நிவாரண முகாமுக்கு (Safe Area D) நகர்த்தவும்.',
    points: '335,465 410,480 435,560 380,615 330,550 315,485',
    center: { x: 375, y: 535 },
    color: '#dc2626', // Red
  },
  {
    id: 'zone-royapuram-coastal',
    name: 'Zone IV — Royapuram Harbor Foreshore & Coastal Zone',
    nameTa: 'மண்டலம் IV — ராயபுரம் துறைமுகக் கரையோரப் பகுதி',
    code: 'ZONE D',
    areaName: 'Royapuram Coastal',
    riskLevel: 'Extreme Risk',
    hazardType: 'Cyclone',
    riskScore: 89,
    exposedPopulation: 3800,
    households: 920,
    vulnerabilityScore: 86,
    carryingCapacity: 3000,
    capacityDeficit: 800,
    availableShelterCapacity: 2200,
    relocationPriority: 'P1 — IMMEDIATE',
    recommendedAction: 'High astronomical wave surge of 3.2m. Coastal egress to Safe Area F (Stadium Complex).',
    recommendedActionTa: '3.2 மீ புயல் அலை அபாயம். கரையோர மக்கள் ஜவஹர்லால் நேரு அரங்கு முகாமுக்கு செல்லவும்.',
    points: '465,160 525,170 545,230 495,255 455,210',
    center: { x: 495, y: 205 },
    color: '#dc2626',
  },
  {
    id: 'zone-manali-ennore',
    name: 'Zone II — Manali & Ennore Lowland Industrial Corridor',
    nameTa: 'மண்டலம் II — மணலி & எண்ணூர் தாழ்வான தொழிற்பேட்டை பகுதி',
    code: 'ZONE B',
    areaName: 'Manali Lowlands',
    riskLevel: 'High Risk',
    hazardType: 'Multi-Hazard',
    riskScore: 82,
    exposedPopulation: 3100,
    households: 775,
    vulnerabilityScore: 78,
    carryingCapacity: 2500,
    capacityDeficit: 600,
    availableShelterCapacity: 1350,
    relocationPriority: 'P2 — WITHIN 6 HRS',
    recommendedAction: 'Chemical buffer flood ingress. Move vulnerable households to Safe Area E (Perambur Hall).',
    recommendedActionTa: 'தொழிற்சாலை நீர் தேக்க அபாயம். மக்களை பெரம்பூர் முகாமுக்கு (Safe Area E) மாற்றவும்.',
    points: '435,20 525,25 540,80 470,95 425,50',
    center: { x: 480, y: 55 },
    color: '#ea580c', // Orange
  },
  {
    id: 'zone-saidapet-adyar',
    name: 'Zone XIII — Saidapet & Adyar Riverbank Corridor',
    nameTa: 'மண்டலம் XIII — சைதாப்பேட்டை & அடையாறு நதிக்கரை பகுதி',
    code: 'ZONE C',
    areaName: 'Saidapet Adyar Basin',
    riskLevel: 'High Risk',
    hazardType: 'Flood',
    riskScore: 76,
    exposedPopulation: 2800,
    households: 700,
    vulnerabilityScore: 68,
    carryingCapacity: 2800,
    capacityDeficit: 0,
    availableShelterCapacity: 1600,
    relocationPriority: 'P2 — WITHIN 6 HRS',
    recommendedAction: 'Riverine overflow warning. Stage emergency rescue boats at Saidapet bridge.',
    recommendedActionTa: 'அடையாறு நதி நீர்மட்டம் உயர்வு எச்சரிக்கை. சைதாப்பேட்டை பாலத்தில் படகுகளை தயார் நிலையில் வைக்கவும்.',
    points: '330,365 425,385 435,430 355,415 320,385',
    center: { x: 370, y: 395 },
    color: '#ea580c',
  },
  {
    id: 'zone-tambaram-chromepet',
    name: 'Zone XII — Tambaram & Chromepet Low-Lying Catchment',
    nameTa: 'மண்டலம் XII — தாம்பரம் & குரோம்பேட்டை தாழ்வான வடிகால் பகுதி',
    code: 'ZONE E',
    areaName: 'Tambaram Basin',
    riskLevel: 'High Risk',
    hazardType: 'Flood',
    riskScore: 78,
    exposedPopulation: 3600,
    households: 880,
    vulnerabilityScore: 72,
    carryingCapacity: 3000,
    capacityDeficit: 600,
    availableShelterCapacity: 1700,
    relocationPriority: 'P2 — WITHIN 6 HRS',
    recommendedAction: 'Flash inundation in railway underpass basins. Redirect to Safe Area G (Tambaram Sanatorium).',
    recommendedActionTa: 'திடீர் வெள்ளப்பெருக்கு எச்சரிக்கை. மக்களை தாம்பரம் சானடோரியம் முகாமுக்கு வழிகாட்டவும்.',
    points: '90,540 180,530 200,620 130,650 80,600',
    center: { x: 140, y: 590 },
    color: '#ea580c',
  },
  {
    id: 'zone-ambattur-korattur',
    name: 'Zone VII — Ambattur & Korattur Lake Basin',
    nameTa: 'மண்டலம் VII — அம்பத்தூர் & கொரட்டூர் ஏரிப் பகுதி',
    code: 'ZONE F',
    areaName: 'Ambattur Corridor',
    riskLevel: 'Moderate Risk',
    hazardType: 'Multi-Hazard',
    riskScore: 62,
    exposedPopulation: 2100,
    households: 520,
    vulnerabilityScore: 56,
    carryingCapacity: 2200,
    capacityDeficit: 0,
    availableShelterCapacity: 1300,
    relocationPriority: 'P3 — PREPARE',
    recommendedAction: 'Lake surplus sluice gates activated. Issue preparatory advisory to low-lying industrial habitations.',
    recommendedActionTa: 'ஏரி உபரி நீர் திறப்பு. தாழ்வான குடியிருப்புகளுக்கு ஆயத்த எச்சரிக்கை விடுக்கவும்.',
    points: '140,135 225,140 235,190 160,205 130,170',
    center: { x: 185, y: 170 },
    color: '#2563eb', // Blue
  },
  {
    id: 'zone-mylapore-marina',
    name: 'Zone IX — Mylapore & Marina Foreshore Ingress Buffer',
    nameTa: 'மண்டலம் IX — மயிலாப்பூர் & மெரினா கடற்கரை முகப்பு பகுதி',
    code: 'ZONE G',
    areaName: 'Mylapore Foreshore',
    riskLevel: 'Moderate Risk',
    hazardType: 'Cyclone',
    riskScore: 68,
    exposedPopulation: 2900,
    households: 710,
    vulnerabilityScore: 64,
    carryingCapacity: 3000,
    capacityDeficit: 0,
    availableShelterCapacity: 1600,
    relocationPriority: 'P3 — PREPARE',
    recommendedAction: 'Tidal ingress warning along foreshore estate. Prohibit shore activity.',
    recommendedActionTa: 'கடல் நீர் உட்புகும் எச்சரிக்கை. கடற்கரை பகுதிகளை தடை செய்யவும்.',
    points: '445,305 505,315 520,385 460,380 435,335',
    center: { x: 475, y: 345 },
    color: '#2563eb',
  },
  {
    id: 'zone-madhavaram',
    name: 'Zone III — Madhavaram Catchment & Red Hills Runoff',
    nameTa: 'மண்டலம் III — மாதவரம் & செங்குன்றம் உபரி நீர் பகுதி',
    code: 'ZONE H',
    areaName: 'Madhavaram',
    riskLevel: 'Low Risk',
    hazardType: 'Multi-Hazard',
    riskScore: 46,
    exposedPopulation: 1800,
    households: 450,
    vulnerabilityScore: 42,
    carryingCapacity: 2500,
    capacityDeficit: 0,
    availableShelterCapacity: 1800,
    relocationPriority: 'P4 — MONITOR',
    recommendedAction: 'Normal drainage capacity monitored. Maintain routine telemetry.',
    recommendedActionTa: 'இயல்பான வடிகால் நிலை கண்காணிக்கப்படுகிறது. தொலை அளவீட்டை தொடரவும்.',
    points: '285,60 365,65 375,115 305,125 275,85',
    center: { x: 325, y: 90 },
    color: '#059669', // Emerald/Green
  },
  {
    id: 'zone-koyambedu',
    name: 'Zone V — Koyambedu & Cooum Overflow Corridor',
    nameTa: 'மண்டலம் V — கோயம்பேடு & கூவம் ஆற்றுப்பகுதி',
    code: 'ZONE I',
    areaName: 'Koyambedu',
    riskLevel: 'Moderate Risk',
    hazardType: 'Flood',
    riskScore: 58,
    exposedPopulation: 2300,
    households: 570,
    vulnerabilityScore: 54,
    carryingCapacity: 2400,
    capacityDeficit: 0,
    availableShelterCapacity: 1500,
    relocationPriority: 'P3 — PREPARE',
    recommendedAction: 'Monitor Cooum weir discharge. Clear storm water outfalls.',
    recommendedActionTa: 'கூவம் ஆற்று நீர் வெளியேற்றத்தை கண்காணிக்கவும்.',
    points: '210,235 285,245 295,295 220,300 195,265',
    center: { x: 245, y: 270 },
    color: '#2563eb',
  },
  {
    id: 'zone-thiruvanmiyur',
    name: 'Zone XIII-S — Thiruvanmiyur & Perungudi Coastal Buffer',
    nameTa: 'மண்டலம் XIII-தெற்கு — திருவான்மியூர் & பெருங்குடி கரையோர பகுதி',
    code: 'ZONE J',
    areaName: 'Thiruvanmiyur - Perungudi',
    riskLevel: 'Low Risk',
    hazardType: 'Cyclone',
    riskScore: 42,
    exposedPopulation: 1400,
    households: 350,
    vulnerabilityScore: 36,
    carryingCapacity: 2000,
    capacityDeficit: 0,
    availableShelterCapacity: 1400,
    relocationPriority: 'P4 — MONITOR',
    recommendedAction: 'Coastal wind gusts monitored. Keep community halls ready.',
    recommendedActionTa: 'கடலோர காற்று வேகம் கண்காணிக்கப்படுகிறது. சமூகக் கூடங்களை தயார் நிலையில் வைக்கவும்.',
    points: '390,465 455,470 465,540 405,545 380,500',
    center: { x: 425, y: 505 },
    color: '#059669',
  },
];

export interface StaticEvacuationRoute {
  id: string;
  name: string;
  nameTa: string;
  from: string;
  to: string;
  d: string; // SVG path data
  color: string;
}

export const CHENNAI_EVACUATION_ROUTES: StaticEvacuationRoute[] = [
  {
    id: 'route-1',
    name: 'Arterial Corridor 1: Pallikaranai → Guindy Safe Hub',
    nameTa: 'வெளியேற்றப் பாதை 1: பள்ளிக்கரணை → கிண்டி பாதுகாப்பான மையம்',
    from: 'Pallikaranai Marsh',
    to: 'Safe Area D (Guindy)',
    d: 'M 375,535 Q 340,490 315,420',
    color: '#dc2626',
  },
  {
    id: 'route-2',
    name: 'Arterial Corridor 2: Velachery → Bypass Elevated Hub',
    nameTa: 'வெளியேற்றப் பாதை 2: வேளச்சேரி → பைபாஸ் மேம்பால முகாம்',
    from: 'Velachery Lowlands',
    to: 'Safe Area A (Velachery Bypass)',
    d: 'M 365,495 Q 355,485 345,475',
    color: '#ea580c',
  },
  {
    id: 'route-3',
    name: 'Arterial Corridor 3: Royapuram Coastal → Stadium Center',
    nameTa: 'வெளியேற்றப் பாதை 3: ராயபுரம் → ஜவஹர்லால் நேரு அரங்கம்',
    from: 'Royapuram Foreshore',
    to: 'Safe Area F (J.N Stadium)',
    d: 'M 495,205 Q 480,210 460,215',
    color: '#dc2626',
  },
  {
    id: 'route-4',
    name: 'Arterial Corridor 4: Saidapet → Anna University Safe Complex',
    nameTa: 'வெளியேற்றப் பாதை 4: சைதாப்பேட்டை → அண்ணா பல்கலைக்கழக வளாகம்',
    from: 'Saidapet Adyar Basin',
    to: 'Safe Area B (Anna University)',
    d: 'M 370,395 Q 385,400 400,400',
    color: '#2563eb',
  },
  {
    id: 'route-5',
    name: 'Arterial Corridor 5: Tambaram Basin → Chromepet Elevated Hub',
    nameTa: 'வெளியேற்றப் பாதை 5: தாம்பரம் → குரோம்பேட்டை சானடோரியம் மையம்',
    from: 'Tambaram Lowlands',
    to: 'Safe Area G (Chromepet)',
    d: 'M 140,590 Q 150,565 165,540',
    color: '#ea580c',
  },
  {
    id: 'route-6',
    name: 'Arterial Corridor 6: Manali Corridor → Perambur Hub',
    nameTa: 'வெளியேற்றப் பாதை 6: மணலி → பெரம்பூர் சமூகக் கூடம்',
    from: 'Manali Lowlands',
    to: 'Safe Area E (Perambur)',
    d: 'M 480,55 Q 410,95 360,135',
    color: '#ea580c',
  },
];

export interface StaticShelter {
  id: string;
  name: string;
  nameTa: string;
  code: string;
  ward: string;
  capacity: number;
  occupancy: number;
  available: number;
  status: 'AVAILABLE' | 'LIMITED' | 'FULL';
  coords: { x: number; y: number };
}

export const CHENNAI_STATIC_SHELTERS: StaticShelter[] = [
  { id: 'sh-a', name: 'Safe Area A — Velachery Bypass Elevated Hub', nameTa: 'பாதுகாப்பான இடம் A — வேளச்சேரி பைபாஸ் முகாம்', code: 'SAFE-A', ward: 'Ward 178', capacity: 3000, occupancy: 1200, available: 1800, status: 'AVAILABLE', coords: { x: 345, y: 475 } },
  { id: 'sh-b', name: 'Safe Area B — Anna University Indoor Complex', nameTa: 'பாதுகாப்பான இடம் B — அண்ணா பல்கலைக்கழக வளாகம்', code: 'SAFE-B', ward: 'Ward 170', capacity: 2500, occupancy: 900, available: 1600, status: 'AVAILABLE', coords: { x: 400, y: 400 } },
  { id: 'sh-c', name: 'Safe Area C — Taramani Tech Park Multipurpose Camp', nameTa: 'பாதுகாப்பான இடம் C — தரமணி பல்நோக்கு முகாம்', code: 'SAFE-C', ward: 'Ward 179', capacity: 2500, occupancy: 2500, available: 0, status: 'FULL', coords: { x: 395, y: 485 } },
  { id: 'sh-d', name: 'Safe Area D — Guindy High Grounds Disaster Relief Hub', nameTa: 'பாதுகாப்பான இடம் D — கிண்டி பேரிடர் நிவாரண மையம்', code: 'SAFE-D', ward: 'Ward 168', capacity: 4000, occupancy: 1400, available: 2600, status: 'AVAILABLE', coords: { x: 315, y: 420 } },
  { id: 'sh-e', name: 'Safe Area E — Perambur Railway Community Hall', nameTa: 'பாதுகாப்பான இடம் E — பெரம்பூர் ரயில்வே மண்டபம்', code: 'SAFE-E', ward: 'Ward 71', capacity: 2200, occupancy: 850, available: 1350, status: 'AVAILABLE', coords: { x: 360, y: 135 } },
  { id: 'sh-f', name: 'Safe Area F — Jawaharlal Nehru Stadium Complex', nameTa: 'பாதுகாப்பான இடம் F — ஜவஹர்லால் நேரு அரங்கம்', code: 'SAFE-F', ward: 'Ward 58', capacity: 3500, occupancy: 3100, available: 400, status: 'LIMITED', coords: { x: 460, y: 215 } },
  { id: 'sh-g', name: 'Safe Area G — Tambaram Sanatorium Relief Center', nameTa: 'பாதுகாப்பான இடம் G — தாம்பரம் சானடோரியம் மையம்', code: 'SAFE-G', ward: 'Ward 190', capacity: 2800, occupancy: 1100, available: 1700, status: 'AVAILABLE', coords: { x: 165, y: 540 } },
  { id: 'sh-h', name: 'Safe Area H — Ambattur Industrial Estate Safety Hub', nameTa: 'பாதுகாப்பான இடம் H — அம்பத்தூர் தொழிற்பேட்டை மையம்', code: 'SAFE-H', ward: 'Ward 82', capacity: 2000, occupancy: 700, available: 1300, status: 'AVAILABLE', coords: { x: 185, y: 155 } },
];

export interface StaticHospital {
  id: string;
  name: string;
  nameTa: string;
  beds: string;
  coords: { x: number; y: number };
}

export const CHENNAI_STATIC_HOSPITALS: StaticHospital[] = [
  { id: 'hosp-1', name: 'Rajiv Gandhi Government General Hospital', nameTa: 'ராஜீவ் காந்தி அரசு பொது மருத்துவமனை', beds: '650 Emergency Beds', coords: { x: 470, y: 220 } },
  { id: 'hosp-2', name: 'Government Stanley Medical College Hospital', nameTa: 'அரசு ஸ்டான்லி மருத்துவக் கல்லூரி மருத்துவமனை', beds: '420 Emergency Beds', coords: { x: 480, y: 150 } },
  { id: 'hosp-3', name: 'Government Multi Super Speciality Hospital (Omandurar)', nameTa: 'அரசு பன்னோக்கு உயர் சிறப்பு மருத்துவமனை (ஓமந்தூரார்)', beds: '380 Emergency Beds', coords: { x: 460, y: 260 } },
  { id: 'hosp-4', name: 'Kalaignar Centenary Super Speciality Hospital (Guindy)', nameTa: 'கலைஞர் நூற்றாண்டு உயர் சிறப்பு மருத்துவமனை (கிண்டி)', beds: '500 Trauma Beds', coords: { x: 315, y: 430 } },
  { id: 'hosp-5', name: 'Dr. Kamakshi Memorial Hospital (Pallikaranai)', nameTa: 'டாக்டர் காமாக்ஷி நினைவு மருத்துவமனை (பள்ளிக்கரணை)', beds: '300 Emergency Beds', coords: { x: 350, y: 550 } },
];

interface StaticChennaiMapProps {
  onSelectFeature?: (feature: any) => void;
  selectedZoneId?: string | null;
  activeFilter?: HazardFilterType;
  onFilterChange?: (filter: HazardFilterType) => void;
}

export const StaticChennaiMap: React.FC<StaticChennaiMapProps> = ({
  onSelectFeature,
  selectedZoneId,
  activeFilter: externalFilter,
  onFilterChange,
}) => {
  const { language } = useApp();
  const [internalFilter, setInternalFilter] = useState<HazardFilterType>('all');
  const [hoveredItem, setHoveredItem] = useState<any | null>(null);
  const [showRoutes, setShowRoutes] = useState(true);
  const [showShelters, setShowShelters] = useState(true);
  const [showHospitals, setShowHospitals] = useState(true);
  const [showTacticalOverlays, setShowTacticalOverlays] = useState(true);

  const activeFilter = externalFilter || internalFilter;
  const setFilter = (f: HazardFilterType) => {
    if (onFilterChange) onFilterChange(f);
    else setInternalFilter(f);
  };

  const handleZoneClick = (zone: StaticZoneOverlay) => {
    if (onSelectFeature) {
      onSelectFeature({
        type: 'RISK_AREA',
        data: {
          id: zone.id,
          code: zone.code,
          name: zone.name,
          areaName: zone.areaName,
          riskLevel: zone.riskLevel === 'Extreme Risk' ? 'Critical' : zone.riskLevel === 'High Risk' ? 'High' : zone.riskLevel === 'Moderate Risk' ? 'Moderate' : 'Low',
          hazardType: zone.hazardType,
          riskScore: zone.riskScore,
          exposedPopulation: zone.exposedPopulation,
          households: zone.households,
          vulnerabilityScore: zone.vulnerabilityScore,
          carryingCapacity: zone.carryingCapacity,
          capacityDeficit: zone.capacityDeficit,
          availableShelterCapacity: zone.availableShelterCapacity,
          priority: zone.relocationPriority,
          recommendedAction: language === 'ta' ? zone.recommendedActionTa : zone.recommendedAction,
          vulnerableGroups: {
            children: Math.round(zone.exposedPopulation * 0.12),
            elderly: Math.round(zone.exposedPopulation * 0.09),
            pwd: Math.round(zone.exposedPopulation * 0.02),
            otherVulnerable: Math.round(zone.exposedPopulation * 0.15),
          },
          riskFactors: [
            `${zone.hazardType} Inundation Index`,
            `High vulnerable population concentration (${zone.vulnerabilityScore}%)`,
            `Carrying capacity deficit: ${zone.capacityDeficit} persons`,
            'Restricted arterial egress routes',
          ],
        },
      });
    }
  };

  const handleShelterClick = (shelter: StaticShelter) => {
    if (onSelectFeature) {
      onSelectFeature({
        type: 'SHELTER',
        data: {
          id: shelter.id,
          code: shelter.code,
          name: language === 'ta' ? shelter.nameTa : shelter.name,
          ward: shelter.ward,
          capacity: shelter.capacity,
          occupancy: shelter.occupancy,
          available: shelter.available,
          status: shelter.status,
        },
      });
    }
  };

  // Filter criteria logic
  const isZoneVisible = (zone: StaticZoneOverlay) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'flood') return zone.hazardType === 'Flood';
    if (activeFilter === 'cyclone') return zone.hazardType === 'Cyclone';
    if (activeFilter === 'multi-hazard') return zone.hazardType === 'Multi-Hazard';
    if (activeFilter === 'vulnerability') return zone.vulnerabilityScore >= 60;
    if (activeFilter === 'exposure') return zone.exposedPopulation >= 2500;
    if (activeFilter === 'carrying-capacity') return zone.capacityDeficit > 0 || zone.availableShelterCapacity < 2000;
    if (activeFilter === 'relocation-priority') return zone.relocationPriority === 'P1 — IMMEDIATE' || zone.relocationPriority === 'P2 — WITHIN 6 HRS';
    return true;
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl relative flex flex-col">
      {/* Top Filter Toolbar (Prompt Section 6: Hazard Filters) */}
      <div className="bg-slate-950/95 border-b border-slate-800 p-3 flex flex-wrap items-center justify-between gap-2.5 z-20">
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1 mr-1">
            <Layers className="h-3.5 w-3.5 text-slate-400" />
            <span>{language === 'ta' ? 'அடுக்குகள்:' : 'Filters:'}</span>
          </span>

          {[
            { id: 'all', label: language === 'ta' ? 'அனைத்து அபாயங்கள்' : 'All Layers', icon: Layers },
            { id: 'flood', label: language === 'ta' ? '1. வெள்ளம் (Flood)' : '1. Flood', icon: Droplets, color: 'text-blue-400' },
            { id: 'cyclone', label: language === 'ta' ? '2. புயல் (Cyclone)' : '2. Cyclone', icon: Wind, color: 'text-cyan-400' },
            { id: 'multi-hazard', label: language === 'ta' ? '3. பல-அபாயம் (Multi-Hazard)' : '3. Multi-Hazard', icon: Flame, color: 'text-amber-400' },
            { id: 'vulnerability', label: language === 'ta' ? '4. பாதிப்புத்தன்மை' : '4. Vulnerability', icon: Users, color: 'text-purple-400' },
            { id: 'exposure', label: language === 'ta' ? '5. மக்கள் வெளிப்பாடு' : '5. Exposure', icon: AlertTriangle, color: 'text-red-400' },
            { id: 'carrying-capacity', label: language === 'ta' ? '6. தாங்கும் திறன்' : '6. Carrying Capacity', icon: Building2, color: 'text-emerald-400' },
            { id: 'relocation-priority', label: language === 'ta' ? '7. இடமாற்ற முன்னுரிமை' : '7. Relocation Priority', icon: ArrowUpRight, color: 'text-rose-400' },
          ].map((item) => {
            const isActive = activeFilter === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setFilter(item.id as HazardFilterType)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  isActive
                    ? 'bg-red-600 text-white shadow-md ring-1 ring-red-400'
                    : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700'
                }`}
              >
                <Icon className={`h-3 w-3 ${isActive ? 'text-white' : item.color || 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Visibility Toggles */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setShowTacticalOverlays(!showTacticalOverlays)}
            className={`px-2.5 py-1 rounded text-[11px] font-bold border transition-colors flex items-center gap-1 ${
              showTacticalOverlays
                ? 'bg-red-600 text-white border-red-500 shadow-xs'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Toggle between Reference Base Map and Tactical GIS Hazard Layers"
          >
            <Eye className="h-3 w-3" />
            <span>{showTacticalOverlays ? (language === 'ta' ? 'இடர் அடுக்குகள்: ஆன்' : 'Hazard Layers: ON') : (language === 'ta' ? 'அடிப்படை வரைபடம் மட்டும்' : 'Base Map Only')}</span>
          </button>
          <button
            onClick={() => setShowRoutes(!showRoutes)}
            className={`px-2 py-0.5 rounded text-[11px] font-bold border transition-colors ${
              showRoutes ? 'bg-red-950/60 text-red-300 border-red-700' : 'bg-slate-800 text-slate-500 border-slate-700'
            }`}
          >
            {language === 'ta' ? 'வெளியேற்றப் பாதைகள்' : 'Routes'}
          </button>
          <button
            onClick={() => setShowShelters(!showShelters)}
            className={`px-2 py-0.5 rounded text-[11px] font-bold border transition-colors ${
              showShelters ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700' : 'bg-slate-800 text-slate-500 border-slate-700'
            }`}
          >
            {language === 'ta' ? 'முகாம்கள்' : 'Shelters'}
          </button>
          <button
            onClick={() => setShowHospitals(!showHospitals)}
            className={`px-2 py-0.5 rounded text-[11px] font-bold border transition-colors ${
              showHospitals ? 'bg-blue-950/60 text-blue-300 border-blue-700' : 'bg-slate-800 text-slate-500 border-slate-700'
            }`}
          >
            {language === 'ta' ? 'மருத்துவமனைகள்' : 'Hospitals'}
          </button>
        </div>
      </div>

      {/* Main Map Container: Responsive 587:670 Aspect Ratio */}
      <div className="relative w-full overflow-hidden bg-slate-950 flex items-center justify-center p-1 sm:p-2">
        <div
          className="relative w-full max-w-[720px] mx-auto shadow-2xl rounded-xl overflow-hidden border border-slate-800"
          style={{ aspectRatio: '897 / 1024' }}
        >
          {/* Base Geographic Static Map Image (Prompt Section 5 & 21) */}
          <img
            src="/assets/chennai-map.png"
            alt="Chennai Multi-Hazard Geographic Base Map"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
            style={{ filter: 'contrast(1.05) brightness(0.98)' }}
          />

          {/* Reference Map Visual Indicator */}
          {!showTacticalOverlays && (
            <div className="absolute top-3 left-3 z-20 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-white font-bold flex items-center gap-1.5 shadow-lg">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              <span>{language === 'ta' ? 'சென்னை அதிகாரப்பூர்வ குறிப்பு வரைபடம் (நேரலை)' : 'Chennai Official Reference Map'}</span>
            </div>
          )}

          {/* HAZARDIQ Decision Support SVG Vector Overlay System */}
          <svg
            viewBox="0 0 587 670"
            className={`absolute inset-0 w-full h-full z-10 overflow-visible ${showTacticalOverlays ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Pulsing glow filter for critical red zones */}
              <filter id="hazardGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <marker
                id="arrowhead"
                markerWidth="6"
                markerHeight="6"
                refX="3"
                refY="3"
                orient="auto"
              >
                <path d="M 0 0 L 6 3 L 0 6 z" fill="#dc2626" />
              </marker>
            </defs>

            {/* 1. Evacuation Routes Overlay (Rendered under polygons) */}
            {showRoutes &&
              CHENNAI_EVACUATION_ROUTES.map((route) => (
                <g key={route.id} className="cursor-pointer">
                  <path
                    d={route.d}
                    fill="none"
                    stroke={route.color}
                    strokeWidth="3.5"
                    strokeDasharray="6, 5"
                    className="opacity-80 hover:opacity-100 transition-opacity"
                    style={{ animation: 'dash 1.5s linear infinite' }}
                  />
                  <path
                    d={route.d}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.2"
                    strokeDasharray="3, 8"
                    className="opacity-90"
                  />
                </g>
              ))}

            {/* 2. Semi-Transparent Multi-Hazard Risk Zones Polygons */}
            {CHENNAI_STATIC_ZONES.map((zone) => {
              const visible = isZoneVisible(zone);
              if (!visible) return null;
              const isSelected = selectedZoneId === zone.id;
              const isHovered = hoveredItem?.id === zone.id;

              return (
                <g
                  key={zone.id}
                  onClick={() => handleZoneClick(zone)}
                  onMouseEnter={() => setHoveredItem({ type: 'zone', data: zone })}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="cursor-pointer transition-transform"
                >
                  {/* Zone Polygon */}
                  <polygon
                    points={zone.points}
                    fill={zone.color}
                    fillOpacity={isSelected ? 0.45 : isHovered ? 0.4 : 0.28}
                    stroke={zone.color}
                    strokeWidth={isSelected ? 3.5 : isHovered ? 2.8 : 1.8}
                    strokeDasharray={zone.riskLevel === 'Extreme Risk' ? undefined : '5, 4'}
                    filter={zone.riskLevel === 'Extreme Risk' ? 'url(#hazardGlow)' : undefined}
                    className="transition-all duration-150"
                  />

                  {/* Centroid Marker with Zone Code */}
                  <circle
                    cx={zone.center.x}
                    cy={zone.center.y}
                    r={isSelected ? 14 : 11}
                    fill={zone.color}
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="shadow-lg"
                  />
                  <text
                    x={zone.center.x}
                    y={zone.center.y + 3.5}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="9"
                    fontWeight="bold"
                    fontFamily="sans-serif"
                    className="pointer-events-none select-none"
                  >
                    {zone.riskScore}
                  </text>
                </g>
              );
            })}

            {/* 3. Safe Relocation Shelters Markers */}
            {showShelters &&
              CHENNAI_STATIC_SHELTERS.map((shelter) => {
                const isFull = shelter.status === 'FULL';
                const isLimited = shelter.status === 'LIMITED';
                const fillColor = isFull ? '#dc2626' : isLimited ? '#ea580c' : '#059669';

                return (
                  <g
                    key={shelter.id}
                    onClick={() => handleShelterClick(shelter)}
                    onMouseEnter={() => setHoveredItem({ type: 'shelter', data: shelter })}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="cursor-pointer"
                  >
                    {/* Pulsing ring if FULL to highlight capacity overflow constraint */}
                    {isFull && (
                      <circle
                        cx={shelter.coords.x}
                        cy={shelter.coords.y}
                        r="16"
                        fill="none"
                        stroke="#dc2626"
                        strokeWidth="1.5"
                        strokeDasharray="3, 3"
                        className="animate-spin"
                      />
                    )}
                    <rect
                      x={shelter.coords.x - 9}
                      y={shelter.coords.y - 9}
                      width="18"
                      height="18"
                      rx="4"
                      fill={fillColor}
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                    <text
                      x={shelter.coords.x}
                      y={shelter.coords.y + 4}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="9"
                      fontWeight="bold"
                      className="pointer-events-none select-none"
                    >
                      S
                    </text>
                  </g>
                );
              })}

            {/* 4. Emergency Hospitals Markers */}
            {showHospitals &&
              CHENNAI_STATIC_HOSPITALS.map((hosp) => (
                <g
                  key={hosp.id}
                  onMouseEnter={() => setHoveredItem({ type: 'hospital', data: hosp })}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={hosp.coords.x}
                    cy={hosp.coords.y}
                    r="8"
                    fill="#0284c7"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  <text
                    x={hosp.coords.x}
                    y={hosp.coords.y + 3.5}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="9"
                    fontWeight="bold"
                    className="pointer-events-none select-none"
                  >
                    +
                  </text>
                </g>
              ))}
          </svg>

          {/* Interactive Tooltip Overlay when Hovering */}
          {hoveredItem && (
            <div
              className="absolute z-30 pointer-events-none bg-slate-950/95 text-white p-2.5 rounded-lg border border-slate-700 shadow-2xl text-xs space-y-1 max-w-[240px]"
              style={{
                left: `${Math.min(70, Math.max(10, ((hoveredItem.data.center?.x || hoveredItem.data.coords?.x || 250) / 587) * 100))}%`,
                top: `${Math.min(75, Math.max(8, ((hoveredItem.data.center?.y || hoveredItem.data.coords?.y || 250) / 670) * 100))}%`,
                transform: 'translate(-50%, -110%)',
              }}
            >
              {hoveredItem.type === 'zone' && (
                <>
                  <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1">
                    <strong className="text-white font-bold truncate">{hoveredItem.data.code}</strong>
                    <span
                      className="px-1.5 py-0.2 rounded text-[10px] font-bold text-white"
                      style={{ backgroundColor: hoveredItem.data.color }}
                    >
                      {hoveredItem.data.riskLevel}
                    </span>
                  </div>
                  <div className="text-slate-300 font-semibold">{hoveredItem.data.name}</div>
                  <div className="text-[11px] text-slate-400">
                    Exposed: <strong>{hoveredItem.data.exposedPopulation.toLocaleString()}</strong> persons
                  </div>
                  <div className="text-[11px] text-amber-400 font-bold">
                    Relocation: {hoveredItem.data.relocationPriority}
                  </div>
                  <div className="text-[10px] text-slate-500 italic">Click zone to view full analytics panel</div>
                </>
              )}

              {hoveredItem.type === 'shelter' && (
                <>
                  <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1">
                    <strong className="text-emerald-400 font-bold">{hoveredItem.data.code}</strong>
                    <span
                      className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                        hoveredItem.data.status === 'FULL'
                          ? 'bg-red-600 text-white'
                          : hoveredItem.data.status === 'LIMITED'
                          ? 'bg-amber-600 text-white'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {hoveredItem.data.status}
                    </span>
                  </div>
                  <div className="text-white font-bold">{hoveredItem.data.name}</div>
                  <div className="text-[11px] text-slate-300">
                    Available: <strong className="text-emerald-400">{hoveredItem.data.available}</strong> / {hoveredItem.data.capacity}
                  </div>
                </>
              )}

              {hoveredItem.type === 'hospital' && (
                <>
                  <div className="text-blue-400 font-bold flex items-center gap-1">
                    <Hospital className="h-3 w-3" />
                    <span>Emergency Hospital</span>
                  </div>
                  <div className="text-white font-bold">{hoveredItem.data.name}</div>
                  <div className="text-[11px] text-slate-300">{hoveredItem.data.beds}</div>
                </>
              )}
            </div>
          )}

          {/* Watermark & Tactical Coordinates Banner */}
          <div className="absolute bottom-2 left-2 z-20 pointer-events-none bg-slate-950/85 backdrop-blur-sm px-2.5 py-1 rounded-md border border-slate-800 text-[10px] font-mono text-slate-400">
            HAZARD<span className="text-red-500">IQ</span> CHENNAI GIS REFERENCE • 13.0827° N, 80.2707° E
          </div>
        </div>
      </div>

      {/* GIS Legend & Risk Matrix Footer (Prompt Section 23: Clear Legend) */}
      <div className="bg-slate-950 border-t border-slate-800 p-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-bold text-white uppercase text-[11px]">
            {language === 'ta' ? 'அபாயக் குறியீடுகள்:' : 'Risk Legend:'}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-red-600 border border-red-400" />
            <span>{language === 'ta' ? 'தீவிர அபாயம் (Extreme)' : 'Extreme Risk (Score > 85)'}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-orange-600 border border-orange-400" />
            <span>{language === 'ta' ? 'அதிக அபாயம் (High)' : 'High Risk (Score 65-85)'}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-blue-600 border border-blue-400" />
            <span>{language === 'ta' ? 'மிதமான அபாயம் (Moderate)' : 'Moderate Risk (Score 45-65)'}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-emerald-600 border border-emerald-400" />
            <span>{language === 'ta' ? 'குறைந்த அபாயம் (Low)' : 'Low Risk (Score < 45)'}</span>
          </span>
        </div>

        <div className="flex items-center gap-3 border-l border-slate-800 pl-3">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-emerald-600 text-white flex items-center justify-center text-[8px] font-bold">S</span>
            <span>{language === 'ta' ? 'முகாம் உண்டு' : 'Shelter Available'}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-red-600 text-white flex items-center justify-center text-[8px] font-bold">S</span>
            <span>{language === 'ta' ? 'முகாம் நிரம்பியது (FULL)' : 'Shelter FULL'}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-4 border-b-2 border-dashed border-red-500 inline-block" />
            <span>{language === 'ta' ? 'வெளியேற்றப் பாதை' : 'Evacuation Route'}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
