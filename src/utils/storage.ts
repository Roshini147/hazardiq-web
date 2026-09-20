import { INITIAL_CITIZEN_REPORTS, CitizenReport } from '../data/reports';
import { INITIAL_ALERTS, EmergencyAlert } from '../data/alerts';
import { CHENNAI_SAFE_AREAS, SafeArea } from '../data/shelters';
import { CHENNAI_RISK_ZONES, RiskZone } from '../data/hazards';
import { maskPhoneNumber } from '../data/recipients';

import { OFFICIAL_PROTOTYPE_RECIPIENTS, AlertRecipient } from '../data/recipients';

export interface CitizenProfile {
  name: string;
  gender: string;
  age: number;
  place: string;
  zone: string;
  phone: string;
  loginAt: string;
}

export interface NotepadLogEntry {
  id: string;
  type?: 'ALERT_DISPATCH' | 'REGISTRATION';
  date: string;
  time: string;
  recipient: string;
  phone: string;
  phoneMasked: string;
  title: string;
  hazard?: string;
  severity?: string;
  affectedArea?: string;
  message: string;
  status: 'Sent' | 'Delivered' | 'Registered';
  sender: string;
  timestamp: string;
  role?: string;
  zone?: string;
}

const STORAGE_KEYS = {
  REPORTS: 'hazardiq_reports_v1',
  ALERTS: 'hazardiq_alerts_v1',
  SHELTERS: 'hazardiq_shelters_v1',
  ZONES: 'hazardiq_zones_v1',
  ESCALATED: 'hazardiq_escalated_v1',
  LANG: 'hazardiq_lang_v1',
  LOW_BW: 'hazardiq_low_bw_v1',
  AUTH: 'hazardiq_auth_session_v1',
  CITIZEN: 'hazardiq_citizen_profile_v1',
  ADMIN_AUTH: 'hazardiq_admin_auth_v1',
  NOTEPAD_LOG: 'hazardiq_notepad_log_v1',
  RECIPIENTS: 'hazardiq_recipients_v1',
};

