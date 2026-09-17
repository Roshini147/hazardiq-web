export interface CitizenReport {
  id: string;
  reportId: string;
  location: string;
  zone: string;
  hazardType: 'Flooding' | 'Waterlogging' | 'Coastal Risk' | 'Road Blockage' | 'Building Damage' | 'Other';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  photoUrl?: string;
  timestamp: string;
  status: 'NEW' | 'VERIFIED' | 'ACTIONED' | 'DISMISSED';
  verifiedBy?: string;
  alertCreated?: boolean;
}

export const INITIAL_CITIZEN_REPORTS: CitizenReport[] = [
  {
    id: 'rep-1',
    reportId: 'HZR-2026-00421',
    location: 'Velachery 100 Feet Road Junction (Zone A)',
    zone: 'Zone A',
    hazardType: 'Flooding',
    severity: 'Critical',
    description: 'Rapid water accumulation exceeding 3.5 feet near railway underpass. 12 elderly residents stranded in ground floor apartment block.',
    photoUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600&auto=format&fit=crop&q=80',
    timestamp: '14 mins ago',
    status: 'NEW',
    alertCreated: false,
  },
  {
    id: 'rep-2',
    reportId: 'HZR-2026-00418',
    location: 'Manali Express Highway Bridge (Zone B)',
    zone: 'Zone B',
    hazardType: 'Road Blockage',
    severity: 'High',
    description: 'Chemical transport lorry stalled due to 2 feet water depth; emergency corridor blocked for outbound vehicles.',
    photoUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&auto=format&fit=crop&q=80',
    timestamp: '42 mins ago',
    status: 'VERIFIED',
    verifiedBy: 'Insp. R. Kumar (Zone B Traffic Control)',
    alertCreated: true,
  },
  {
    id: 'rep-3',
    reportId: 'HZR-2026-00412',
    location: 'Kasimedu Coastal Road (Zone D)',
    zone: 'Zone D',
    hazardType: 'Coastal Risk',
    severity: 'Critical',
    description: 'High tide wave breaches boulder revetment; sea water flooding first row of boat huts.',
    photoUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
    timestamp: '1 hour ago',
    status: 'ACTIONED',
    verifiedBy: 'TN Maritime Nodal Desk',
    alertCreated: true,
  },
  {
    id: 'rep-4',
    reportId: 'HZR-2026-00405',
    location: 'Saidapet Substation Road (Zone C)',
    zone: 'Zone C',
    hazardType: 'Waterlogging',
    severity: 'Medium',
    description: 'Stormwater drain overflowing near transformers; risk of short circuit in commercial lane.',
    timestamp: '2 hours ago',
    status: 'VERIFIED',
    verifiedBy: 'TANGEDCO Safety Cell',
    alertCreated: false,
  },
];
