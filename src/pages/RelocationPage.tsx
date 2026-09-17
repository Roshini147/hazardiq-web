import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { RiskZone } from '../data/hazards';
import { RiskBadge } from '../components/RiskBadge';
import {
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  Building2,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sliders,
  ChevronRight,
} from 'lucide-react';

export const RelocationPage: React.FC = () => {
  const { zones, shelters, language } = useApp();
  const location = useLocation();

  // Find Zone A or state-passed zone
  const defaultZone =
    zones.find(z => z.id === (location.state as any)?.selectedZoneId) ||
    zones.find(z => z.code === 'ZONE A') ||
    zones[0];

  const [selectedZone, setSelectedZone] = useState<RiskZone>(defaultZone);

  // Ranked Habitations Table Data (Prompt Section 15)
  const rankedZones = [
    {
      priority: 'P1',
      habitation: language === 'ta' ? 'மண்டலம் A (வேளச்சேரி - பள்ளிக்கரணை)' : 'Zone A (Velachery - Pallikaranai)',
      zoneId: 'zone-a',
      risk: 'Critical',
      vulnerability: language === 'ta' ? 'மிக அதிகம் (92%)' : 'Very High (92%)',
      population: 4200,
      action: language === 'ta' ? 'உடனடி வெளியேற்றம்' : 'Immediate Evacuation',
      actionColor: 'bg-red-100 text-red-700 border-red-300',
    },
    {
      priority: 'P2',
      habitation: language === 'ta' ? 'மண்டலம் B (மணலி - எண்ணூர் பகுதி)' : 'Zone B (Manali - Ennore Corridor)',
      zoneId: 'zone-b',
      risk: 'High',
      vulnerability: language === 'ta' ? 'அதிகம் (76%)' : 'High (76%)',
      population: 3100,
      action: language === 'ta' ? '6 மணி நேரத்திற்குள்' : 'Within 6 hrs',
      actionColor: 'bg-orange-100 text-orange-700 border-orange-300',
    },
    {
      priority: 'P3',
      habitation: language === 'ta' ? 'மண்டலம் C (சைதாப்பேட்டை - அடையாறு பகுதி)' : 'Zone C (Saidapet - Adyar Riverside)',
      zoneId: 'zone-c',
      risk: 'High / Moderate',
      vulnerability: language === 'ta' ? 'நடுத்தரம் (64%)' : 'Medium (64%)',
      population: 2800,
      action: language === 'ta' ? 'தயார் நிலை' : 'Prepare & Stage',
      actionColor: 'bg-amber-100 text-amber-700 border-amber-300',
    },
    {
      priority: 'P4',
      habitation: language === 'ta' ? 'மண்டலம் E (கிண்டி - ஆலந்தூர் மேடு)' : 'Zone E (Guindy - Alandur Ridge)',
      zoneId: 'zone-e',
      risk: 'Moderate / Low',
      vulnerability: language === 'ta' ? 'குறைவு (30%)' : 'Medium / Low (30%)',
      population: 1900,
      action: language === 'ta' ? 'கண்காணிப்பு' : 'Monitor Logistics',
      actionColor: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    },
  ];

  // Specific Zone A Factor Breakdown (Prompt Section 15)
  const priorityFactors = {
    hazardSeverity: 90,
    populationExposure: 85,
    vulnerability: 92,
    historicalRisk: 75,
    accessibility: 60,
  };

  // Multi-Shelter Allocation Plan for Zone A (Prompt Section 16)
  const shelterAllocations = [
    {
      code: 'SAFE AREA A',
      name: language === 'ta' ? 'அரசு நிவாரண மையம் (வேளச்சேரி பைபாஸ்)' : 'Government Relief Centre (Velachery Bypass)',
      available: 1800,
      allocated: 1800,
      distance: '1.8 km',
      status: 'AVAILABLE',
      suitability: '95/100',
    },
    {
      code: 'SAFE AREA D',
      name: language === 'ta' ? 'மண்டல பேரிடர் நிவாரண மையம் (கிண்டி)' : 'Regional Disaster Relief Hub (Guindy)',
      available: 2900,
      allocated: 2000,
      distance: '3.4 km',
      status: 'AVAILABLE',
      suitability: '96/100',
    },
    {
      code: 'SAFE AREA E',
      name: language === 'ta' ? 'மேல்நிலைப் பள்ளி நிவாரண மையம் (அடையாறு)' : 'Higher Secondary School Relief Centre (Adyar)',
      available: 1500,
      allocated: 400,
      distance: '4.1 km',
      status: 'AVAILABLE',
      suitability: '89/100',
    },
  ];

  const totalClusterAvailable = 1800 + 2900 + 1500; // 6,200
  const relocationRequirement = selectedZone.code === 'ZONE A' ? 4200 : selectedZone.exposedPopulation;
  const isFeasible = totalClusterAvailable >= relocationRequirement;

  return (
    <div className="space-y-8 pb-16">
      {/* Page Header */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-600 text-white">
                {language === 'ta' ? 'முடிவு ஆதரவு நுண்ணறிவு' : 'DECISION-SUPPORT INTELLIGENCE'}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                {language === 'ta' ? 'முறையான முன்னுரிமை கணிப்பு முறை' : 'DETERMINISTIC WEIGHTED ALLOCATION ALGORITHM'}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white">
              {language === 'ta' ? 'இடம்பெயர்வு முன்னுரிமை & பாதுகாப்பு முகாம் ஒதுக்கீடு' : 'Relocation Priority & Safe-Area Allocation'}
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              {language === 'ta'
                ? 'பல்முனை ஆபத்து தீவிரம், மக்கள் தொகை விவரங்கள் மற்றும் அணுகல் காரணிகளின் அடிப்படையில் தீர்மானிக்கப்பட்ட தரவரிசை.'
                : 'Deterministic ranking of vulnerable habitations based on multi-hazard intensity, demographics, and accessibility constraints.'}
            </p>
          </div>

          <Link
            to="/safe-areas"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 self-start md:self-auto"
          >
            <Building2 className="h-4 w-4 text-emerald-400" />
            <span>{language === 'ta' ? 'அனைத்து 8 முகாம்களையும் பார்க்க' : 'View All 8 Safe Shelters'}</span>
          </Link>
        </div>
      </div>

      {/* SECTION 15: RANKED RELOCATION PRIORITY TABLE */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-slate-700" />
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              {language === 'ta' ? 'இடம்பெயர்வு முன்னுரிமை அட்டவணை' : 'Relocation Priority Matrix'}
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-semibold">
            {language === 'ta'
              ? 'மதிப்பெண் விவரம் மற்றும் ஒதுக்கீட்டு திட்டத்தைக் காண வரிசையைக் கிளிக் செய்யவும்'
              : 'Click any row to view explainable score breakdown & relocation plan'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/75 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">{language === 'ta' ? 'முன்னுரிமை' : 'Priority'}</th>
                <th className="py-3 px-4">{language === 'ta' ? 'குடியிருப்பு பகுதி / மண்டலம்' : 'Habitation / Sector'}</th>
                <th className="py-3 px-4">{language === 'ta' ? 'ஆபத்து நிலை' : 'Risk Level'}</th>
                <th className="py-3 px-4">{language === 'ta' ? 'பாதிப்பு சதவிகிதம்' : 'Vulnerability'}</th>
                <th className="py-3 px-4 text-right">{language === 'ta' ? 'மக்கள் தொகை' : 'Population'}</th>
                <th className="py-3 px-4">{language === 'ta' ? 'பரிந்துரைக்கப்பட்ட நடவடிக்கை' : 'Action'}</th>
                <th className="py-3 px-4 text-center">{language === 'ta' ? 'தேர்வு' : 'Select'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {rankedZones.map((row) => {
                const isSelected = selectedZone.id === row.zoneId;
                return (
                  <tr
                    key={row.priority}
                    onClick={() => {
                      const match = zones.find(z => z.id === row.zoneId);
                      if (match) setSelectedZone(match);
                    }}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-blue-50/70 font-semibold' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-md text-xs font-black bg-slate-900 text-white font-mono">
                        {row.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-900 font-bold">{row.habitation}</td>
                    <td className="py-3 px-4">
                      <RiskBadge level={row.risk} size="sm" />
                    </td>
                    <td className="py-3 px-4 text-slate-700">{row.vulnerability}</td>
                    <td className="py-3 px-4 text-right font-black text-slate-900">
                      {row.population.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${row.actionColor}`}>
                        {row.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-xs ${
                          isSelected ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'
                        }`}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* DETAILED RELOCATION BREAKDOWN FOR SELECTED ZONE (ZONE A) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Relocation Priority Score Card */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[11px] font-mono font-bold text-slate-500 uppercase">
                {selectedZone.code} {language === 'ta' ? 'மதிப்பீடு' : 'EVALUATION'}
              </span>
              <h3 className="text-lg font-black text-slate-900">
                {language === 'ta' ? 'இடம்பெயர்வு முன்னுரிமை மதிப்பெண்' : 'Relocation Priority Score'}
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-black bg-red-100 text-red-700 border border-red-300">
              {selectedZone.priority}
            </span>
          </div>

          {/* Big Score Header */}
          <div className="bg-slate-900 text-white rounded-xl p-5 flex items-center justify-between shadow-inner">
            <div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                {language === 'ta' ? 'முன்னுரிமை கூட்டு மதிப்பெண்' : 'Composite Priority Score'}
              </div>
              <div className="text-xs text-amber-400 font-medium mt-0.5">
                {language === 'ta' ? 'எடை சூத்திர மதிப்பீடு' : 'Deterministic Weighted Formula'}
              </div>
            </div>
            <div className="text-right">
              <span className="text-4xl font-black text-white">{selectedZone.riskScore}</span>
              <span className="text-slate-400 font-semibold text-sm"> / 100</span>
            </div>
          </div>

          {/* Factors List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
              <span>{language === 'ta' ? 'அடிப்படை முடிவு காரணிகள்' : 'Underlying Decision Factors'}</span>
              <span className="text-[10px] text-slate-500 font-normal">Scale 0 - 100</span>
            </h4>

            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between text-slate-700 mb-1">
                  <span>{language === 'ta' ? 'ஆபத்து தீவிரம் (வெள்ளம் & புயல்)' : 'Hazard Severity (Flooding & Surges)'}</span>
                  <strong className="text-red-600 font-bold">{priorityFactors.hazardSeverity} / 100</strong>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                  <div className="h-full bg-red-600 rounded-full" style={{ width: `${priorityFactors.hazardSeverity}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-700 mb-1">
                  <span>{language === 'ta' ? 'பாதிப்பு குறியீடு (குழந்தைகள், முதியவர்கள், மாற்றுத்திறனாளிகள்)' : 'Vulnerability Index (Children, Elderly, PWD)'}</span>
                  <strong className="text-red-600 font-bold">{priorityFactors.vulnerability} / 100</strong>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: `${priorityFactors.vulnerability}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-700 mb-1">
                  <span>{language === 'ta' ? 'பாதிக்கப்பட்ட மக்கள் அடர்த்தி' : 'Population Exposure Density'}</span>
                  <strong className="text-orange-600 font-bold">{priorityFactors.populationExposure} / 100</strong>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: `${priorityFactors.populationExposure}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-700 mb-1">
                  <span>{language === 'ta' ? 'வரலாற்று பேரிடர் நிகழ்வுகள்' : 'Historical Disaster Recurrence'}</span>
                  <strong className="text-amber-600 font-bold">{priorityFactors.historicalRisk} / 100</strong>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${priorityFactors.historicalRisk}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-700 mb-1">
                  <span>{language === 'ta' ? 'வெளியேற்ற சாலை வசதி' : 'Evacuation Road Accessibility'}</span>
                  <strong className="text-blue-600 font-bold">{priorityFactors.accessibility} / 100 ({language === 'ta' ? 'நெருக்கடி' : 'Constricted'})</strong>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${priorityFactors.accessibility}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 text-xs flex items-center gap-2">
            <Info className="h-4 w-4 text-slate-500 flex-shrink-0" />
            <span>
              {language === 'ta'
                ? 'வெளிப்படையான மற்றும் தணிக்கை செய்யக்கூடிய கணித சூத்திரம்.'
                : 'Mathematical, audit-compliant scoring without unverified "black-box" predictions.'}
            </span>
          </div>
        </div>

        {/* Right: Section 16 Recommended Relocation Plan */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[11px] font-mono font-bold text-slate-500 uppercase">
                {language === 'ta' ? 'செயல்படுத்தக்கூடிய பேரிடர் மேலாண்மை திட்டம்' : 'ACTIONABLE DISASTER MANAGEMENT PLAN'}
              </span>
              <h3 className="text-lg font-black text-slate-900">
                {language === 'ta'
                  ? `${selectedZone.code}-க்கான பரிந்துரைக்கப்பட்ட பாதுகாப்பு இடமாற்ற திட்டம்`
                  : `Recommended Relocation Plan for ${selectedZone.code}`}
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              🟢 {language === 'ta' ? 'சாத்தியமானது' : 'FEASIBLE'}
            </span>
          </div>

          {/* Key Requirement Numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-red-50 border border-red-200">
              <span className="text-slate-600 block">
                {language === 'ta' ? 'இடம்பெயர வேண்டிய மக்கள்' : 'Population to Relocate'}
              </span>
              <strong className="text-2xl font-black text-red-600">
                {relocationRequirement.toLocaleString()}
              </strong>
            </div>
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
              <span className="text-slate-600 block">
                {language === 'ta' ? 'கிளஸ்டர் முகாம் கொள்ளளவு' : 'Cluster Safe Capacity'}
              </span>
              <strong className="text-2xl font-black text-emerald-700">
                {totalClusterAvailable.toLocaleString()}
              </strong>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 col-span-2 sm:col-span-1">
              <span className="text-slate-600 block">
                {language === 'ta' ? 'கூடுதல் இருப்பு இடங்கள்' : 'Net Surplus Capacity'}
              </span>
              <strong className="text-2xl font-black text-blue-700">
                +{(totalClusterAvailable - relocationRequirement).toLocaleString()}
              </strong>
            </div>
          </div>

          {/* Distribution Plan across recommended safe areas */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              {language === 'ta' ? 'பாதுகாப்பு முகாம்களில் இட ஒதுக்கீடு பகிர்வு' : 'Cluster Distribution across Designated Safe Areas'}
            </h4>
            <div className="space-y-3">
              {shelterAllocations.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-700">{item.code}</span>
                      <span className="font-semibold text-slate-900">{item.name}</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {language === 'ta' ? 'தொலைவு' : 'Distance'}: <strong>{item.distance}</strong> • {language === 'ta' ? 'பொருத்தம்' : 'Suitability Rating'}: <strong>{item.suitability}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right flex-shrink-0">
                    <div>
                      <span className="text-[11px] text-slate-500 block">
                        {language === 'ta' ? 'இருப்பு இடங்கள்:' : 'Available Slots:'}
                      </span>
                      <strong className="text-slate-800 font-bold">{item.available.toLocaleString()}</strong>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-300 px-3 py-1.5 rounded-lg">
                      <span className="text-[10px] text-emerald-800 block uppercase font-bold">
                        {language === 'ta' ? 'ஒதுக்கப்பட்டது' : 'Allocated'}
                      </span>
                      <strong className="text-sm font-black text-emerald-700">
                        {item.allocated.toLocaleString()} {language === 'ta' ? 'நபர்கள்' : 'evacuees'}
                      </strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Official Recommendation Message */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 text-xs text-emerald-950 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-emerald-900">
              <ShieldCheck className="h-4 w-4 text-emerald-700" />
              <span>{language === 'ta' ? 'அதிகாரப்பூர்வ முடிவு ஆதரவு பரிந்துரை:' : 'Official Decision Support Recommendation:'}</span>
            </div>
            <p className="text-slate-700 leading-relaxed font-medium">
              {language === 'ta'
                ? '"பாதிக்கப்பட்ட மக்களை பாதுகாப்பு, கொள்ளளவு மற்றும் அணுகல் வழிகளின் அடிப்படையில் அருகிலுள்ள முகாம்களுக்கு பிரிக்கவும். மருத்துவ வசதிகள் உள்ள பாதுகாப்பு முகாம் A மற்றும் முகாம் D-க்கு குழந்தைகள் மற்றும் முதியவர்களை முன்னுரிமைப்படுத்தி அனுப்பவும்."'
                : '"Distribute the affected population across suitable safe areas based on remaining capacity, safety and accessibility. Prioritize high-risk groups (children and elderly) to Safe Area A and Safe Area D due to dedicated medical wings."'}
            </p>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Link
              to="/alerts"
              className="px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow transition-colors"
            >
              {language === 'ta' ? 'வெளியேற்ற எச்சரிக்கையை அறிவிக்கவும் →' : 'Broadcast Evacuation Advisory →'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