export const INITIAL_NOTEPAD_ENTRIES: NotepadLogEntry[] = [
  // --- RECENT BROADCAST ALERTS SENT TO PHONE NUMBERS ---
  {
    id: 'log-seed-alert-1',
    type: 'ALERT_DISPATCH',
    date: '17-09-2026',
    time: '11:20 AM',
    recipient: 'Roshini',
    phone: '9363120075',
    phoneMasked: '93631*****75',
    title: 'HIGH FLOOD INUNDATION ADVISORY',
    hazard: 'Flood',
    severity: 'High',
    affectedArea: 'Pallikaranai',
    message:
      'High flood risk detected in the affected zone.\nResidents in vulnerable low-lying areas are advised\nto move to the designated safe relocation facility.',
    status: 'Sent',
    sender: 'Government Disaster Management Authority (TNSDMA / GCC Command)',
    timestamp: '2026-09-17T11:20:00+05:30',
  },
  {
    id: 'log-seed-alert-2',
    type: 'ALERT_DISPATCH',
    date: '17-09-2026',
    time: '11:20 AM',
    recipient: 'Seethaladevi',
    phone: '8778452652',
    phoneMasked: '87784*****52',
    title: 'HIGH FLOOD INUNDATION ADVISORY',
    hazard: 'Flood',
    severity: 'High',
    affectedArea: 'Pallikaranai',
    message:
      'High flood risk detected in the affected zone.\nResidents in vulnerable low-lying areas are advised\nto move to the designated safe relocation facility.',
    status: 'Sent',
    sender: 'Government Disaster Management Authority (TNSDMA / GCC Command)',
    timestamp: '2026-09-17T11:20:00+05:30',
  },
  {
    id: 'log-seed-alert-3',
    type: 'ALERT_DISPATCH',
    date: '17-09-2026',
    time: '10:45 AM',
    recipient: 'Vedhavarshini',
    phone: '777992201',
    phoneMasked: '77799***01',
    title: 'COASTAL STORM SURGE WARNING',
    hazard: 'Cyclone',
    severity: 'Critical',
    affectedArea: 'Royapuram Coastal',
    message:
      'Astronomical surge height of 3.2m expected.\nShoreline settlements advised to evacuate immediately\nto Jawaharlal Nehru Stadium and regional safe hubs.',
    status: 'Sent',
    sender: 'State Disaster Operations Command (TNSDMA)',
    timestamp: '2026-09-17T10:45:00+05:30',
  },
  {
    id: 'log-seed-alert-4',
    type: 'ALERT_DISPATCH',
    date: '17-09-2026',
    time: '09:30 AM',
    recipient: 'Thilak',
    phone: '9094601779',
    phoneMasked: '90946*****79',
    title: 'INDUSTRIAL RUNOFF & LOWLAND WATERLOGGING NOTICE',
    hazard: 'Multi-Hazard',
    severity: 'High',
    affectedArea: 'Manali Lowlands',
    message:
      'Chemical buffer basin water ingress reported.\nStage emergency transport vehicles and monitor\nvulnerable households along primary egress route.',
    status: 'Sent',
    sender: 'GCC Zonal Disaster Response Cell',
    timestamp: '2026-09-17T09:30:00+05:30',
  },

  // --- OFFICIAL RECIPIENT PHONE REGISTRATIONS IN NOTEPAD ---
  {
    id: 'reg-seed-1',
    type: 'REGISTRATION',
    date: '17-09-2026',
    time: '08:00 AM',
    recipient: 'Roshini',
    phone: '9363120075',
    phoneMasked: '93631*****75',
    title: 'EMERGENCY RECIPIENT PHONE REGISTRATION',
    message: 'Enrolled for high-priority evacuation advisories and field rescue dispatches.',
    status: 'Registered',
    sender: 'HazardIQ Web Portal Registration',
    role: 'Zone Incident Commander',
    zone: 'Zone XIV (Pallikaranai / Velachery)',
    timestamp: '2026-09-17T08:00:00+05:30',
  },
  {
    id: 'reg-seed-2',
    type: 'REGISTRATION',
    date: '17-09-2026',
    time: '08:05 AM',
    recipient: 'Seethaladevi',
    phone: '8778452652',
    phoneMasked: '87784*****52',
    title: 'EMERGENCY RECIPIENT PHONE REGISTRATION',
    message: 'Enrolled for district disaster coordination and multi-hazard bulletins.',
    status: 'Registered',
    sender: 'HazardIQ Web Portal Registration',
    role: 'Regional Disaster Response Officer',
    zone: 'Zone XIII (Adyar / Saidapet)',
    timestamp: '2026-09-17T08:05:00+05:30',
  },
  {
    id: 'reg-seed-3',
    type: 'REGISTRATION',
    date: '17-09-2026',
    time: '08:10 AM',
    recipient: 'Vedhavarshini',
    phone: '777992201',
    phoneMasked: '77799***01',
    title: 'EMERGENCY RECIPIENT PHONE REGISTRATION',
    message: 'Enrolled for coastal surge warnings and shoreline evacuation orders.',
    status: 'Registered',
    sender: 'HazardIQ Web Portal Registration',
    role: 'Evacuation Coordination Head',
    zone: 'Zone IV (Royapuram Coastal)',
    timestamp: '2026-09-17T08:10:00+05:30',
  },
  {
    id: 'reg-seed-4',
    type: 'REGISTRATION',
    date: '17-09-2026',
    time: '08:15 AM',
    recipient: 'Thilak',
    phone: '9094601779',
    phoneMasked: '90946*****79',
    title: 'EMERGENCY RECIPIENT PHONE REGISTRATION',
    message: 'Enrolled for lowland inundation alerts and rapid deployment calls.',
    status: 'Registered',
    sender: 'HazardIQ Web Portal Registration',
    role: 'Public Safety Superintendent',
    zone: 'Zone II (Manali Lowlands)',
    timestamp: '2026-09-17T08:15:00+05:30',
  },
  {
    id: 'reg-seed-5',
    type: 'REGISTRATION',
    date: '17-09-2026',
    time: '08:20 AM',
    recipient: 'Rohan Rakesh',
    phone: '7550359667',
    phoneMasked: '75503*****67',
    title: 'EMERGENCY RECIPIENT PHONE REGISTRATION',
    message: 'Enrolled for emergency relief coordination and shelter transit updates.',
    status: 'Registered',
    sender: 'HazardIQ Web Portal Registration',
    role: 'Emergency Relief Supervisor',
    zone: 'Zone X (Kodambakkam / T. Nagar)',
    timestamp: '2026-09-17T08:20:00+05:30',
  },
  {
    id: 'reg-seed-6',
    type: 'REGISTRATION',
    date: '17-09-2026',
    time: '08:25 AM',
    recipient: 'Nawfal',
    phone: '9344410577',
    phoneMasked: '93444*****77',
    title: 'EMERGENCY RECIPIENT PHONE REGISTRATION',
    message: 'Enrolled for shelter capacity management and overflow redirection alerts.',
    status: 'Registered',
    sender: 'HazardIQ Web Portal Registration',
    role: 'Shelter Capacity Officer',
    zone: 'Zone IX (Mylapore / Triplicane)',
    timestamp: '2026-09-17T08:25:00+05:30',
  },
  {
    id: 'reg-seed-7',
    type: 'REGISTRATION',
    date: '17-09-2026',
    time: '08:30 AM',
    recipient: 'Bagiyalakshmi',
    phone: '6379597642',
    phoneMasked: '63795*****42',
    title: 'EMERGENCY RECIPIENT PHONE REGISTRATION',
    message: 'Enrolled for medical triage dispatches and high-dependency evacuee alerts.',
    status: 'Registered',
    sender: 'HazardIQ Web Portal Registration',
    role: 'Medical Dispatch Coordinator',
    zone: 'Zone VIII (Anna Nagar / Kilpauk)',
    timestamp: '2026-09-17T08:30:00+05:30',
  },
  {
    id: 'reg-seed-8',
    type: 'REGISTRATION',
    date: '17-09-2026',
    time: '08:35 AM',
    recipient: 'Arun Kumar',
    phone: '7358310885',
    phoneMasked: '73583*****85',
    title: 'EMERGENCY RECIPIENT PHONE REGISTRATION',
    message: 'Enrolled for arterial route blockages and vehicle transit warnings.',
    status: 'Registered',
    sender: 'HazardIQ Web Portal Registration',
    role: 'Arterial Transport Lead',
    zone: 'Zone XII (Tambaram / Alandur)',
    timestamp: '2026-09-17T08:35:00+05:30',
  },
  {
    id: 'reg-seed-9',
    type: 'REGISTRATION',
    date: '17-09-2026',
    time: '08:40 AM',
    recipient: 'Saritha',
    phone: '8778790827',
    phoneMasked: '87787*****27',
    title: 'EMERGENCY RECIPIENT PHONE REGISTRATION',
    message: 'Enrolled for vulnerable demographic priorities (elderly, infants, PWD).',
    status: 'Registered',
    sender: 'HazardIQ Web Portal Registration',
    role: 'Vulnerable Habitations Desk',
    zone: 'Zone VII (Ambattur / Korattur)',
    timestamp: '2026-09-17T08:40:00+05:30',
  },
  {
    id: 'reg-seed-10',
    type: 'REGISTRATION',
    date: '17-09-2026',
    time: '08:45 AM',
    recipient: 'Saravanan',
    phone: '6382905887',
    phoneMasked: '63829*****87',
    title: 'EMERGENCY RECIPIENT PHONE REGISTRATION',
    message: 'Enrolled for unified command telemetry and broadcast status alerts.',
    status: 'Registered',
    sender: 'HazardIQ Web Portal Registration',
    role: 'Communications & Telemetry Lead',
    zone: 'Unified Command Headquarters',
    timestamp: '2026-09-17T08:45:00+05:30',
  },
];

