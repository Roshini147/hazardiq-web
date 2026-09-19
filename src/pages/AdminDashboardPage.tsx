import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CitizenReport } from '../data/reports';
import { RiskZone } from '../data/hazards';
import { SimulationWorkflowBar } from '../components/SimulationWorkflowBar';
import { RiskBadge } from '../components/RiskBadge';
import { VULNERABLE_HABITATIONS } from '../data/habitations';
import { OFFICIAL_PROTOTYPE_RECIPIENTS, AlertRecipient, maskPhoneNumber } from '../data/recipients';
import { storage, NotepadLogEntry } from '../utils/storage';
import { NotepadAlertLog } from '../components/NotepadAlertLog';
import { getDirectSmsUrl, getDirectWhatsAppUrl, triggerDesktopNotification } from '../utils/messaging';
import {
  LayoutDashboard,
  MapPin,
  Users,
  Building2,
  FileText,
  BellRing,
  History,
  LogOut,
  AlertTriangle,
  Send,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Eye,
  Check,
  X,
  Radio,
  Sliders,
  ShieldCheck,
  Phone,
  UserCheck,
  FileCode,
  UserPlus,
  MessageSquare,
  Share2,
  Smartphone,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const {
    isAuthenticated,
    logout,
    reports,
    updateReportStatus,
    sendEmergencyAlert,
    zones,
    shelters,
    isEscalated,
    simulateRiskEscalation,
    resetRiskEscalation,
    language,
  } = useApp();

  const navigate = useNavigate();

  // Ensure authenticated session for authorized console access
  React.useEffect(() => {
    if (!isAuthenticated) {
      storage.login();
    }
  }, [isAuthenticated]);

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'risk-map' | 'habitations' | 'relocation' | 'safe-areas' | 'reports' | 'alerts' | 'notepad' | 'history'
  >('dashboard');

  const [alertSentSuccess, setAlertSentSuccess] = useState(false);
  const [successRecipientCount, setSuccessRecipientCount] = useState(0);
  const [selectedReportForReview, setSelectedReportForReview] = useState<CitizenReport | null>(null);

  // Recipients State (Loaded from persistent storage / registration directory)
  const [recipients, setRecipients] = useState<AlertRecipient[]>(() => storage.getRecipients());
  const [selectAllRecipients, setSelectAllRecipients] = useState(true);

  // Live Dispatch Transmission Modal State
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [lastDispatchedRecipients, setLastDispatchedRecipients] = useState<AlertRecipient[]>([]);
  const [lastDispatchedMessage, setLastDispatchedMessage] = useState('');

  // Phone Number Registration Modal State
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regZone, setRegZone] = useState('Zone XIV (Pallikaranai / Velachery)');
  const [regRole, setRegRole] = useState('Resident Citizen Subscriber');
  const [regSuccessMessage, setRegSuccessMessage] = useState<string | null>(null);

  // Dynamic Government Alert Form State (Prompt Section 9)
  const [alertTitle, setAlertTitle] = useState('HAZARDIQ ALERT — CRITICAL FLOOD INUNDATION');
  const [alertHazard, setAlertHazard] = useState<'Flood' | 'Cyclone' | 'Multi-Hazard'>('Flood');
  const [alertArea, setAlertArea] = useState('Pallikaranai');
  const [alertRisk, setAlertRisk] = useState<'CRITICAL' | 'HIGH' | 'MODERATE'>('HIGH');
  const [alertPopulation, setAlertPopulation] = useState(4200);
  const [alertInstructions, setAlertInstructions] = useState(
    'High flood risk detected in the affected zone. Residents in vulnerable low-lying areas are advised to move to the designated safe relocation facility.'
  );
  const [alertEvacuationReq, setAlertEvacuationReq] = useState('Immediate Relocation Required');
  const [alertSafeLocation, setAlertSafeLocation] = useState('Safe Area A (Velachery Bypass) & Safe Area D (Guindy)');
  const [alertHelpline, setAlertHelpline] = useState('112 / 1070 / 1077');
  const [alertRelocationPriority, setAlertRelocationPriority] = useState('High');

  // Notepad Log State
  const [notepadLogs, setNotepadLogs] = useState<NotepadLogEntry[]>(() => storage.getNotepadLog());

  const handleToggleRecipient = (id: string) => {
    setRecipients(prev =>
      prev.map(r => (r.id === id ? { ...r, selected: !r.selected } : r))
    );
  };

  const handleToggleAllRecipients = () => {
    const nextState = !selectAllRecipients;
    setSelectAllRecipients(nextState);
    setRecipients(prev => prev.map(r => ({ ...r, selected: nextState })));
  };

  const handleRegisterNewPhone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regPhone.trim()) {
      alert('Please provide name and phone number.');
      return;
    }

    const created = storage.registerRecipient(regName, regPhone, regZone, regRole);
    setRecipients(storage.getRecipients());
    setNotepadLogs(storage.getNotepadLog());
    setRegSuccessMessage(`Phone number ${created.phone} registered successfully in broadcast network and logged in Notepad!`);

    setTimeout(() => {
      setRegName('');
      setRegPhone('');
      setRegSuccessMessage(null);
      setShowRegisterModal(false);
    }, 2000);
  };

  const handleSendAlert = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedList = recipients.filter(r => r.selected);
    if (selectedList.length === 0) {
      alert(language === 'ta' ? 'குறைந்தது ஒரு பெறுநரைத் தேர்ந்தெடுக்கவும்.' : 'Please select at least one alert recipient.');
      return;
    }

    // 1. Dispatch into Citizen-facing alerts
    sendEmergencyAlert({
      title: alertTitle,
      titleTa: `⚠️ அவசர வெளியேற்ற எச்சரிக்கை — ${alertArea}`,
      severity: alertRisk,
      zone: alertArea,
      affectedPopulation: alertPopulation,
      message: `${alertInstructions}\nRelocation Priority: ${alertRelocationPriority}\nDesignated Safe Hub: ${alertSafeLocation}`,
      messageTa: `கட்டளை மையத்தால் தொடங்கப்பட்ட அவசர எச்சரிக்கை. உடனடியாக ஒதுக்கப்பட்ட நிவாரண முகாம்களுக்குச் செல்லவும்.`,
      recommendedAction: alertInstructions,
      recommendedActionTa: `உடனடியாக ஒதுக்கப்பட்ட பாதுகாப்பான இடங்களுக்குச் செல்லவும்.`,
      nearbySafeAreas: [
        { name: 'Safe Area A — Government Relief Centre', code: 'SAFE AREA A', distance: '1.8 km', status: 'AVAILABLE' },
        { name: 'Safe Area D — Regional Disaster Relief Hub', code: 'SAFE AREA D', distance: '3.4 km', status: 'AVAILABLE' },
        { name: 'Safe Area C — Emergency Shelter', code: 'SAFE AREA C', distance: '2.1 km', status: 'FULL', note: 'DO NOT PROCEED' },
      ],
      issuedBy: 'Government Disaster Management Authority',
      helpline: alertHelpline,
    });

    // 2. Format & Append to Notepad Alert Log for EVERY selected recipient (Prompt Section 10 & 19)
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const formattedAlertMessage = `${alertInstructions}\nRelocation Priority: ${alertRelocationPriority}\nImmediate Action: Move to ${alertSafeLocation}.\nIssued by: Government Disaster Management Authority\nHelpline: ${alertHelpline}`;

    const newEntries: NotepadLogEntry[] = selectedList.map(rec => ({
      id: `log-${Date.now()}-${rec.id}`,
      type: 'ALERT_DISPATCH',
      date: dateStr,
      time: timeStr,
      recipient: rec.name,
      phone: rec.phone,
      phoneMasked: maskPhoneNumber(rec.phone),
      title: alertTitle,
      hazard: alertHazard,
      severity: alertRisk,
      affectedArea: alertArea,
      message: formattedAlertMessage,
      status: 'Sent',
      sender: 'Government Disaster Management Authority (TNSDMA / GCC Command)',
      timestamp: now.toISOString(),
      zone: alertArea,
    }));

    const updatedLogs = storage.appendNotepadLog(newEntries);
    setNotepadLogs(updatedLogs);

    // Save for real-time dispatch modal
    setLastDispatchedRecipients(selectedList);
    setLastDispatchedMessage(`🚨 ${alertTitle}\n📍 Area: ${alertArea}\n⚠️ Severity: ${alertRisk}\n📋 Instructions: ${alertInstructions}\n🛡️ Safe Hub: ${alertSafeLocation}\n📞 Helpline: ${alertHelpline}`);
    setShowDispatchModal(true);

    // Trigger browser notification
    triggerDesktopNotification(
      `🚨 ${alertTitle} (${alertArea})`,
      `${alertInstructions} Dispatched to ${selectedList.length} registered numbers.`
    );

    setSuccessRecipientCount(selectedList.length);
    setAlertSentSuccess(true);
    setTimeout(() => setAlertSentSuccess(false), 6000);
  };

  const handleCreateAlertFromReport = (rep: CitizenReport) => {
    setAlertArea(`${rep.location}`);
    setAlertRisk(rep.severity === 'Critical' ? 'CRITICAL' : 'HIGH');
    setAlertHazard(rep.hazardType.toLowerCase().includes('cyclone') ? 'Cyclone' : 'Flood');
    setAlertInstructions(`Ground report verified at ${rep.location}: ${rep.description}`);
    setActiveTab('dashboard');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Government Banner */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-600 text-white uppercase">
                {language === 'ta' ? 'அரசு கட்டுப்பாட்டு மையம்' : 'GOVERNMENT CONSOLE'}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-emerald-400 border border-slate-700 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{language === 'ta' ? 'நேரலை செயல்பாட்டு நிலை' : 'OPERATIONAL STATE'}</span>
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white">
              {language === 'ta' ? 'HAZARDIQ — அரசு பேரிடர் மேலாண்மை கட்டுப்பாட்டு தளம்' : 'HAZARDIQ — Government Disaster Management Console'}
            </h1>
            <p className="text-xs text-slate-400">
              {language === 'ta'
                ? 'தமிழ்நாடு மாநில பேரிடர் மேலாண்மை ஆணையம் & பெருநகர சென்னை மாநகராட்சி ஒருங்கிணைந்த கட்டளை மையம்'
                : 'Tamil Nadu State Disaster Management Authority & Greater Chennai Corporation Unified Command Desk'}
            </p>
          </div>

          {/* Quick Simulation & Logout Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={isEscalated ? resetRiskEscalation : simulateRiskEscalation}
              className={`px-4 py-2 rounded-xl text-xs font-black shadow-lg transition-all flex items-center gap-2 ${
                isEscalated
                  ? 'bg-amber-600 hover:bg-amber-700 text-white ring-2 ring-amber-300'
                  : 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
              }`}
              title="Simulates rapid flood escalation from High to Critical"
            >
              <Sparkles className="h-4 w-4" />
              <span>{isEscalated ? (language === 'ta' ? 'மீட்டமை' : 'RESET ESCALATION') : (language === 'ta' ? 'அபாய தீவிரத்தை உருவகப்படுத்து' : 'SIMULATE RISK ESCALATION')}</span>
            </button>

            <button
              onClick={logout}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              title="Logout official session"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Decision-Support Workflow Pipeline Bar */}
      <SimulationWorkflowBar isEscalated={isEscalated} />

      {/* 6 Key Operational KPI Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        <div className="p-4 rounded-xl bg-white border border-red-200 shadow-sm">
          <span className="text-slate-500 block font-medium">
            {language === 'ta' ? 'தீவிர மண்டலங்கள்' : 'Critical Zones'}
          </span>
          <strong className="text-2xl font-black text-red-600 mt-1 block">
            {isEscalated ? '9' : '8'}
          </strong>
          <span className="text-[10px] text-red-700 font-bold">P1 Immediate Egress</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-orange-200 shadow-sm">
          <span className="text-slate-500 block font-medium">
            {language === 'ta' ? 'அதிக அபாய பகுதிகள்' : 'High Risk Zones'}
          </span>
          <strong className="text-2xl font-black text-orange-600 mt-1 block">
            {isEscalated ? '13' : '14'}
          </strong>
          <span className="text-[10px] text-orange-700 font-bold">6-Hour Preparedness</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <span className="text-slate-500 block font-medium">
            {language === 'ta' ? 'பாதிக்கப்பட்ட மக்கள்' : 'People at Risk'}
          </span>
          <strong className="text-2xl font-black text-slate-900 mt-1 block">
            {isEscalated ? '20,850' : '18,450'}
          </strong>
          <span className="text-[10px] text-slate-500 font-medium">Total Affected Sector</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-amber-200 shadow-sm">
          <span className="text-slate-500 block font-medium">
            {language === 'ta' ? 'உடனடி இடமாற்றம்' : 'Immediate Relocation'}
          </span>
          <strong className="text-2xl font-black text-amber-600 mt-1 block">
            {isEscalated ? '6,600' : '4,200'}
          </strong>
          <span className="text-[10px] text-amber-700 font-bold">Priority Habitants</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-emerald-200 shadow-sm">
          <span className="text-slate-500 block font-medium">
            {language === 'ta' ? 'கிடைக்கும் முகாம் கொள்ளளவு' : 'Available Safe Capacity'}
          </span>
          <strong className="text-2xl font-black text-emerald-700 mt-1 block">
            12,800
          </strong>
          <span className="text-[10px] text-emerald-700 font-bold">8 Regional Shelters</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-blue-200 shadow-sm">
          <span className="text-slate-500 block font-medium">
            {language === 'ta' ? 'செயலில் உள்ள எச்சரிக்கைகள்' : 'Active Alerts'}
          </span>
          <strong className="text-2xl font-black text-blue-700 mt-1 block">
            {notepadLogs.length}
          </strong>
          <span className="text-[10px] text-blue-700 font-bold">Recorded Dispatches</span>
        </div>
      </div>

      {/* Main Admin Console Layout: Sidebar + Working Tab */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Navigation Sidebar */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 p-3 shadow-sm space-y-1 text-xs font-semibold">
          {[
            { id: 'dashboard', label: language === 'ta' ? 'கட்டுப்பாட்டு மையம்' : 'Console Overview', icon: LayoutDashboard },
            { id: 'notepad', label: language === 'ta' ? `குறிப்பேடு பதிவு (${notepadLogs.length})` : `Alert Log / Notepad (${notepadLogs.length})`, icon: FileCode, badge: 'Active' },
            { id: 'risk-map', label: language === 'ta' ? 'சென்னை அபாய வரைபடம்' : 'Chennai Risk Map', icon: MapPin },
            { id: 'habitations', label: language === 'ta' ? 'பாதிப்பு குடியிருப்புகள்' : 'Vulnerable Habitations', icon: Users },
            { id: 'relocation', label: language === 'ta' ? 'இடமாற்ற முன்னுரிமை' : 'Relocation Priority', icon: Sliders },
            { id: 'safe-areas', label: language === 'ta' ? 'பாதுகாப்பான பகுதிகள்' : 'Safe Areas & Capacity', icon: Building2 },
            { id: 'reports', label: language === 'ta' ? `மக்கள் புகார்கள் (${reports.length})` : `Citizen Reports (${reports.length})`, icon: FileText, badge: 'Live' },
            { id: 'history', label: language === 'ta' ? 'முடிவு தணிக்கை வரலாறு' : 'Decision Audit History', icon: History },
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors text-left ${
                  isCurrent
                    ? 'bg-slate-900 text-white font-bold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.badge && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Active Content Area */}
        <div className="lg:col-span-9 space-y-6">
          {/* TAB 1: DASHBOARD / OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Emergency Alert Dispatcher Panel with Recipient Selection */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Radio className="h-4 w-4 text-red-600 animate-pulse" />
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                      {language === 'ta' ? 'அவசர எச்சரிக்கை அனுப்புதல் & பெறுநர்கள் தேர்வு' : 'Emergency Alert Dispatcher & Recipient Selection'}
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {language === 'ta' ? 'உடனடி எச்சரிக்கை ஒளிபரப்பு' : 'Instant Authority Broadcast'}
                  </span>
                </div>

                {alertSentSuccess && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 font-bold flex items-center justify-between gap-2 text-xs shadow-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                      <span>
                        {language === 'ta'
                          ? `எச்சரிக்கை வெற்றிகரமாக ${successRecipientCount} பெறுநர்களுக்கு அனுப்பப்பட்டது மற்றும் குறிப்பேட்டில் பதிவு செய்யப்பட்டது!`
                          : `Alert sent successfully to ${successRecipientCount} authority recipients and recorded in Notepad log.`}
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveTab('notepad')}
                      className="text-xs text-blue-700 underline font-bold"
                    >
                      {language === 'ta' ? 'பதிவைக் காண்க →' : 'View in Notepad →'}
                    </button>
                  </div>
                )}

                <form onSubmit={handleSendAlert} className="space-y-5">
                  {/* Alert Parameters Grid (Prompt Section 9) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="font-bold text-slate-700">
                        {language === 'ta' ? 'எச்சரிக்கை தலைப்பு' : 'Alert Title'}
                      </label>
                      <input
                        type="text"
                        required
                        value={alertTitle}
                        onChange={(e) => setAlertTitle(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">
                        {language === 'ta' ? 'பேரிடர் வகை' : 'Hazard Type'}
                      </label>
                      <select
                        value={alertHazard}
                        onChange={(e) => setAlertHazard(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 font-semibold"
                      >
                        <option value="Flood">Flood (வெள்ளம்)</option>
                        <option value="Cyclone">Cyclone (புயல் & அலை எழுச்சி)</option>
                        <option value="Multi-Hazard">Multi-Hazard (பல்வேறு பேரிடர்)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">
                        {language === 'ta' ? 'பாதிக்கப்பட்ட பகுதி' : 'Affected Area'}
                      </label>
                      <input
                        type="text"
                        required
                        value={alertArea}
                        onChange={(e) => setAlertArea(e.target.value)}
                        placeholder="e.g. Pallikaranai, Velachery, Royapuram..."
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">
                        {language === 'ta' ? 'அபாய நிலை' : 'Risk Level & Severity'}
                      </label>
                      <select
                        value={alertRisk}
                        onChange={(e) => setAlertRisk(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 font-bold"
                      >
                        <option value="CRITICAL">CRITICAL / EXTREME (Immediate Evacuation)</option>
                        <option value="HIGH">HIGH (6-Hour Window)</option>
                        <option value="MODERATE">MODERATE (Advisory Notice)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">
                        {language === 'ta' ? 'மதிப்பிடப்பட்ட மக்கள் தொகை' : 'Affected Population Estimate'}
                      </label>
                      <input
                        type="number"
                        required
                        value={alertPopulation}
                        onChange={(e) => setAlertPopulation(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 font-mono"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="font-bold text-slate-700">
                        {language === 'ta' ? 'அவசர கால வழிமுறைகள் & உடனடி நடவடிக்கை' : 'Immediate Action & Instructions'}
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={alertInstructions}
                        onChange={(e) => setAlertInstructions(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">
                        {language === 'ta' ? 'பாதுகாப்பான இடமாற்றப் பகுதி' : 'Designated Safe Relocation Hub'}
                      </label>
                      <input
                        type="text"
                        required
                        value={alertSafeLocation}
                        onChange={(e) => setAlertSafeLocation(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">
                        {language === 'ta' ? 'அவசர உதவி எண்' : 'Emergency Contact Information'}
                      </label>
                      <input
                        type="text"
                        required
                        value={alertHelpline}
                        onChange={(e) => setAlertHelpline(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 font-mono font-bold"
                      />
                    </div>
                  </div>

                  {/* AUTHORIZED RECIPIENT SELECTION (Prompt Section 8: Masked Numbers) */}
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span>{language === 'ta' ? 'அதிகாரப்பூர்வ எச்சரிக்கை பெறுநர்கள் (அவசரகால ஒளிபரப்பு)' : 'Government Alert Recipients (Emergency Broadcast Network)'}</span>
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          {language === 'ta' ? 'பாதுகாப்பு கருதி எண்கள் மறைக்கப்பட்டுள்ளன' : 'Recipients selected for broadcast dispatch. Numbers masked for privacy.'}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setShowRegisterModal(true)}
                          className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-2xs"
                        >
                          <UserPlus className="h-3.5 w-3.5" />
                          <span>+ {language === 'ta' ? 'புதிய எண் பதிவு' : 'Register New Phone'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleToggleAllRecipients}
                          className="text-xs text-blue-600 hover:text-blue-800 font-bold underline"
                        >
                          {selectAllRecipients ? (language === 'ta' ? 'அனைத்தையும் நீக்கு' : 'Deselect All') : (language === 'ta' ? 'அனைத்தையும் தேர்ந்தெடு' : `Select All (${recipients.length})`)}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 max-h-56 overflow-y-auto">
                      {recipients.map((rec) => (
                        <div
                          key={rec.id}
                          className={`flex items-center justify-between p-2.5 rounded-lg border transition-colors ${
                            rec.selected
                              ? 'bg-white border-blue-400 shadow-xs'
                              : 'bg-slate-100/70 border-slate-200 opacity-60'
                          }`}
                        >
                          <label className="flex items-center gap-2 cursor-pointer flex-1 min-w-0">
                            <input
                              type="checkbox"
                              checked={rec.selected}
                              onChange={() => handleToggleRecipient(rec.id)}
                              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 shrink-0"
                            />
                            <div className="truncate">
                              <span className="font-bold text-slate-900 text-xs block truncate">{rec.name}</span>
                              <span className="text-[10px] text-slate-500 block truncate">{rec.designation}</span>
                            </div>
                          </label>
                          <div className="flex items-center gap-1.5 shrink-0 ml-2">
                            <div className="text-right font-mono text-[11px] font-bold text-slate-700 mr-1 hidden sm:block">
                              {maskPhoneNumber(rec.phone)}
                            </div>
                            <a
                              href={getDirectSmsUrl(rec.phone, `${alertTitle}: ${alertInstructions}`)}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={`Send instant SMS to ${rec.phone}`}
                              className="p-1.5 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-[10px] font-bold flex items-center gap-0.5"
                            >
                              <Smartphone className="h-3 w-3" />
                              <span className="hidden md:inline">SMS</span>
                            </a>
                            <a
                              href={getDirectWhatsAppUrl(rec.phone, `${alertTitle}: ${alertInstructions}`)}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={`Send direct WhatsApp to ${rec.phone}`}
                              className="p-1.5 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-[10px] font-bold flex items-center gap-0.5"
                            >
                              <MessageSquare className="h-3 w-3" />
                              <span className="hidden md:inline">WA</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex justify-between items-center">
                    <span className="text-[11px] text-slate-500">
                      {recipients.filter(r => r.selected).length} {language === 'ta' ? 'பெறுநர்கள் தேர்ந்தெடுக்கப்பட்டுள்ளனர்' : 'recipients selected'}
                    </span>
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-md transition-colors"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>{language === 'ta' ? 'எச்சரிக்கை அனுப்புக' : 'SEND ALERT'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Citizen Incident Reports Queue Table */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-slate-700" />
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                      {language === 'ta' ? 'மக்கள் சம்பவ புகார்கள்' : 'Citizen Incident Reports Queue'}
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Total: {reports.length} Reports
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 uppercase text-[11px]">
                      <tr>
                        <th className="py-2.5 px-3">Report ID</th>
                        <th className="py-2.5 px-3">Location</th>
                        <th className="py-2.5 px-3">Hazard</th>
                        <th className="py-2.5 px-3">Severity</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {reports.map((rep) => (
                        <tr key={rep.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-3 font-mono font-bold text-red-600">
                            {rep.reportId}
                          </td>
                          <td className="py-3 px-3 text-slate-800 font-semibold max-w-xs truncate">
                            {rep.location}
                          </td>
                          <td className="py-3 px-3 text-slate-700">{rep.hazardType}</td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                rep.severity === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                              }`}
                            >
                              {rep.severity}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                                rep.status === 'NEW'
                                  ? 'bg-blue-100 text-blue-800'
                                  : rep.status === 'VERIFIED'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {rep.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right space-x-1.5 flex-shrink-0">
                            <button
                              onClick={() => setSelectedReportForReview(rep)}
                              className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px]"
                            >
                              Review
                            </button>
                            {rep.status === 'NEW' && (
                              <button
                                onClick={() => updateReportStatus(rep.reportId, 'VERIFIED')}
                                className="px-2 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[11px] border border-emerald-300"
                              >
                                Verify
                              </button>
                            )}
                            <button
                              onClick={() => handleCreateAlertFromReport(rep)}
                              className="px-2 py-1 rounded bg-red-50 hover:bg-red-100 text-red-700 font-bold text-[11px] border border-red-300"
                            >
                              Create Alert
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: NOTEPAD ALERT LOG & EXPORT */}
          {activeTab === 'notepad' && (
            <NotepadAlertLog logs={notepadLogs} />
          )}

          {/* TAB 2: CITIZEN REPORTS */}
          {activeTab === 'reports' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-base font-black text-slate-900">All Citizen Incident Reports</h3>
              <p className="text-xs text-slate-500">
                Ground-truth incident feed submitted via the citizen hazard reporting module.
              </p>
              <div className="space-y-3 pt-2">
                {reports.map((rep) => (
                  <div key={rep.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <strong className="font-mono text-red-600 text-sm">{rep.reportId}</strong>
                        <span className="font-bold text-slate-900">{rep.location}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-blue-100 text-blue-800">
                        {rep.status}
                      </span>
                    </div>
                    <p className="text-slate-700">{rep.description}</p>
                    <div className="flex justify-between items-center text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                      <span>Reported: {rep.timestamp}</span>
                      <div className="space-x-2">
                        <button
                          onClick={() => setSelectedReportForReview(rep)}
                          className="text-blue-600 font-bold hover:underline"
                        >
                          View Full Details
                        </button>
                        {rep.status === 'NEW' && (
                          <button
                            onClick={() => updateReportStatus(rep.reportId, 'VERIFIED')}
                            className="text-emerald-700 font-bold hover:underline"
                          >
                            Mark Verified
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: RELOCATION & HABITATIONS */}
          {(activeTab === 'relocation' || activeTab === 'habitations') && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-black text-slate-900">10 Vulnerable Habitations Monitored</h3>
                <Link to="/relocation" className="text-xs text-blue-600 font-bold hover:underline">
                  Open Relocation Matrix →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {VULNERABLE_HABITATIONS.map((hab) => (
                  <div key={hab.id} className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                    <div className="flex justify-between items-start">
                      <strong className="font-bold text-slate-900">{hab.name}</strong>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700">
                        {hab.relocationPriority}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">{hab.zoneName} • Ward {hab.wardNumber}</div>
                    <div className="pt-1 flex justify-between font-semibold text-slate-700">
                      <span>Population: {hab.population.toLocaleString()}</span>
                      <span>Risk Score: {hab.riskScore}/100</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: RISK MAP & SAFE AREAS SHORTCUTS */}
          {(activeTab === 'risk-map' || activeTab === 'safe-areas') && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4 text-center py-12">
              <h3 className="text-lg font-black text-slate-900">
                {activeTab === 'risk-map' ? 'Chennai Multi-Hazard GIS Map' : '8 Designated Safe Relocation Shelters'}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Access interactive GIS overlays, carrying capacity thresholds, and automated shelter redirect engines in the dedicated view.
              </p>
              <div className="pt-2">
                <Link
                  to={activeTab === 'risk-map' ? '/risk-map' : '/safe-areas'}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow inline-block"
                >
                  Launch Full {activeTab === 'risk-map' ? 'Risk Map' : 'Shelter Directory'} →
                </Link>
              </div>
            </div>
          )}

          {/* TAB 5: ALERTS */}
          {activeTab === 'alerts' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900">Active Emergency Broadcasts</h3>
                  <button
                    onClick={() => setActiveTab('notepad')}
                    className="text-xs text-blue-600 font-bold hover:underline"
                  >
                    Open Notepad Log View →
                  </button>
                </div>
                <p className="text-xs text-slate-500">
                  Manage live alerts pushed to citizen devices and emergency operations centers.
                </p>
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 space-y-2 text-xs">
                  <div className="flex justify-between font-bold">
                    <span className="text-red-700">ALT-CHE-2026-08 (Pallikaranai - Velachery Egress)</span>
                    <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px]">ACTIVE</span>
                  </div>
                  <p className="text-slate-700">
                    Critical Red Zone Evacuation Advisory broadcasted to 4,200 residents. Safe Area C flagged as FULL; redirection active.
                  </p>
                  <div className="pt-2 flex justify-end">
                    <Link to="/alerts" className="text-xs font-bold text-red-600 hover:underline">
                      Preview Citizen-Facing Alert View →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Also show Notepad log below */}
              <NotepadAlertLog logs={notepadLogs} />
            </div>
          )}

          {/* TAB 6: HISTORY */}
          {activeTab === 'history' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs">
              <h3 className="text-base font-black text-slate-900">Decision Audit Log</h3>
              <div className="space-y-2 text-slate-600">
                <div className="p-2.5 rounded bg-slate-50 border border-slate-200 flex justify-between">
                  <span>[09:15 AM] Inundation depth threshold exceeded (+1.5m) in Velachery basin.</span>
                  <span className="font-mono text-slate-400">SYS-MON</span>
                </div>
                <div className="p-2.5 rounded bg-slate-50 border border-slate-200 flex justify-between">
                  <span>[09:22 AM] Relocation priority calculated: Zone A designated P1 Immediate.</span>
                  <span className="font-mono text-slate-400">ENGINE</span>
                </div>
                <div className="p-2.5 rounded bg-slate-50 border border-slate-200 flex justify-between">
                  <span>[09:30 AM] Safe Area C reached capacity (2,500/2,500). Redirection to Safe Area D invoked.</span>
                  <span className="font-mono text-slate-400">CAPACITY</span>
                </div>
                <div className="p-2.5 rounded bg-slate-50 border border-slate-200 flex justify-between">
                  <span>[09:42 AM] Emergency broadcast alert ALT-CHE-2026-08 authorized and dispatched.</span>
                  <span className="font-mono text-slate-400">COMMAND</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Review Modal for Citizen Report */}
      {selectedReportForReview && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono font-bold text-red-600">{selectedReportForReview.reportId}</span>
                <h4 className="text-base font-black text-slate-900">Incident Review Desk</h4>
              </div>
              <button
                onClick={() => setSelectedReportForReview(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {selectedReportForReview.photoUrl && (
              <img
                src={selectedReportForReview.photoUrl}
                alt="Field Proof"
                className="h-44 w-full object-cover rounded-xl border border-slate-200"
              />
            )}

            <div className="space-y-1.5">
              <div><strong>Location:</strong> {selectedReportForReview.location} ({selectedReportForReview.zone})</div>
              <div><strong>Hazard:</strong> {selectedReportForReview.hazardType} • <strong>Severity:</strong> {selectedReportForReview.severity}</div>
              <div><strong>Status:</strong> {selectedReportForReview.status}</div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">
                {selectedReportForReview.description}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              {selectedReportForReview.status === 'NEW' && (
                <button
                  onClick={() => {
                    updateReportStatus(selectedReportForReview.reportId, 'VERIFIED');
                    setSelectedReportForReview(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-bold"
                >
                  Verify Incident
                </button>
              )}
              <button
                onClick={() => {
                  handleCreateAlertFromReport(selectedReportForReview);
                  setSelectedReportForReview(null);
                }}
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-bold"
              >
                Generate Area Alert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REAL-TIME ALERT DISPATCH TRANSMISSION MODAL */}
      {showDispatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-black">
                  <BellRing className="h-6 w-6 animate-bounce" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <span>Emergency Alert Dispatched to Network</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      DELIVERY IN PROGRESS
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Dispatched to {lastDispatchedRecipients.length} phone numbers and registered in the official Notepad alert log.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDispatchModal(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Alert Message Summary */}
            <div className="p-3.5 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-2 border border-slate-800">
              <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-1.5">
                <span className="font-bold text-amber-400">DISPATCHED MESSAGE PAYLOAD</span>
                <span>STATUS: RECORDED & SENT</span>
              </div>
              <p className="whitespace-pre-line text-slate-200 leading-relaxed font-sans text-xs">
                {lastDispatchedMessage}
              </p>
            </div>

            {/* Recipients Live Status & Direct Action Buttons */}
            <div className="space-y-2 flex-1 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Target Phone Recipients ({lastDispatchedRecipients.length}):</span>
                <span className="text-[11px] text-slate-500">Click SMS or WhatsApp to launch real mobile transmission</span>
              </div>

              <div className="space-y-1.5 overflow-y-auto pr-1 flex-1 max-h-56">
                {lastDispatchedRecipients.map((rec) => (
                  <div
                    key={rec.id}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100/80 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900 truncate">{rec.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-mono">
                          {rec.phone}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 block truncate">{rec.designation}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 ml-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1 mr-1">
                        <Check className="h-3 w-3" />
                        <span>Logged</span>
                      </span>
                      <a
                        href={getDirectSmsUrl(rec.phone, lastDispatchedMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold flex items-center gap-1 shadow-2xs transition-colors"
                      >
                        <Smartphone className="h-3 w-3" />
                        <span>SMS</span>
                      </a>
                      <a
                        href={getDirectWhatsAppUrl(rec.phone, lastDispatchedMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center gap-1 shadow-2xs transition-colors"
                      >
                        <MessageSquare className="h-3 w-3" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notepad Dual Recording Confirmation */}
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs text-amber-900">
              <div className="flex items-center gap-2">
                <FileCode className="h-4 w-4 text-amber-700 shrink-0" />
                <span>
                  <strong>Dual Record Active:</strong> This broadcast was simultaneously registered in the website storage and appended to the <strong>Notepad Log File</strong>.
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowDispatchModal(false);
                  setActiveTab('notepad');
                }}
                className="font-bold underline text-amber-950 hover:text-amber-800 shrink-0 ml-2"
              >
                Open Notepad Log →
              </button>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setShowDispatchModal(false)}
                className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-colors"
              >
                Close & Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PHONE NUMBER REGISTRATION MODAL (Notepad + Website Dual Registration) */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <UserPlus className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Register Phone Number</h3>
                  <p className="text-[11px] text-slate-500">
                    Saves to website broadcast list & records in Notepad log
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {regSuccessMessage && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>{regSuccessMessage}</span>
              </div>
            )}

            <form onSubmit={handleRegisterNewPhone} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subscriber / Official Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Rajesh Kumar"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone Number (10 Digits) *</label>
                <div className="flex items-center">
                  <span className="px-3 py-2.5 bg-slate-100 border border-r-0 border-slate-300 rounded-l-lg text-xs font-mono text-slate-600">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full text-xs p-2.5 rounded-r-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-mono"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Alerts will be dispatched to this mobile phone via SMS & WhatsApp</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Zone / Habitation Area</label>
                <select
                  value={regZone}
                  onChange={(e) => setRegZone(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                >
                  <option value="Zone XIV (Pallikaranai / Velachery)">Zone XIV (Pallikaranai / Velachery)</option>
                  <option value="Zone XIII (Adyar / Besant Nagar)">Zone XIII (Adyar / Besant Nagar)</option>
                  <option value="Zone IX (T. Nagar / Mambalam)">Zone IX (T. Nagar / Mambalam)</option>
                  <option value="Zone XV (Sholinganallur / OMR)">Zone XV (Sholinganallur / OMR)</option>
                  <option value="Zone X (Kodambakkam / Guindy)">Zone X (Kodambakkam / Guindy)</option>
                  <option value="All City Zones (Master Broadcast)">All City Zones (Master Broadcast)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Role / Affiliation</label>
                <select
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                >
                  <option value="Resident Citizen Subscriber">Resident Citizen Subscriber</option>
                  <option value="Local Ward Volunteer">Local Ward Volunteer</option>
                  <option value="Disaster Relief Officer">Disaster Relief Officer</option>
                  <option value="Emergency Responder / NDRF">Emergency Responder / NDRF</option>
                  <option value="Community Leader / RWA Representative">Community Leader / RWA Representative</option>
                </select>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md flex items-center gap-1.5"
                >
                  <Check className="h-4 w-4" />
                  <span>Register & Save in Notepad</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
