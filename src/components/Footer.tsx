import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, PhoneCall, Building2, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { t, language } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 mt-auto">
      {/* Operational Authority Strip */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 text-center">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 font-bold text-emerald-400">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            {language === 'ta'
              ? 'அதிகாரப்பூர்வ பேரிடர் மேலாண்மை & முடிவெடுக்கும் தளம்'
              : 'OFFICIAL GOVERNMENT DISASTER MANAGEMENT & DECISION-SUPPORT PLATFORM'}
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300 font-medium">
            {language === 'ta'
              ? 'பெருநகர சென்னை மாநகராட்சி & தமிழ்நாடு மாநில பேரிடர் மேலாண்மை ஆணையம்'
              : 'Greater Chennai Corporation & Tamil Nadu State Disaster Management Authority'}
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/80 font-mono text-[11px] font-bold">
            GCC • TNSDMA
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: About */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-white">HAZARDIQ</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                CHENNAI COMMAND
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
              {t.coreMessage1}
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-amber-300 font-semibold flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 flex-shrink-0 text-amber-400" />
              <span>{t.coreMessage2}</span>
            </div>
          </div>

          {/* Col 2: Emergency Response Helplines */}
          <div className="space-y-2 text-xs">
            <h4 className="text-slate-200 font-bold uppercase tracking-wider text-xs">
              {language === 'ta' ? 'அவசர கால கட்டுப்பாட்டு எண்கள்' : 'Emergency Control Helplines'}
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <strong className="text-slate-300">
                  {language === 'ta' ? 'அவசர உதவி எண்:' : 'Unified Emergency:'}
                </strong>{' '}
                <span className="text-red-400 font-bold">112</span>
              </li>
              <li>
                <strong className="text-slate-300">
                  {language === 'ta' ? 'மாநில பேரிடர் மையம்:' : 'State Disaster Desk:'}
                </strong>{' '}
                1070
              </li>
              <li>
                <strong className="text-slate-300">
                  {language === 'ta' ? 'மாவட்ட கட்டுப்பாட்டு மையம்:' : 'District Control:'}
                </strong>{' '}
                1077
              </li>
              <li>
                <strong className="text-slate-300">
                  {language === 'ta' ? 'சென்னை மாநகராட்சி உதவி:' : 'GCC Flood Helpline:'}
                </strong>{' '}
                1913
              </li>
              <li>
                <strong className="text-slate-300">
                  {language === 'ta' ? 'ஆணையம்:' : 'Authority:'}
                </strong>{' '}
                TNSDMA & GCC Unified Command
              </li>
            </ul>
          </div>

          {/* Col 3: Portal Links */}
          <div className="space-y-2 text-xs">
            <h4 className="text-slate-200 font-bold uppercase tracking-wider text-xs">
              {language === 'ta' ? 'விரைவு இணைப்புகள்' : 'Quick Access'}
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="/risk-map" className="hover:text-white transition-colors">
                  {t.navRiskMap}
                </Link>
              </li>
              <li>
                <Link to="/safe-areas" className="hover:text-white transition-colors">
                  {t.navSafeAreas}
                </Link>
              </li>
              <li>
                <Link to="/relocation" className="hover:text-white transition-colors">
                  {t.navRelocation}
                </Link>
              </li>
              <li>
                <Link to="/alerts" className="hover:text-white transition-colors">
                  {t.navAlerts}
                </Link>
              </li>
              <li>
                <Link to="/report" className="hover:text-white transition-colors">
                  {t.navReport}
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-white transition-colors">
                  {t.navHowItWorks}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with discrete Admin Login Link */}
        <div className="border-t border-slate-900 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 HAZARDIQ — Greater Chennai Disaster Management Platform. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 font-mono">Greater Chennai Metropolitan Region</span>
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors py-1 px-2 rounded hover:bg-slate-900 border border-slate-800"
              title="Official Access Portal"
            >
              <Lock className="h-3 w-3 text-emerald-400" />
              <span>{language === 'ta' ? 'அதிகாரப்பூர்வ உள்நுழைவு' : 'Authorized Official Login'}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
