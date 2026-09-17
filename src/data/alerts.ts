export interface EmergencyAlert {
  id: string;
  alertCode: string;
  title: string;
  titleTa: string;
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE';
  zone: string;
  affectedPopulation: number;
  message: string;
  messageTa: string;
  recommendedAction: string;
  recommendedActionTa: string;
  nearbySafeAreas: {
    name: string;
    code: string;
    distance: string;
    status: 'AVAILABLE' | 'LIMITED' | 'FULL';
    note?: string;
  }[];
  issuedAt: string;
  issuedBy: string;
  helpline: string;
  active: boolean;
}

export const INITIAL_ALERTS: EmergencyAlert[] = [
  {
    id: 'alt-1',
    alertCode: 'ALT-CHE-2026-08',
    title: '⚠️ CRITICAL RED ZONE EVACUATION ADVISORY',
    titleTa: '⚠️ தீவிர சிவப்பு மண்டல அவசர வெளியேற்ற எச்சரிக்கை',
    severity: 'CRITICAL',
    zone: 'Zone A (Velachery - Pallikaranai Sector)',
    affectedPopulation: 4200,
    message: 'Extreme flood inundation detected. High astronomical tide restricting drainage outfall. Immediate evacuation required for all low-lying habitations.',
    messageTa: 'தீவிர வெள்ளப்பெருக்கு கண்டறியப்பட்டுள்ளது. கழிவுநீர் வடிகால் அடைப்பு ஏற்பட்டுள்ளது. தாழ்வான பகுதிகளில் உள்ள மக்கள் உடனடியாக பாதுகாப்பான இடங்களுக்கு செல்லவும்.',
    recommendedAction: 'Move to a designated safe area immediately. Avoid underpasses and flooded roads.',
    recommendedActionTa: 'உடனடியாக நியமிக்கப்பட்ட பாதுகாப்பான முகாமுக்கு செல்லவும். வெள்ளம் சூழ்ந்த சாலைகளை தவிர்க்கவும்.',
    nearbySafeAreas: [
      {
        name: 'Safe Area A — Government Relief Centre',
        code: 'SAFE AREA A',
        distance: '1.8 km',
        status: 'AVAILABLE',
      },
      {
        name: 'Safe Area D — Regional Disaster Relief Hub',
        code: 'SAFE AREA D',
        distance: '3.4 km',
        status: 'AVAILABLE',
      },
      {
        name: 'Safe Area C — Emergency Shelter (Taramani)',
        code: 'SAFE AREA C',
        distance: '2.1 km',
        status: 'FULL',
        note: 'DO NOT PROCEED — Shelter at maximum carrying capacity',
      },
    ],
    issuedAt: 'Just now',
    issuedBy: 'Tamil Nadu State Disaster Management Authority (TNSDMA)',
    helpline: '112 / 1070',
    active: true,
  },
  {
    id: 'alt-2',
    alertCode: 'ALT-CHE-2026-07',
    title: '⚠️ HIGH-RISK COASTAL STORM SURGE ALERT',
    titleTa: '⚠️ அதிக ஆபத்து கொண்ட கடலோர புயல் அலை எச்சரிக்கை',
    severity: 'CRITICAL',
    zone: 'Zone D (Royapuram Coastal Sector)',
    affectedPopulation: 3800,
    message: 'Wave surge heights of 3.2m expected along harbour foreshore. Fisherfolk and shoreline settlements must relocate to designated inland hubs.',
    messageTa: 'துறைமுகக் கடலோரப் பகுதியில் 3.2 மீட்டர் உயர அலைகள் எழக்கூடும். கரையோர மக்கள் உள்நாட்டு முகாம்களுக்கு மாற்றப்பட வேண்டும்.',
    recommendedAction: 'Shoreline evacuation in progress. Follow ward nodal officers.',
    recommendedActionTa: 'கரையோர மக்கள் வெளியேற்றம் தொடங்கப்பட்டுள்ளது. வார்டு அதிகாரிகளைப் பின்தொடரவும்.',
    nearbySafeAreas: [
      {
        name: 'Safe Area D — Regional Disaster Relief Hub',
        code: 'SAFE AREA D',
        distance: '5.2 km',
        status: 'AVAILABLE',
      },
      {
        name: 'Safe Area F — Indoor Stadium Shelter',
        code: 'SAFE AREA F',
        distance: '3.1 km',
        status: 'LIMITED',
      },
    ],
    issuedAt: '45 mins ago',
    issuedBy: 'Greater Chennai Corporation Disaster Cell',
    helpline: '112 / 1077',
    active: true,
  },
  {
    id: 'alt-3',
    alertCode: 'ALT-CHE-2026-05',
    title: 'INDUSTRIAL FLOOD RUNOFF ADVISORY',
    titleTa: 'தொழில்துறை வெள்ள நீர் வழிந்தோடல் எச்சரிக்கை',
    severity: 'HIGH',
    zone: 'Zone B (Manali - Ennore Corridor)',
    affectedPopulation: 3100,
    message: 'Precautionary alert for waterlogging and chemical factory buffer zone inundation. Prepare essential emergency kits.',
    messageTa: 'நீர் தேக்கம் மற்றும் தொழிற்சாலை பகுதி வெள்ள அபாய எச்சரிக்கை. அவசர பொருட்களை தயார் நிலையில் வைக்கவும்.',
    recommendedAction: 'Be prepared for evacuation within 6 hours if rainfall intensifies.',
    recommendedActionTa: 'மழை தீவிரமடைந்தால் 6 மணி நேரத்திற்குள் பாதுகாப்பான இடத்திற்கு செல்ல தயாராக இருக்கவும்.',
    nearbySafeAreas: [
      {
        name: 'Safe Area F — Indoor Stadium Multi-Purpose Shelter',
        code: 'SAFE AREA F',
        distance: '4.8 km',
        status: 'LIMITED',
      },
    ],
    issuedAt: '2 hours ago',
    issuedBy: 'Zone B Zonal Monitoring Officer',
    helpline: '112',
    active: true,
  },
];
