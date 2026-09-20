import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { StaticChennaiMap } from '../components/StaticChennaiMap';
import { RedZonePanel } from '../components/RedZonePanel';
import { RiskZone } from '../data/hazards';
import {
  MapPin,
  Building2,
  Users,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  LifeBuoy,
  FileText,
  Compass,
  Activity,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { t, language, lowBandwidth, zones, selectedZone, setSelectedZone } = useApp();
  const [activeZone, setActiveZone] = useState<RiskZone | null>(selectedZone || zones[0] || null);

  const handleFeatureSelect = (feature: any) => {
    if (feature.type === 'RISK_AREA') {
      const match = zones.find(z => z.code === feature.data.code || z.id === feature.data.id);
      if (match) {
        setActiveZone(match);
        setSelectedZone(match);
      } else {
        setActiveZone(feature.data);
      }
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-12 pb-16 px-4 border-b border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="max-w-7xl mx-auto">
          {/* Top Authority Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>
              {language === 'ta'
                ? 'பெருநகர சென்னை பேரிடர் அபாய நுண்ணறிவு & இடமாற்ற மேலாண்மை தளம்'
                : 'GREATER CHENNAI MULTI-HAZARD RISK & RELOCATION PLATFORM'}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-5">
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
                {t.heroTitle}
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                {language === 'ta'
                  ? 'சென்னையில் பேரிடர் அபாயங்களை உடனுக்குடன் கண்டறிந்து, பாதிக்கப்படக்கூடிய குடியிருப்புகளை அடையாளம் கண்டு, நிவாரண முகாம்களின் தாங்கும் திறனைக் கணித்து, உடனடி அவசர எச்சரிக்கைகளை வழங்க HAZARDIQ உதவுகிறது.'
                  : 'HAZARDIQ provides real-time multi-hazard intelligence, identifies vulnerable habitations, calculates safe-area carrying capacity, prioritizes evacuation, and coordinates emergency alerts for the Greater Chennai Metropolitan Area.'}
              </p>

              {/* Central Product Message Box */}
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-sm text-sm space-y-2">
                <p className="text-slate-200 font-medium">
                  <strong>{language === 'ta' ? 'மைய பணிப்பாய்வு:' : 'Central Workflow:'}</strong> {t.coreMessage1}
                </p>
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="h-4 w-4 text-amber-400" />
                  <span>{t.coreMessage2}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/risk-map"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-950 transition-all transform hover:-translate-y-0.5"
                >
                  <MapPin className="h-4 w-4" />
                  <span>{t.exploreMapCta}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/safe-areas"
                  className="flex items-center gap-2 px-5 py-3.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-colors"
                >
                  <Building2 className="h-4 w-4 text-emerald-400" />
                  <span>{language === 'ta' ? 'முகாம் கொள்ளளவை சரிபார்க்கவும்' : 'Check Safe Capacity'}</span>
                </Link>

                <Link
                  to="/report"
                  className="flex items-center gap-2 px-5 py-3.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors"
                >
                  <FileText className="h-4 w-4 text-amber-400" />
                  <span>{t.reportHazardCta}</span>
                </Link>
              </div>
            </div>

            {/* Quick Live Stats Widget */}
            <div className="lg:col-span-4 bg-slate-950/90 rounded-2xl border border-slate-800 p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-red-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    {language === 'ta' ? 'சென்னை நேரலை நிலை' : 'Chennai Live Status'}
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">
                  {language === 'ta' ? 'நேரலை தொலை அளவீடு' : 'LIVE TELEMETRY'}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400">
                    {language === 'ta' ? 'தீவிர சிவப்பு மண்டலங்கள்:' : 'Critical Red Zones:'}
                  </span>
                  <span className="font-extrabold text-red-500 text-sm">8 Zones</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400">
                    {language === 'ta' ? 'அதிக அபாய பகுதிகள்:' : 'High Risk Sectors:'}
                  </span>
                  <span className="font-extrabold text-orange-500 text-sm">14 Zones</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400">
                    {language === 'ta' ? 'பாதிக்கப்பட்ட மக்கள்:' : 'Total Population at Risk:'}
                  </span>
                  <span className="font-extrabold text-slate-100 text-sm">18,450</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400">
                    {language === 'ta' ? 'உடனடி இடமாற்றத் தேவை:' : 'Immediate Relocation Needs:'}
                  </span>
                  <span className="font-extrabold text-amber-400 text-sm">4,200</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400">
                    {language === 'ta' ? 'கிடைக்கும் முகாம் கொள்ளளவு:' : 'Available Safe Capacity:'}
                  </span>
                  <span className="font-extrabold text-emerald-400 text-sm">12,800</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>
                  {language === 'ta' ? 'செயலில் உள்ள எச்சரிக்கைகள்:' : 'Active Alerts:'}{' '}
                  <strong className="text-red-400">3 Alerts</strong>
                </span>
                <Link to="/alerts" className="text-red-400 hover:text-red-300 font-bold underline">
                  {language === 'ta' ? 'எச்சரிக்கைகளைக் காண்க →' : 'View Alerts →'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Overview & Chennai Multi-Hazard GIS Risk Map */}
      <section className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-red-600 text-white uppercase">
                {language === 'ta' ? 'அதிகாரப்பூர்வ புவிசார் பேரிடர் வரைபடம்' : 'OPERATIONAL GIS RISK INTELLIGENCE'}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                {language === 'ta' ? 'நேரலை நிலவரம்' : 'LIVE CHENNAI OVERVIEW'}
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              {language === 'ta' ? 'சென்னை புவிசார் பேரிடர் வரைபடம் & பகுதி பகுப்பாய்வு' : 'Overview & Chennai Multi-Hazard GIS Risk Map'}
            </h2>
            <p className="text-xs text-slate-500">
              {language === 'ta'
                ? 'அபாய மண்டலங்கள், பாதுகாப்பான முகாம்கள் மற்றும் வெளியேற்றப் பாதைகளை நேரடியாக வரைபடத்தில் கிளிக் செய்து ஆராயவும்.'
                : 'Interactive tactical GIS map: Click any hazard zone polygon, designated safe shelter, or evacuation corridor.'}
            </p>
          </div>
          <Link
            to="/risk-map"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-colors"
          >
            <span>{language === 'ta' ? 'முழுத்திரை வரைபடம்' : 'Launch Full Screen Map'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <StaticChennaiMap
              selectedZoneId={activeZone?.id || activeZone?.code}
              onSelectFeature={handleFeatureSelect}
            />
          </div>
          <div className="lg:col-span-4 space-y-4">
            {activeZone ? (
              <RedZonePanel zone={activeZone} onClose={() => setActiveZone(null)} />
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-6 text-center space-y-2 text-xs text-slate-500">
                <MapPin className="h-8 w-8 text-slate-400 mx-auto" />
                <p className="font-bold text-slate-800">
                  {language === 'ta' ? 'வரைபடத்தில் ஒரு பகுதியைத் தேர்ந்தெடுக்கவும்' : 'Select a Hazard Zone on the Map'}
                </p>
                <p>
                  {language === 'ta'
                    ? 'விவரங்களை இங்கே காண வரைபடத்தில் உள்ள சிவப்பு மண்டலத்தை கிளிக் செய்யவும்.'
                    : 'Click any red or high-risk zone polygon to view its risk score, population at risk, and evacuation plan.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Decision Workflow Chain */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-xs font-mono font-bold text-red-600 uppercase tracking-widest mb-1">
            {language === 'ta' ? 'முழுமையான பேரிடர் முடிவெடுக்கும் பணிப்பாய்வு' : 'End-to-End Decision Support'}
          </h2>
          <p className="text-2xl font-bold text-slate-900">
            HAZARD<span className="text-red-600">IQ</span> {language === 'ta' ? 'பேரிடர் மேலாண்மை கட்டமைப்பு' : 'Disaster Management Pipeline'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 text-center text-xs">
          {[
            { step: language === 'ta' ? '1. பேரிடர்' : '1. HAZARD', desc: language === 'ta' ? 'அபாய அடையாளம்' : 'Identify Inundation', icon: AlertTriangle, bg: 'bg-red-50 text-red-700 border-red-200' },
            { step: language === 'ta' ? '2. வெளிப்பாடு' : '2. EXPOSURE', desc: language === 'ta' ? 'குடியிருப்புகள் வரைபடம்' : 'Map Habitations', icon: MapPin, bg: 'bg-orange-50 text-orange-700 border-orange-200' },
            { step: language === 'ta' ? '3. பாதிப்பு' : '3. VULNERABILITY', desc: language === 'ta' ? 'மக்கள் தொகை ஆய்வு' : 'Assess Demographics', icon: Users, bg: 'bg-amber-50 text-amber-700 border-amber-200' },
            { step: language === 'ta' ? '4. கொள்ளளவு' : '4. CAPACITY', desc: language === 'ta' ? 'முகாம் தாங்கும் திறன்' : 'Check Safe Shelters', icon: Building2, bg: 'bg-blue-50 text-blue-700 border-blue-200' },
            { step: language === 'ta' ? '5. இடமாற்றம்' : '5. RELOCATION', desc: language === 'ta' ? 'முன்னுரிமை ஒதுக்கீடு' : 'Prioritize & Allocate', icon: Compass, bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
            { step: language === 'ta' ? '6. எச்சரிக்கை' : '6. ALERT', desc: language === 'ta' ? 'மக்களுக்கு அறிவிப்பு' : 'Notify Citizens', icon: ShieldAlert, bg: 'bg-purple-50 text-purple-700 border-purple-200' },
            { step: language === 'ta' ? '7. மீட்பு' : '7. RESPONSE', desc: language === 'ta' ? 'கள மீட்பு நடவடிக்கை' : 'Execute Phased Action', icon: LifeBuoy, bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
          ].map((item, i) => (
            <div key={i} className={`p-3 rounded-xl border ${item.bg} flex flex-col items-center justify-center space-y-1 shadow-sm`}>
              <item.icon className="h-5 w-5 mb-0.5" />
              <div className="font-black text-[11px] uppercase tracking-tight">{item.step}</div>
              <div className="text-[10px] text-slate-600">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold mb-4">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{t.featHazardTitle}</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">{t.featHazardDesc}</p>
            <ul className="text-xs text-slate-700 space-y-1.5 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>{language === 'ta' ? 'பல-அபாய ஒருங்கிணைந்த மதிப்பெண்கள்' : 'Multi-hazard compounding scores'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>{language === 'ta' ? 'வகைப்படுத்தப்பட்ட பேரிடர் சிவப்பு மண்டலங்கள்' : 'Classified Multi-Hazard Risk Zones'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>{language === 'ta' ? 'வரலாற்று வெள்ளப்பெருக்கு வரைபடங்கள்' : 'Historical inundation baseline mapping'}</span>
              </li>
            </ul>
            <Link
              to="/risk-map"
              className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700"
            >
              <span>{language === 'ta' ? 'சிவப்பு மண்டலங்களை ஆராய்க' : 'Explore Red Zones'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold mb-4">
              <Building2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{t.featCapacityTitle}</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">{t.featCapacityDesc}</p>
            <ul className="text-xs text-slate-700 space-y-1.5 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>{language === 'ta' ? 'நேரலை முகாம் கொள்ளளவு கண்காணிப்பு' : 'Real-time occupancy tracking'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>{language === 'ta' ? 'நிறைந்த முகாம்களை தானாகத் தவிர்த்தல்' : 'Automatic full shelter exclusion'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>{language === 'ta' ? 'தானியங்கி மாற்று முகாம் வழிகாட்டுதல்' : 'Dynamic fallback recommendations'}</span>
              </li>
            </ul>
            <Link
              to="/safe-areas"
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700"
            >
              <span>{language === 'ta' ? 'பாதுகாப்பான முகாம்களைக் காண்க' : 'View Safe Shelters'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{t.featRelocationTitle}</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">{t.featRelocationDesc}</p>
            <ul className="text-xs text-slate-700 space-y-1.5 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>{language === 'ta' ? 'P1 முதல் P4 வரை முன்னுரிமை வரைபடம்' : 'P1 to P4 prioritization matrix'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>{language === 'ta' ? 'குழந்தைகள், முதியவர்கள், மாற்றுத்திறனாளிகள் சிறப்பு கவனம்' : 'Special focus on Children, Elderly, PWD'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>{language === 'ta' ? 'விளக்கக்கூடிய இடமாற்ற ஒதுக்கீடு திட்டம்' : 'Explainable relocation allocation plan'}</span>
              </li>
            </ul>
            <Link
              to="/relocation"
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
            >
              <span>{t.viewRelocationCta}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Citizen Call-to-Action Incident Reporting Strip */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-2xl bg-gradient-to-r from-red-600 to-red-800 p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="px-2.5 py-0.5 rounded bg-white/20 text-white text-xs font-bold uppercase">
              {language === 'ta' ? 'மக்கள் அவசர கால புகார்' : 'Citizen Emergency Reporting'}
            </span>
            <h3 className="text-2xl font-black">
              {language === 'ta' ? 'ஆபத்தான நீர் தேக்கம் அல்லது சேதத்தைக் கண்டீர்களா?' : 'Witnessed Dangerous Waterlogging or Structural Damage?'}
            </h3>
            <p className="text-xs text-red-100 max-w-xl">
              {language === 'ta'
                ? 'கள நிலவரங்களை நேரடியாக பேரிடர் கண்காணிப்பு அதிகாரிகளுக்கு புகாரளிக்கவும். உடனடி புகார்கள் சரிபார்க்கப்பட்டு மீட்புக் குழுக்களுக்கு அனுப்பப்படுகின்றன.'
                : 'Report dangerous field conditions directly to disaster monitoring officials. Immediate reports are verified and help direct rescue teams to vulnerable habitations.'}
            </p>
          </div>
          <Link
            to="/report"
            className="flex-shrink-0 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-red-700 font-extrabold text-sm shadow-md transition-colors"
          >
            {language === 'ta' ? 'ஆபத்தான நிலையைப் புகாரளிக்கவும்' : 'Report Dangerous Condition Now'}
          </Link>
        </div>
      </section>

      {/* SECTION 8 MANDATORY REQUIREMENT: Dedicated Bottom "Open Admin Console" Gateway */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 flex-shrink-0 shadow-md">
              <Lock className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/80 font-bold">
                  {language === 'ta' ? 'அரசு அதிகாரப்பூர்வ நுழைவு வாயில்' : 'GOVERNMENT AUTHORITY GATEWAY'}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-[11px] text-slate-400">GCC & TNSDMA Command</span>
              </div>
              <h3 className="text-xl font-black text-white">
                {language === 'ta' ? 'அரசு பேரிடர் கட்டுப்பாட்டு முனையம்' : 'Government Disaster Authority Console'}
              </h3>
              <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                {t.adminGatewayDesc}
              </p>
            </div>
          </div>

          <Link
            to="/admin/login"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-950 transition-all transform hover:-translate-y-0.5"
          >
            <Lock className="h-4 w-4" />
            <span>{t.openAdminConsole}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