export const storage = {
  // Reports
  getReports(): CitizenReport[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REPORTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(INITIAL_CITIZEN_REPORTS));
        return INITIAL_CITIZEN_REPORTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_CITIZEN_REPORTS;
    }
  },

  addReport(report: Omit<CitizenReport, 'id' | 'reportId' | 'timestamp' | 'status'>): CitizenReport {
    const reports = this.getReports();
    const count = reports.length + 421;
    const newReport: CitizenReport = {
      ...report,
      id: `rep-${Date.now()}`,
      reportId: `HZR-2026-00${count}`,
      timestamp: 'Just now',
      status: 'NEW',
    };
    const updated = [newReport, ...reports];
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(updated));
    return newReport;
  },

  updateReportStatus(reportId: string, status: CitizenReport['status'], verifiedBy?: string): CitizenReport[] {
    const reports = this.getReports().map(r => {
      if (r.reportId === reportId || r.id === reportId) {
        return {
          ...r,
          status,
          verifiedBy: verifiedBy || (status === 'VERIFIED' ? 'Duty Disaster Officer (Verified)' : r.verifiedBy),
        };
      }
      return r;
    });
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
    return reports;
  },

  // Alerts
  getAlerts(): EmergencyAlert[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ALERTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(INITIAL_ALERTS));
        return INITIAL_ALERTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_ALERTS;
    }
  },

  addAlert(alert: Omit<EmergencyAlert, 'id' | 'alertCode' | 'issuedAt' | 'active'>): EmergencyAlert {
    const alerts = this.getAlerts();
    const num = alerts.length + 9;
    const newAlert: EmergencyAlert = {
      ...alert,
      id: `alt-${Date.now()}`,
      alertCode: `ALT-CHE-2026-0${num}`,
      issuedAt: 'Just now',
      active: true,
    };
    const updated = [newAlert, ...alerts];
    localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(updated));
    return newAlert;
  },

  // Notepad Log
  getNotepadLog(): NotepadLogEntry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NOTEPAD_LOG);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.NOTEPAD_LOG, JSON.stringify(INITIAL_NOTEPAD_ENTRIES));
        return INITIAL_NOTEPAD_ENTRIES;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_NOTEPAD_ENTRIES;
    }
  },

  appendNotepadLog(entries: NotepadLogEntry[]): NotepadLogEntry[] {
    const existing = this.getNotepadLog();
    const updated = [...entries, ...existing];
    try {
      localStorage.setItem(STORAGE_KEYS.NOTEPAD_LOG, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save notepad log', e);
    }
    return updated;
  },

  clearNotepadLog(): void {
    localStorage.removeItem(STORAGE_KEYS.NOTEPAD_LOG);
  },

  formatNotepadEntry(entry: NotepadLogEntry): string {
    if (entry.type === 'REGISTRATION') {
      return [
        '--------------------------------------------------',
        'HAZARDIQ RECIPIENT PHONE REGISTRATION',
        '--------------------------------------------------',
        `Date: ${entry.date}`,
        `Time: ${entry.time}`,
        '',
        `Subscriber Name: ${entry.recipient}`,
        `Phone Number: ${entry.phone} (Masked: ${entry.phoneMasked})`,
        `Designation / Role: ${entry.role || 'Citizen / Responder'}`,
        `Assigned Zone: ${entry.zone || entry.affectedArea || 'Chennai District'}`,
        '',
        `Status: ${entry.status || 'Registered & Active'}`,
        `Enrolled via: ${entry.sender || 'HazardIQ Web Portal'}`,
        '',
        'Registration Notes:',
        entry.message,
        '--------------------------------------------------',
        '',
      ].join('\n');
    }

    return [
      '--------------------------------------------------',
      'HAZARDIQ ALERT MESSAGE LOG',
      '--------------------------------------------------',
      `Date: ${entry.date}`,
      `Time: ${entry.time}`,
      '',
      `Recipient: ${entry.recipient}`,
      `Phone: ${entry.phoneMasked}`,
      '',
      `Hazard: ${entry.hazard || 'Emergency Hazard'}`,
      `Severity: ${entry.severity || 'High'}`,
      `Affected Area: ${entry.affectedArea || 'Chennai'}`,
      '',
      `Status: ${entry.status}`,
      `Sender: ${entry.sender}`,
      '',
      'Message:',
      entry.message,
      '--------------------------------------------------',
      '',
    ].join('\n');
  },

  exportNotepadText(): string {
    const logs = this.getNotepadLog();
    const header = [
      '======================================================================',
      'HAZARDIQ — AI-POWERED DISASTER RISK & RELOCATION PLATFORM',
      'GOVERNMENT DISASTER OPERATIONS DISPATCH & NOTEPAD MESSAGE LOG',
      `EXPORTED: ${new Date().toLocaleString('en-IN')}`,
      'AUTHORITY: Tamil Nadu State Disaster Management Authority & GCC Command',
      'SYSTEM: Dual Record Engine (Phone Registrations & Alert Messages)',
      '======================================================================',
      '',
    ].join('\n');

    const body = logs.map(e => this.formatNotepadEntry(e)).join('\n');
    return `${header}\n${body}`;
  },

  downloadNotepadLog(): void {
    const text = this.exportNotepadText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    a.download = `hazardiq_alert_log_${dateStr}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // Shelters
  getShelters(): SafeArea[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SHELTERS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.SHELTERS, JSON.stringify(CHENNAI_SAFE_AREAS));
        return CHENNAI_SAFE_AREAS;
      }
      return JSON.parse(data);
    } catch {
      return CHENNAI_SAFE_AREAS;
    }
  },

  updateShelterOccupancy(shelterId: string, deltaOccupancy: number): SafeArea[] {
    const shelters = this.getShelters().map(s => {
      if (s.id === shelterId) {
        const newOcc = Math.max(0, Math.min(s.capacity, s.occupancy + deltaOccupancy));
        const avail = s.capacity - newOcc;
        let status: SafeArea['status'] = 'AVAILABLE';
        if (avail === 0) status = 'FULL';
        else if (avail < 500) status = 'LIMITED';

        return {
          ...s,
          occupancy: newOcc,
          available: avail,
          status,
        };
      }
      return s;
    });
    localStorage.setItem(STORAGE_KEYS.SHELTERS, JSON.stringify(shelters));
    return shelters;
  },

  // Zones & Risk Escalation
  getZones(): RiskZone[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ZONES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.ZONES, JSON.stringify(CHENNAI_RISK_ZONES));
        return CHENNAI_RISK_ZONES;
      }
      return JSON.parse(data);
    } catch {
      return CHENNAI_RISK_ZONES;
    }
  },

  isEscalated(): boolean {
    return localStorage.getItem(STORAGE_KEYS.ESCALATED) === 'true';
  },

  setEscalated(escalated: boolean): void {
    localStorage.setItem(STORAGE_KEYS.ESCALATED, String(escalated));
    const zones = this.getZones();
    const updated = zones.map(z => {
      if (z.id === 'zone-b') {
        if (escalated) {
          return {
            ...z,
            riskLevel: 'Critical' as const,
            riskScore: 94,
            exposedPopulation: 5500,
            priority: 'P1 — IMMEDIATE' as const,
            priorityCode: 'P1' as const,
            color: '#dc2626',
            recommendedAction: 'ESCALATION ACTIVE: Immediate mass evacuation ordered to Safe Area D and Safe Area F.',
          };
        } else {
          return {
            ...z,
            riskLevel: 'High' as const,
            riskScore: 78,
            exposedPopulation: 3100,
            priority: 'P2 — WITHIN 6 HRS' as const,
            priorityCode: 'P2' as const,
            color: '#ea580c',
            recommendedAction: 'Stage emergency transport teams. Prepare relocation within 6 hours.',
          };
        }
      }
      return z;
    });
    localStorage.setItem(STORAGE_KEYS.ZONES, JSON.stringify(updated));
  },


  // Citizen Auth & Profile
  getCitizen(): CitizenProfile | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CITIZEN);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  isCitizenAuthenticated(): boolean {
    return this.getCitizen() !== null;
  },

  citizenLogin(profile: CitizenProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CITIZEN, JSON.stringify(profile));
      // Auto-register citizen phone in emergency recipient directory
      this.registerRecipient(profile.name, profile.phone, profile.zone, 'Resident Citizen Subscriber');
    } catch (e) {
      console.error('Failed to store citizen profile', e);
    }
  },

  citizenLogout(): void {
    localStorage.removeItem(STORAGE_KEYS.CITIZEN);
  },

  // Government Admin Auth
  isAdminAuthenticated(): boolean {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  },

  adminLogin(user: string, pass: string): boolean {
    const u = (user || '').trim().toLowerCase();
    const p = (pass || '').trim();
    if (
      (u === 'admin' && (p === 'hazardiq' || p === 'admin' || p === 'admin123' || p === 'password')) ||
      (u === 'officer' && (p === 'hazardiq' || p === 'officer' || p === 'admin123')) ||
      (u === 'admin@tnsdma.gov.in' && (p === 'hazardiq' || p === 'admin' || p === 'admin123'))
    ) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      return true;
    }
    return false;
  },

  adminLogout(): void {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  },

  // Auth
  isAuthenticated(): boolean {
    const val = localStorage.getItem(STORAGE_KEYS.AUTH);
    if (val === null) {
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      return true;
    }
    return val === 'true';
  },

  login(): void {
    localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
  },

  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  },

  // Preferences
  getLanguage(): 'en' | 'ta' {
    return (localStorage.getItem(STORAGE_KEYS.LANG) as 'en' | 'ta') || 'en';
  },

  setLanguage(lang: 'en' | 'ta'): void {
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
  },

  isLowBandwidth(): boolean {
    return localStorage.getItem(STORAGE_KEYS.LOW_BW) === 'true';
  },

  setLowBandwidth(enabled: boolean): void {
    localStorage.setItem(STORAGE_KEYS.LOW_BW, String(enabled));
  },

  // Recipient Directory & Phone Registration (Syncs Website + Notepad Log)
  getRecipients(): AlertRecipient[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RECIPIENTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.RECIPIENTS, JSON.stringify(OFFICIAL_PROTOTYPE_RECIPIENTS));
        return OFFICIAL_PROTOTYPE_RECIPIENTS;
      }
      return JSON.parse(data);
    } catch {
      return OFFICIAL_PROTOTYPE_RECIPIENTS;
    }
  },

  saveRecipients(recipients: AlertRecipient[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.RECIPIENTS, JSON.stringify(recipients));
    } catch (e) {
      console.error('Failed to save recipients', e);
    }
  },

  registerRecipient(name: string, phone: string, zone?: string, designation?: string): AlertRecipient {
    const existing = this.getRecipients();
    const newRec: AlertRecipient = {
      id: `rec-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      zone: zone?.trim() || 'General Chennai Zone',
      designation: designation?.trim() || 'Registered Alert Subscriber',
      selected: true,
    };

    const updated = [newRec, ...existing];
    this.saveRecipients(updated);

    // Automatically record registration into the Notepad Log!
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const regLog: NotepadLogEntry = {
      id: `reg-log-${Date.now()}`,
      type: 'REGISTRATION',
      date: dateStr,
      time: timeStr,
      recipient: newRec.name,
      phone: newRec.phone,
      phoneMasked: maskPhoneNumber(newRec.phone),
      title: 'EMERGENCY RECIPIENT PHONE REGISTRATION',
      message: `Enrolled for instant SMS emergency broadcasts, weather warnings, and evacuation alerts in ${newRec.zone}.`,
      status: 'Registered',
      sender: 'HazardIQ Web Portal Registration',
      timestamp: now.toISOString(),
      role: newRec.designation,
      zone: newRec.zone,
    };

    this.appendNotepadLog([regLog]);
    return newRec;
  },

  resetSystemState(): void {
    localStorage.clear();
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(INITIAL_CITIZEN_REPORTS));
    localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(INITIAL_ALERTS));
    localStorage.setItem(STORAGE_KEYS.SHELTERS, JSON.stringify(CHENNAI_SAFE_AREAS));
    localStorage.setItem(STORAGE_KEYS.ZONES, JSON.stringify(CHENNAI_RISK_ZONES));
    localStorage.setItem(STORAGE_KEYS.ESCALATED, 'false');
    localStorage.setItem(STORAGE_KEYS.NOTEPAD_LOG, JSON.stringify(INITIAL_NOTEPAD_ENTRIES));
    localStorage.setItem(STORAGE_KEYS.RECIPIENTS, JSON.stringify(OFFICIAL_PROTOTYPE_RECIPIENTS));
  },
};
