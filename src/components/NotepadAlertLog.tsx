import React, { useState } from 'react';
import { storage, NotepadLogEntry } from '../utils/storage';
import { useApp } from '../context/AppContext';
import {
  FileText,
  Copy,
  Download,
  Check,
  RotateCcw,
  Search,
  Filter,
  ExternalLink,
  Terminal,
  Clock,
  User,
  Phone,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

import { getDirectSmsUrl, getDirectWhatsAppUrl } from '../utils/messaging';

interface NotepadAlertLogProps {
  logs: NotepadLogEntry[];
  onRefresh?: () => void;
}

export const NotepadAlertLog: React.FC<NotepadAlertLogProps> = ({ logs, onRefresh }) => {
  const { language } = useApp();
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHazard, setSelectedHazard] = useState<string>('all');
  const [recordTypeFilter, setRecordTypeFilter] = useState<'all' | 'alerts' | 'registrations'>('all');
  const [activeView, setActiveView] = useState<'notepad' | 'cards'>('notepad');

  const registrationCount = logs.filter(l => l.type === 'REGISTRATION').length;
  const alertCount = logs.filter(l => l.type !== 'REGISTRATION').length;

  const filteredLogs = logs.filter((log) => {
    const isRegistration = log.type === 'REGISTRATION';
    if (recordTypeFilter === 'alerts' && isRegistration) return false;
    if (recordTypeFilter === 'registrations' && !isRegistration) return false;

    const matchesSearch =
      log.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.affectedArea && log.affectedArea.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (log.zone && log.zone.toLowerCase().includes(searchTerm.toLowerCase())) ||
      log.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.phone.includes(searchTerm) ||
      log.phoneMasked.includes(searchTerm);

    const matchesHazard =
      selectedHazard === 'all' || (log.hazard && log.hazard.toLowerCase() === selectedHazard.toLowerCase());

    return matchesSearch && matchesHazard;
  });

  const fullNotepadText = filteredLogs.map((e) => storage.formatNotepadEntry(e)).join('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(fullNotepadText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    storage.downloadNotepadLog();
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs space-y-4">
      {/* Header with Windows Notepad styled strip */}
      <div className="bg-slate-900 text-white p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-mono font-black">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                {language === 'ta' ? 'அவசர எச்சரிக்கை குறிப்பேடு & பதிவு' : 'HAZARDIQ Alert Log & Notepad'}
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-600/30 text-emerald-400 border border-emerald-500/40">
                {logs.length} {language === 'ta' ? 'பதிவுகள்' : 'Recorded Messages'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              notepad_export_active.txt • UTF-8 • {language === 'ta' ? 'தானியங்கி நிரந்தர பதிவு' : 'Auto-Appended Storage'}
            </p>
          </div>
        </div>

        {/* Action Buttons: Copy to Notepad / Clipboard & Download .txt */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-800 rounded-lg p-0.5 border border-slate-700 flex text-[11px]">
            <button
              onClick={() => setActiveView('notepad')}
              className={`px-2.5 py-1 rounded font-bold transition-colors ${
                activeView === 'notepad' ? 'bg-slate-950 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Notepad View
            </button>
            <button
              onClick={() => setActiveView('cards')}
              className={`px-2.5 py-1 rounded font-bold transition-colors ${
                activeView === 'cards' ? 'bg-slate-950 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Structured List
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold transition-colors"
            title="Copy entire formatted text log to clipboard"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? (language === 'ta' ? 'நகலெடுக்கப்பட்டது!' : 'Copied to Notepad!') : (language === 'ta' ? 'குறிப்பேட்டில் நகலெடு' : 'Copy to Notepad')}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black shadow transition-colors"
            title="Download complete alert log as .txt file"
          >
            <Download className="h-3.5 w-3.5" />
            <span>{language === 'ta' ? 'பதிவிறக்கம் (.txt)' : 'Export Alert Log (.txt)'}</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        {/* Record Type Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setRecordTypeFilter('all')}
            className={`px-2.5 py-1 rounded-full font-bold text-[11px] transition-colors ${
              recordTypeFilter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {language === 'ta' ? `அனைத்தும் (${logs.length})` : `All Records (${logs.length})`}
          </button>
          <button
            type="button"
            onClick={() => setRecordTypeFilter('alerts')}
            className={`px-2.5 py-1 rounded-full font-bold text-[11px] transition-colors ${
              recordTypeFilter === 'alerts'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-red-50 text-red-700 hover:bg-red-100'
            }`}
          >
            {language === 'ta' ? `அனுப்பிய எச்சரிக்கைகள் (${alertCount})` : `Alert Messages Sent (${alertCount})`}
          </button>
          <button
            type="button"
            onClick={() => setRecordTypeFilter('registrations')}
            className={`px-2.5 py-1 rounded-full font-bold text-[11px] transition-colors ${
              recordTypeFilter === 'registrations'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
          >
            {language === 'ta' ? `தொலைபேசி பதிவுகள் (${registrationCount})` : `Phone Registrations (${registrationCount})`}
          </button>
        </div>

        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === 'ta' ? 'பெயர், பகுதி, தொலைபேசி எண் தேடு...' : 'Search by recipient, area, or phone...'}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-slate-900 outline-none"
            />
          </div>
          {recordTypeFilter !== 'registrations' && (
            <select
              value={selectedHazard}
              onChange={(e) => setSelectedHazard(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-slate-900 outline-none"
            >
              <option value="all">{language === 'ta' ? 'அனைத்து ஆபத்துகள்' : 'All Hazards'}</option>
              <option value="flood">{language === 'ta' ? 'வெள்ளம்' : 'Flood'}</option>
              <option value="cyclone">{language === 'ta' ? 'புயல்' : 'Cyclone'}</option>
              <option value="multi-hazard">{language === 'ta' ? 'பல-அபாயம்' : 'Multi-Hazard'}</option>
            </select>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="px-4 pb-4">
        {activeView === 'notepad' ? (
          /* Realistic Windows Notepad / Terminal Text Editor View */
          <div className="relative rounded-xl border border-slate-800 bg-[#0d1117] text-slate-200 font-mono shadow-inner overflow-hidden">
            {/* Notepad Window Title Bar */}
            <div className="bg-slate-900/90 border-b border-slate-800 px-3 py-1.5 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-slate-300 font-bold">HAZARDIQ_ALERT_SYSTEM_LOG.TXT — Notepad</span>
              </div>
              <span className="text-[10px] text-slate-500">Lines: {fullNotepadText.split('\n').length}</span>
            </div>

            {/* Formatted Text Box */}
            <pre className="p-4 text-xs overflow-x-auto whitespace-pre font-mono leading-relaxed text-emerald-300/95 max-h-[480px] selection:bg-emerald-900 selection:text-white">
              {fullNotepadText || 'No matching log entries found.'}
            </pre>
          </div>
        ) : (
          /* Structured Cards View */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[480px] overflow-y-auto pr-1">
            {filteredLogs.map((item) => {
              const isRegistration = item.type === 'REGISTRATION';
              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border space-y-2 text-xs hover:border-slate-300 transition-all shadow-sm ${
                    isRegistration ? 'bg-blue-50/40 border-blue-200' : 'bg-slate-50/80 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 border-b border-slate-200/80 pb-2">
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-slate-600" />
                        <span>{item.recipient}</span>
                        {isRegistration && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                            Registered Subscriber
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1 mt-0.5">
                        <Phone className="h-3 w-3 text-slate-400" />
                        <span>{item.phoneMasked}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          isRegistration
                            ? 'bg-blue-100 text-blue-800 border border-blue-300'
                            : item.severity === 'Critical'
                            ? 'bg-red-100 text-red-800 border border-red-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {isRegistration ? 'Registered' : item.severity}
                      </span>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {item.date} • {item.time}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">{isRegistration ? 'Role & Zone:' : 'Hazard & Area:'}</span>
                      <span className="font-bold text-slate-800">
                        {isRegistration ? `${item.role || 'Subscriber'} • ${item.zone || 'Chennai'}` : `${item.hazard} • ${item.affectedArea}`}
                      </span>
                    </div>
                    <div className="p-2 rounded bg-white border border-slate-200 text-slate-700 font-mono text-[11px] whitespace-pre-line leading-relaxed">
                      {item.message}
                    </div>
                  </div>

                  {/* Direct Actions: Send Direct SMS / WhatsApp to this number */}
                  <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-slate-200/80">
                    <span className="text-emerald-700 font-bold flex items-center gap-1 text-[10px]">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>{item.status}</span>
                    </span>

                    <div className="flex items-center gap-1.5">
                      <a
                        href={getDirectSmsUrl(item.phone, `HAZARDIQ ADVISORY: ${item.title} - ${item.message}`)}
                        className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center gap-1"
                        title="Send SMS message to this phone number"
                      >
                        <span>📱 SMS</span>
                      </a>
                      <a
                        href={getDirectWhatsAppUrl(item.phone, `*HAZARDIQ EMERGENCY ADVISORY*\n*Title:* ${item.title}\n*Details:* ${item.message}`)}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold text-[10px] flex items-center gap-1"
                        title="Open WhatsApp chat with prefilled message"
                      >
                        <span>💬 WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
