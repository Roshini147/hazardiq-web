export interface AlertRecipient {
  id: string;
  name: string;
  phone: string;
  designation: string;
  zone: string;
  selected?: boolean;
}

export const OFFICIAL_PROTOTYPE_RECIPIENTS: AlertRecipient[] = [
  { id: 'rec-1', name: 'Roshini', phone: '9363120075', designation: 'Zone Incident Commander', zone: 'Zone XIV (Pallikaranai / Velachery)', selected: true },
  { id: 'rec-2', name: 'Seethaladevi', phone: '8778452652', designation: 'Regional Disaster Response Officer', zone: 'Zone XIII (Adyar / Saidapet)', selected: true },
  { id: 'rec-3', name: 'Vedhavarshini', phone: '777992201', designation: 'Evacuation Coordination Head', zone: 'Zone IV (Royapuram Coastal)', selected: true },
  { id: 'rec-4', name: 'Thilak', phone: '9094601779', designation: 'Public Safety Superintendent', zone: 'Zone II (Manali Lowlands)', selected: true },
  { id: 'rec-5', name: 'Rohan Rakesh', phone: '7550359667', designation: 'Emergency Relief Supervisor', zone: 'Zone X (Kodambakkam / T. Nagar)', selected: true },
  { id: 'rec-6', name: 'Nawfal', phone: '9344410577', designation: 'Shelter Capacity Officer', zone: 'Zone IX (Mylapore / Triplicane)', selected: true },
  { id: 'rec-7', name: 'Bagiyalakshmi', phone: '6379597642', designation: 'Medical Dispatch Coordinator', zone: 'Zone VIII (Anna Nagar / Kilpauk)', selected: true },
  { id: 'rec-8', name: 'Arun Kumar', phone: '7358310885', designation: 'Arterial Transport Lead', zone: 'Zone XII (Tambaram / Alandur)', selected: true },
  { id: 'rec-9', name: 'Saritha', phone: '8778790827', designation: 'Vulnerable Habitations Desk', zone: 'Zone VII (Ambattur / Korattur)', selected: true },
  { id: 'rec-10', name: 'Saravanan', phone: '6382905887', designation: 'Communications & Telemetry Lead', zone: 'Unified Command Headquarters', selected: true },
];

export function maskPhoneNumber(phone: string): string {
  const clean = phone.trim();
  if (clean.length <= 4) return clean;
  if (clean.length <= 7) {
    const firstTwo = clean.slice(0, 2);
    const lastTwo = clean.slice(-2);
    return `${firstTwo}***${lastTwo}`;
  }
  const firstFive = clean.slice(0, 5);
  const lastTwo = clean.slice(-2);
  return `${firstFive}*****${lastTwo}`;
}
