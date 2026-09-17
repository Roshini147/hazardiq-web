import React from 'react';
import {
  Database,
  Cpu,
  ShieldCheck,
  LifeBuoy,
  ArrowDown,
  CheckCircle2,
  FileSpreadsheet,
  Users,
  MapPin,
  Building2,
  Compass,
  BellRing,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const HowItWorksPage: React.FC = () => {
  const { language } = useApp();

  const steps = [
    {
      title: language === 'ta' ? '1. தரவு உள்ளீடு & தொலை உணர்வு' : '1. DATA INGESTION & SENSING',
      badge: language === 'ta' ? 'உள்ளீட்டு அடுக்கு' : 'INPUT LAYER',
      color: 'border-blue-500 bg-blue-50/50',
      icon: Database,
      items: [
        language === 'ta' ? 'பல-அபாய வெள்ளப்பெருக்கு & வானிலை தரவு' : 'Multi-hazard Inundation & Meteorological Flooding Data',
        language === 'ta' ? 'வார்டு அளவிலான மக்கள் தொகை கணக்கெடுப்பு புள்ளிவிவரங்கள்' : 'Ward-level Census Population & Demographics',
        language === 'ta' ? 'டிஜிட்டல் உயர மாதிரிகள் (DEM) & நிலப்பரப்பு உயரக் கோடுகள்' : 'Digital Elevation Models (DEM) & Topographical Contours',
        language === 'ta' ? 'சாலை கட்டமைப்பு & முக்கிய வெளியேற்ற தமனிகள்' : 'Road Network Topology & Critical Evacuation Arterials',
        language === 'ta' ? 'பாதுகாப்பான முகாம்கள் & நிவாரண மையங்களின் தாங்கும் திறன்' : 'Designated Safe Shelters & Community Relief Capacity',
        language === 'ta' ? 'அவசர மருத்துவமனை வசதிகள் & தீவிர சிகிச்சை படுக்கைகள்' : 'Hospital Emergency Facilities & Trauma Resources',
        language === 'ta' ? 'வரலாற்று பேரிடர் பதிவுகள் (2015, 2023 சென்னை வெள்ளம்)' : 'Historical Disaster Recurrence (2015, 2023 flood baselines)',
        language === 'ta' ? 'கள நிலவரத்தை உறுதிப்படுத்தும் மக்கள் சம்பவப் புகார்கள்' : 'Real-time Ground Truth Citizen Incident Reports',
      ],
    },
    {
      title: language === 'ta' ? '2. நுண்ணறிவு புவிசார் பகுப்பாய்வு' : '2. INTELLIGENT GIS ANALYSIS',
      badge: language === 'ta' ? 'பகுப்பாய்வு இயந்திர அடுக்கு' : 'ENGINE LAYER',
      color: 'border-amber-500 bg-amber-50/50',
      icon: Cpu,
      items: [
        language === 'ta' ? 'பேரிடர் அபாய பகுப்பாய்வு: தாழ்வான வடிநில மண்டலங்களை வரைபடமாக்குதல்' : 'Hazard Identification: Delineation of low-lying catchment zones',
        language === 'ta' ? 'மக்கள் வெளிப்பாடு: வெள்ள நீர்மட்டத்துடன் குடியிருப்புகளை தொடர்புபடுத்துதல்' : 'Exposure Assessment: Cross-referencing habitations with flood depths',
        language === 'ta' ? 'பாதிப்பு மதிப்பீடு: குழந்தைகள், முதியவர்கள் & மாற்றுத்திறனாளிகள் அடர்த்தி' : 'Vulnerability Assessment: Quantifying infant, geriatric & PWD density',
        language === 'ta' ? 'தாங்கும் திறன் மதிப்பீடு: முகாம்களின் தற்போதைய ஆக்கிரமிப்பு வரம்புகள்' : 'Carrying Capacity Assessment: Live occupancy & threshold limits',
        language === 'ta' ? 'இடமாற்ற முன்னுரிமை: பல-காரணி அவசர குறியீடு கணக்கீடு' : 'Relocation Prioritization: Deterministic multi-factor urgency index',
      ],
    },
    {
      title: language === 'ta' ? '3. முடிவெடுக்கும் தொகுப்பு & பரிந்துரை' : '3. DECISION SUPPORT SYNTHESIS',
      badge: language === 'ta' ? 'பரிந்துரை அடுக்கு' : 'RECOMMENDATION LAYER',
      color: 'border-purple-500 bg-purple-50/50',
      icon: ShieldCheck,
      items: [
        language === 'ta' ? 'அடையாளம் காணப்பட்ட சிவப்பு மண்டலங்கள் (P1 முதல் P4 வரை முன்னுரிமை)' : 'Identified Red Zones (Critical P1 to Low P4 priority codes)',
        language === 'ta' ? 'விளக்கக்கூடிய கூட்டு அபாய மதிப்பெண்கள் (0 - 100 அளவு)' : 'Explainable Composite Risk Scores (0 - 100 scale)',
        language === 'ta' ? 'நேரலை முகாம் நிலை: கிடைக்கிறது, வரம்பிற்குட்பட்டது, அல்லது நிறைந்தது' : 'Active Shelter Status: Available, Limited, or FULL',
        language === 'ta' ? 'தானியங்கி மாற்று வழிகாட்டல் (நிறைந்த முகாம்களைத் தவிர்த்தல்)' : 'Automated Fallback Re-routing (Excluding saturated safe areas)',
        language === 'ta' ? 'மண்டல அளவிலான பல-முகாம் மறுகுடியேற்ற ஒதுக்கீடு திட்டம்' : 'Cluster Multi-Shelter Relocation Allocation Plans',
      ],
    },
    {
      title: language === 'ta' ? '4. கள மீட்பு நடவடிக்கை & அவசர எச்சரிக்கை' : '4. FIELD RESPONSE & CITIZEN ALERT',
      badge: language === 'ta' ? 'செயலாக்க அடுக்கு' : 'EXECUTION LAYER',
      color: 'border-emerald-500 bg-emerald-50/50',
      icon: LifeBuoy,
      items: [
        language === 'ta' ? 'அரசு அவசர செயல்பாட்டுக் கட்டுப்பாட்டு மையம்' : 'Government Emergency Operations Command Dashboard',
        language === 'ta' ? 'குறிப்பிட்ட பகுதி அளவிலான மக்கள் எச்சரிக்கை ஒளிபரப்பு & அறிவிப்பு' : 'Localized Broadcast Citizen SMS & App Alerts',
        language === 'ta' ? 'நிறைந்த முகாம் எச்சரிக்கைகளுடன் பாதுகாப்பான இடமாற்ற வழிகாட்டுதல்' : 'Safe Area Wayfinding Guidance with Full-Shelter warnings',
        language === 'ta' ? 'அவசர உதவி எண் 112 & முதல் மீட்புப் படை ஒருங்கிணைப்பு' : 'Emergency 112 Hotline & First Responder Dispatch Integration',
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 md:p-8 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-600 text-white">
            {language === 'ta' ? 'அமைப்பு கட்டமைப்பு & வழிமுறை' : 'SYSTEM ARCHITECTURE & METHODOLOGY'}
          </span>
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
            {language === 'ta' ? 'செயல்பாட்டு பேரிடர் முடிவெடுக்கும் கட்டமைப்பு' : 'OPERATIONAL DECISION-SUPPORT PIPELINE'}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-white">
          {language === 'ta' ? 'HAZARDIQ எவ்வாறு செயல்படுகிறது?' : 'How HAZARDIQ Works'}
        </h1>
        <p className="text-xs md:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          {language === 'ta'
            ? 'HAZARDIQ பேரிடர் மேலாண்மை வாழ்க்கைச் சுழற்சியை ஒரு தொடர்ச்சியான, வெளிப்படையான முடிவெடுக்கும் பணிப்பாய்வாக ஒருங்கிணைக்கிறது. மாநில பேரிடர் மேலாண்மை ஆணையம் மற்றும் மாவட்ட நிர்வாகத்திற்கு உதவும் வகையில் வடிவமைக்கப்பட்டுள்ளது.'
            : 'HAZARDIQ unifies the fragmented disaster management lifecycle into a continuous, explainable decision pipeline. Designed with open GIS standards to support state disaster authorities and district collectorates.'}
        </p>
      </div>

      {/* 4-Stage Sequential Pipeline */}
      <div className="space-y-6">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={idx}>
              <div className={`rounded-2xl border-2 ${step.color} p-6 shadow-sm bg-white space-y-4`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black shadow">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">
                        {step.badge}
                      </span>
                      <h2 className="text-base font-black text-slate-900">{step.title}</h2>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 self-start sm:self-auto">
                    STAGE 0{idx + 1}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                  {step.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {idx < steps.length - 1 && (
                <div className="flex justify-center">
                  <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                    <ArrowDown className="h-4 w-4" />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Bottom CTA to Risk Map */}
      <div className="text-center pt-4">
        <Link
          to="/risk-map"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-colors"
        >
          <MapPin className="h-4 w-4" />
          <span>{language === 'ta' ? 'சென்னை அபாய வரைபடத்தை ஆராயுங்கள்' : 'Explore Chennai Risk Map'}</span>
        </Link>
      </div>
    </div>
  );
};
