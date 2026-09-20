import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { storage } from '../utils/storage';
import { getDirectSmsUrl, getDirectWhatsAppUrl } from '../utils/messaging';
import {
  AlertTriangle,
  PhoneCall,
  Building2,
  Compass,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  BellRing,
  Smartphone,
  MessageSquare,
  UserPlus,
  Check,
} from 'lucide-react';

export const CitizenAlertsPage: React.FC = () => {
  const { alerts, language } = useApp();

  // Citizen registration state (Dual: Notepad + Website)
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regZone, setRegZone] = useState('Zone XIV (Pallikaranai / Velachery)');
  const [registeredStatus, setRegisteredStatus] = useState<string | null>(null);
  const [recipients, setRecipients] = useState(() => storage.getRecipients());

  const handleCitizenRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regPhone.trim()) {
      alert('Please provide your name and 10-digit mobile number.');
      return;
    }

    const created = storage.registerRecipient(regName, regPhone, regZone, 'Resident Citizen Subscriber');
    setRecipients(storage.getRecipients());
    setRegisteredStatus(
      `Mobile number ${created.phone} registered successfully! Added to website alerts list and recorded in Notepad log.`
    );
    setRegName('');
    setRegPhone('');
    setTimeout(() => setRegisteredStatus(null), 8000);
  };

  const primaryAlertMessage = `🚨 HAZARDIQ ALERT: High flood risk detected in Pallikaranai & Velachery. Rapid inundation water level exceeding safe thresholds. Immediately relocate to Safe Area A (Velachery Bypass) or Safe Area D (Guindy). Helpline: 112.`;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Official Operational State Emergency Broadcast Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center text-xs">
        <span className="inline-flex items-center gap-2 font-mono font-bold text-amber-400">
          <ShieldAlert className="h-4 w-4 text-emerald-400" />
          <span>
            {language === 'ta'
              ? 'அதிகாரப்பூர்வ அவசர எச்சரிக்கை ஒளிபரப்பு — தமிழ்நாடு பேரிடர் மேலாண்மை ஆணையம்'
              : 'OFFICIAL EMERGENCY BROADCAST — TAMIL NADU STATE DISASTER MANAGEMENT AUTHORITY'}
          </span>
        </span>
      </div>

      {/* CITIZEN MOBILE NUMBER REGISTRATION CARD (Dual Record: Website + Notepad) */}
      <section className="bg-white rounded-2xl border border-emerald-200 shadow-lg p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <span>{language === 'ta' ? 'அவசர SMS எச்சரிக்கைகளுக்கு பதிவு செய்க' : 'Register Phone Number for Instant Emergency Alerts'}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  DUAL LOGGING
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'ta'
                  ? 'உங்கள் எண்ணை பதிவு செய்யவும் — இணையதளத்திலும் அதிகாரப்பூர்வ நோட்பேடிலும் பதிவு செய்யப்படும்.'
                  : 'Enroll your mobile number to receive live alerts. Automatically registered on the website and logged in the Notepad record.'}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg self-start md:self-auto">
            {recipients.length} Registered Devices
          </span>
        </div>

        {registeredStatus && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>{registeredStatus}</span>
          </div>
        )}

        <form onSubmit={handleCitizenRegister} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-4">
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              {language === 'ta' ? 'உங்கள் பெயர்' : 'Full Name'} *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Roshini / Citizen"
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          <div className="sm:col-span-4">
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              {language === 'ta' ? 'மொபைல் எண் (10 இலக்கங்கள்)' : 'Mobile Phone (10 digits)'} *
            </label>
            <div className="flex">
              <span className="px-2.5 py-2 bg-slate-100 border border-r-0 border-slate-300 rounded-l-lg text-xs font-mono text-slate-600">
                +91
              </span>
              <input
                type="tel"
                required
                maxLength={10}
                placeholder="9363120075"
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value.replace(/\D/g, ''))}
                className="w-full text-xs p-2 rounded-r-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-mono"
              />
            </div>
          </div>

          <div className="sm:col-span-4 flex gap-2">
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
            >
              <Check className="h-4 w-4" />
              <span>{language === 'ta' ? 'பதிவு செய்க & சேமி' : 'Register & Save in Notepad'}</span>
            </button>
          </div>
        </form>

        {/* Quick Phone Send Shortcuts for Registered Numbers */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
          <span className="text-[11px] text-slate-500">
            Registered Contacts ({recipients.length}): {recipients.slice(0, 4).map(r => r.name).join(', ')}...
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-700">Quick Test Alert Send:</span>
            <a
              href={getDirectSmsUrl(recipients[0]?.phone || '9363120075', primaryAlertMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-[11px] font-bold flex items-center gap-1"
            >
              <Smartphone className="h-3 w-3" />
              <span>Send SMS</span>
            </a>
            <a
              href={getDirectWhatsAppUrl(recipients[0]?.phone || '9363120075', primaryAlertMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-[11px] font-bold flex items-center gap-1"
            >
              <MessageSquare className="h-3 w-3" />
              <span>Send WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* PRIMARY CITIZEN ALERT BANNER */}
      <section className="bg-white rounded-2xl border-2 border-red-600 shadow-2xl overflow-hidden animate-in fade-in duration-300">
        {/* Red Header Strip */}
        <div className="bg-red-600 text-white px-6 py-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="h-12 w-12 rounded-xl bg-white text-red-600 flex items-center justify-center font-black shadow-md shrink-0 animate-bounce">
              <AlertTriangle className="h-7 w-7" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black bg-red-900 text-red-200 uppercase tracking-wider">
                  {language === 'ta' ? 'அவசர கால ஒளிபரப்பு' : 'EMERGENCY BROADCAST'}
                </span>
                <span className="text-xs text-red-100 font-mono">CODE: ALT-CHE-2026-08</span>
              </div>
              <h1 className="text-xl md:text-2xl font-black mt-1 tracking-tight">
                {language === 'ta'
                  ? '⚠️ அதிக ஆபத்து எச்சரிக்கை — உடனடி கவனம் தேவை'
                  : '⚠️ HIGH-RISK ALERT — Immediate Attention Required'}
              </h1>
            </div>
          </div>
        </div>

        {/* Alert Body */}
        <div className="p-6 md:p-8 space-y-6 text-slate-800 text-sm">
          {/* Main Advisory Text */}
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-950 space-y-2">
            <h2 className="font-extrabold text-base text-red-900">
              {language === 'ta'
                ? 'உங்கள் பகுதி அதிக அபாய மண்டலமாக அடையாளம் காணப்பட்டுள்ளது.'
                : 'Your area has been identified as a high-risk zone.'}
            </h2>
            <p className="text-xs text-red-800 leading-relaxed font-medium">
              {language === 'ta'
                ? 'பள்ளிக்கரணை மற்றும் வேளச்சேரி பகுதிகளில் தீவிர வெள்ள நீர்மட்டம் உயர்ந்துள்ளது. உடனடியாக நியமிக்கப்பட்ட நிவாரண முகாம்களுக்கு செல்லவும்.'
                : 'Rapid inundation water level exceeding safe safety thresholds. Greater Chennai Corporation and Disaster Management Command Center advise immediate phased relocation.'}
            </p>

            {/* DIRECT TRANSMISSION BUTTONS FOR CITIZEN */}
            <div className="pt-2 border-t border-red-200 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-red-900">
                {language === 'ta' ? 'இந்த எச்சரிக்கையை மொபைல் போனுக்கு அனுப்புக:' : 'Send this alert directly to phone:'}
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={getDirectSmsUrl(recipients[0]?.phone || '9363120075', primaryAlertMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Smartphone className="h-3.5 w-3.5" />
                  <span>Send SMS to Phone</span>
                </a>
                <a
                  href={getDirectWhatsAppUrl(recipients[0]?.phone || '9363120075', primaryAlertMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>Send WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Recommended Action */}
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {language === 'ta' ? 'பரிந்துரைக்கப்பட்ட நடவடிக்கை:' : 'Recommended Action:'}
            </span>
            <div className="p-3.5 rounded-lg bg-slate-900 text-white font-bold text-sm flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
              <span>
                {language === 'ta'
                  ? 'உடனடியாக நியமிக்கப்பட்ட பாதுகாப்பான பகுதிக்குச் செல்லவும்.'
                  : 'Move to a designated safe area.'}
              </span>
            </div>
          </div>

          {/* NEARBY SAFE AREAS DIRECTORY */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-emerald-600" />
                <span>{language === 'ta' ? 'அருகிலுள்ள பாதுகாப்பான பகுதிகள்' : 'Nearby Safe Areas'}</span>
              </h3>
              <span className="text-[11px] text-slate-500">
                {language === 'ta' ? 'நேரலை முகாம் கொள்ளளவு நிலை' : 'Live Carrying Capacity Status'}
              </span>
            </div>

            <div className="space-y-2.5">
              {/* Safe Area A */}
              <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/60 flex items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900">
                    {language === 'ta' ? 'பாதுகாப்பான இடம் A — அரசு நிவாரண மையம்' : 'Safe Area A — Government Relief Centre'}
                  </div>
                  <div className="text-[11px] text-slate-600">Velachery Bypass Elevated Hub • High-capacity kitchen</div>
                </div>
                <div className="text-right flex items-center gap-3">
                  <span className="font-mono font-bold text-slate-700">1.8 km</span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-xs">
                    🟢 {language === 'ta' ? 'கிடைக்கிறது' : 'Available'}
                  </span>
                </div>
              </div>

              {/* Safe Area D */}
              <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/60 flex items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900">
                    {language === 'ta' ? 'பாதுகாப்பான இடம் D — மண்டல பேரிடர் நிவாரண மையம்' : 'Safe Area D — Regional Disaster Relief Hub'}
                  </div>
                  <div className="text-[11px] text-slate-600">Guindy High Grounds • 40-Bed Hospital Support</div>
                </div>
                <div className="text-right flex items-center gap-3">
                  <span className="font-mono font-bold text-slate-700">3.4 km</span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-xs">
                    🟢 {language === 'ta' ? 'கிடைக்கிறது' : 'Available'}
                  </span>
                </div>
              </div>

              {/* Safe Area C (FULL) */}
              <div className="p-3.5 rounded-xl border-2 border-red-300 bg-red-50 flex items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900">
                    {language === 'ta' ? 'பாதுகாப்பான இடம் C — அவசர கால முகாம் (தரமணி)' : 'Safe Area C — Emergency Shelter (Taramani)'}
                  </div>
                  <div className="text-[11px] text-red-700 font-bold">
                    {language === 'ta' ? 'கொள்ளளவு நிறைந்தது: 2,500 / 2,500 நபர்கள்' : 'Capacity Reached: 2,500 / 2,500 evacuees present'}
                  </div>
                </div>
                <div className="text-right flex items-center gap-3">
                  <span className="font-mono font-bold text-slate-500">2.1 km</span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-600 text-white shadow-xs">
                    🔴 {language === 'ta' ? 'நிறைந்தது — செல்ல வேண்டாம்' : 'FULL — Do Not Proceed'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Helpline Box */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-slate-500 font-bold block uppercase text-[11px]">
                {language === 'ta' ? 'அவசர கால உதவி எண்' : 'Emergency Helpline'}
              </span>
              <span className="text-2xl font-black text-red-600 font-mono">112</span>
              <span className="text-slate-600 ml-2">
                {language === 'ta' ? '(24x7 கட்டணமில்லா பேரிடர் உதவி மையம்)' : '(Toll Free 24x7 Command Hotline)'}
              </span>
            </div>
            <a
              href="tel:112"
              className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-sm text-center flex items-center justify-center gap-2"
            >
              <PhoneCall className="h-4 w-4" />
              <span>{language === 'ta' ? 'உடனடியாக 112 அழைக்கவும்' : 'Dial 112 Immediately'}</span>
            </a>
          </div>

          {/* Required Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-200">
            <Link
              to="/safe-areas"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm"
            >
              <Building2 className="h-4 w-4 text-emerald-400" />
              <span>{language === 'ta' ? 'பாதுகாப்பான பகுதிகளைக் காண்க' : 'View Safe Areas'}</span>
            </Link>

            <Link
              to="/"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300"
            >
              <span>HAZARD<span className="text-red-600">IQ</span></span>
            </Link>

            <Link
              to="/relocation"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm"
            >
              <Compass className="h-4 w-4" />
              <span>{language === 'ta' ? 'மறுகுடியேற்ற வழிகாட்டுதல்' : 'Relocation Guidance'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Additional Active Broadcasts List */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <BellRing className="h-4 w-4 text-slate-700" />
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              {language === 'ta' ? `அனைத்து செயலில் உள்ள சென்னை எச்சரிக்கைகள் (${alerts.length})` : `All Active Chennai Alerts (${alerts.length})`}
            </h3>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            {language === 'ta' ? 'பெருநகர சென்னை பேரிடர் கட்டமைப்பு' : 'Greater Chennai Disaster Network'}
          </span>
        </div>

        <div className="space-y-3">
          {alerts.map((alt) => (
            <div
              key={alt.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-red-600">{alt.alertCode}</span>
                  <span className="font-bold text-slate-900">
                    {language === 'ta' && alt.titleTa ? alt.titleTa : alt.title}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 border border-red-200">
                  {alt.severity}
                </span>
              </div>
              <p className="text-slate-600">
                {language === 'ta' && alt.messageTa ? alt.messageTa : alt.message}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 pt-1.5 border-t border-slate-200/60">
                <span>
                  {language === 'ta' ? 'வெளியிட்டது:' : 'Issued by:'} <strong>{alt.issuedBy}</strong> ({alt.issuedAt})
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={getDirectSmsUrl(recipients[0]?.phone || '', `HAZARDIQ ALERT: ${alt.title} - ${alt.message}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold text-blue-700 hover:text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 flex items-center gap-1"
                  >
                    <Smartphone className="h-3 w-3" />
                    <span>Send SMS</span>
                  </a>
                  <a
                    href={getDirectWhatsAppUrl(recipients[0]?.phone || '', `HAZARDIQ ALERT: ${alt.title} - ${alt.message}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1"
                  >
                    <MessageSquare className="h-3 w-3" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
