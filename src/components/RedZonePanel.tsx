import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { RiskZone } from '../data/hazards';
import { RiskBadge } from './RiskBadge';
import {
  X,
  AlertTriangle,
  Users,
  Home,
  Baby,
  UserX,
  Accessibility,
  ArrowRight,
  ShieldAlert,
  Compass,
  Building2,
  AlertCircle,
  Activity,
} from 'lucide-react';

interface RedZonePanelProps {
  zone: (RiskZone & {
    vulnerabilityScore?: number;
    carryingCapacity?: number;
    capacityDeficit?: number;
    availableShelterCapacity?: number;
  }) | null;
  onClose: () => void;
}

export const RedZonePanel: React.FC<RedZonePanelProps> = ({ zone, onClose }) => {
  const navigate = useNavigate();
  const { language } = useApp();

  if (!zone) return null;

  const handleViewRelocation = () => {
    navigate('/relocation', { state: { selectedZoneId: zone.id } });
  };

  const carryingCap = zone.carryingCapacity || 2500;
  const capacityDeficit = zone.capacityDeficit !== undefined ? zone.capacityDeficit : Math.max(0, zone.exposedPopulation - carryingCap);
  const availableCap = zone.availableShelterCapacity || 2600;
  const vulnScore = zone.vulnerabilityScore || Math.round(zone.riskScore * 0.95);

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="bg-slate-900 text-white px-5 py-4 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-600 text-white uppercase">
              {zone.code}
            </span>
            <RiskBadge level={zone.riskLevel} />
          </div>
          <h3 className="text-base font-bold text-white">{zone.name}</h3>
          <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
            <Compass className="h-3 w-3 text-red-400" />
            <span>
              {language === 'ta' ? 'பேரிடர் வகை:' : 'Hazard Type:'} <strong>{zone.hazardType}</strong>
            </span>
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
          title="Close panel"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Body */}
      <div className="p-5 overflow-y-auto space-y-4 text-slate-800 text-sm">
        {/* Risk Score Highlight */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-3.5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-red-700 uppercase tracking-wide">
              {language === 'ta' ? 'கூட்டு அபாயக் குறியீடு' : 'Composite Risk Score'}
            </div>
            <div className="text-xs text-slate-500">
              {language === 'ta' ? 'விளக்கக்கூடிய பல-அபாய அளவீடு' : 'Multi-Hazard Risk Metric'}
            </div>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-red-600">{zone.riskScore}</span>
            <span className="text-sm font-semibold text-slate-500"> / 100</span>
          </div>
        </div>

        {/* Priority Level */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-600">
            {language === 'ta' ? 'இடமாற்ற முன்னுரிமை:' : 'Relocation Priority:'}
          </span>
          <span className="text-xs font-extrabold text-red-700 bg-red-100 border border-red-300 px-2.5 py-1 rounded">
            {zone.priority}
          </span>
        </div>

        {/* Exposed Population & Households */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <Users className="h-3.5 w-3.5 text-slate-700" />
              <span>{language === 'ta' ? 'மக்கள் வெளிப்பாடு' : 'Population Exposed'}</span>
            </div>
            <div className="text-xl font-bold text-slate-900">
              {zone.exposedPopulation.toLocaleString()}
            </div>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <Home className="h-3.5 w-3.5 text-slate-700" />
              <span>{language === 'ta' ? 'குடியிருப்புகள்' : 'Households'}</span>
            </div>
            <div className="text-xl font-bold text-slate-900">
              {zone.households.toLocaleString()}
            </div>
          </div>
        </div>

        {/* SECTION 6: Carrying Capacity & Capacity Deficit Metrics */}
        <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/80 space-y-2">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 text-blue-600" />
            <span>{language === 'ta' ? 'தாங்கும் திறன் & பற்றாக்குறை' : 'Carrying Capacity & Deficit'}</span>
          </h4>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded bg-white border border-slate-200">
              <div className="text-[10px] text-slate-500">{language === 'ta' ? 'தாங்கும் திறன்' : 'Shelter Cap.'}</div>
              <strong className="text-slate-900 text-sm">{carryingCap.toLocaleString()}</strong>
            </div>
            <div className="p-2 rounded bg-white border border-slate-200">
              <div className="text-[10px] text-slate-500">{language === 'ta' ? 'பற்றாக்குறை' : 'Deficit'}</div>
              <strong className={`text-sm ${capacityDeficit > 0 ? 'text-red-600 font-bold' : 'text-emerald-700 font-bold'}`}>
                {capacityDeficit > 0 ? `+${capacityDeficit.toLocaleString()}` : '0 (Balanced)'}
              </strong>
            </div>
            <div className="p-2 rounded bg-white border border-slate-200">
              <div className="text-[10px] text-slate-500">{language === 'ta' ? 'கிடைக்கும் இடம்' : 'Available'}</div>
              <strong className="text-emerald-700 text-sm">{availableCap.toLocaleString()}</strong>
            </div>
          </div>
          {capacityDeficit > 0 && (
            <div className="p-2 rounded bg-red-50 border border-red-200 text-[11px] text-red-800 font-semibold flex items-center gap-1.5">
              <AlertCircle className="h-3.5 w-3.5 text-red-600 flex-shrink-0" />
              <span>
                {language === 'ta'
                  ? 'கொள்ளளவு பற்றாக்குறை கண்டறியப்பட்டது. அருகிலுள்ள பிற மண்டலங்களுக்கு மாற்று வழி தேவை.'
                  : 'Capacity deficit detected. Automatic redirect to external hub active.'}
              </span>
            </div>
          )}
        </div>

        {/* Vulnerable Demographic Breakdown */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              {language === 'ta' ? 'பாதிப்புக்குள்ளாகும் மக்கள் விவரம்' : 'Vulnerable Demographics'}
            </h4>
            <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              {language === 'ta' ? `பாதிப்பு: ${vulnScore}%` : `Vulnerability: ${vulnScore}%`}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-md p-2 text-center">
              <Baby className="h-4 w-4 text-amber-700 mx-auto mb-1" />
              <div className="text-xs text-slate-600">{language === 'ta' ? 'குழந்தைகள்' : 'Children'}</div>
              <div className="font-bold text-slate-900">{zone.vulnerableGroups?.children || 0}</div>
            </div>
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-md p-2 text-center">
              <UserX className="h-4 w-4 text-amber-700 mx-auto mb-1" />
              <div className="text-xs text-slate-600">{language === 'ta' ? 'முதியவர்கள்' : 'Elderly'}</div>
              <div className="font-bold text-slate-900">{zone.vulnerableGroups?.elderly || 0}</div>
            </div>
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-md p-2 text-center">
              <Accessibility className="h-4 w-4 text-amber-700 mx-auto mb-1" />
              <div className="text-xs text-slate-600">{language === 'ta' ? 'மாற்றுத்திறனாளி' : 'PWD'}</div>
              <div className="font-bold text-slate-900">{zone.vulnerableGroups?.pwd || 0}</div>
            </div>
          </div>
          <div className="mt-1 text-[11px] text-slate-500 text-right">
            {language === 'ta' ? 'மற்ற பாதிக்கப்படக்கூடிய நபர்கள்:' : 'Other vulnerable:'}{' '}
            {zone.vulnerableGroups?.otherVulnerable || 0}
          </div>
        </div>

        {/* Risk Factors */}
        <div>
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
            <span>{language === 'ta' ? 'முக்கிய அபாயக் காரணிகள்' : 'Key Risk Factors'}</span>
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {(zone.riskFactors || []).map((factor, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                <span>{factor}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommendation Snippet */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900">
          <span className="font-bold block mb-0.5">
            {language === 'ta' ? 'பரிந்துரைக்கப்பட்ட நடவடிக்கை:' : 'Recommended Action:'}
          </span>
          <span>{zone.recommendedAction}</span>
        </div>
      </div>

      {/* Footer Action */}
      <div className="p-4 bg-slate-50 border-t border-slate-200">
        <button
          onClick={handleViewRelocation}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow transition-colors"
        >
          <span>{language === 'ta' ? 'இடமாற்ற வழிகளைக் காண்க' : 'View Relocation Options'}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
