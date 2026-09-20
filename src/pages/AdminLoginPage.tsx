import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Lock,
  User,
  KeyRound,
  ShieldCheck,
  ArrowLeft,
  Globe,
  AlertCircle,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { t, language, toggleLanguage, adminLogin } = useApp();
  const navigate = useNavigate();

  // Government Admin Login: Strictly Username + Password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password) {
      setError(
        language === 'ta'
          ? 'பயனர் பெயர் மற்றும் கடவுச்சொல் இரண்டையும் உள்ளிடவும்.'
          : 'Please enter both username and password.'
      );
      return;
    }

    setIsAuthenticating(true);

    const success = adminLogin(username, password);

    setTimeout(() => {
      setIsAuthenticating(false);
      if (success) {
        navigate('/admin/dashboard');
      } else {
        setError(t.adminErrorInvalid);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-100 flex flex-col justify-between antialiased">
      {/* Top Strip */}
      <div className="bg-slate-950 text-slate-400 text-xs px-4 py-2 border-b border-slate-800">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white font-bold transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-emerald-400" />
            <span>{t.adminReturnCitizen}</span>
          </Link>

          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1 text-slate-200 hover:text-white px-2.5 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 font-bold transition-colors border border-slate-700 text-xs"
          >
            <Globe className="h-3 w-3 text-red-400" />
            <span>{language === 'en' ? 'தமிழ் (TA)' : 'English (EN)'}</span>
          </button>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white text-slate-900 rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
          
          {/* Header Strip with Government Brand */}
          <div className="bg-slate-950 text-white px-6 py-7 border-b border-slate-800 text-center space-y-3">
            <div className="flex items-center justify-center">
              <img
                src="/assets/logo.png"
                alt="HAZARDIQ Official Logo"
                className="h-16 w-16 object-contain drop-shadow-md"
              />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-sans text-white">
                HAZARD<span className="text-red-500">IQ</span>
              </h1>
              <p className="text-xs text-slate-400 font-mono tracking-wider uppercase mt-0.5">
                {t.adminLoginSubtitle}
              </p>
            </div>

            {/* Official Authority Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>{t.adminConsoleBadge}</span>
            </div>
          </div>

          {/* Form Area */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-black text-slate-900">
                {t.adminLoginTitle}
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'ta'
                  ? 'அங்கீகரிக்கப்பட்ட அரசு அலுவலர் விவரங்களை உள்ளிடவும்'
                  : 'Enter your authorized government administrator credentials'}
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Field 1: Username */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-slate-500" />
                  <span>{t.adminUsernameLabel}</span>
                  <span className="text-red-600 font-black">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder={t.adminUsernamePlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none text-slate-900 font-mono font-bold transition-all"
                />
              </div>

              {/* Field 2: Password (Masked) */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <KeyRound className="h-3.5 w-3.5 text-slate-500" />
                  <span>{t.adminPasswordLabel}</span>
                  <span className="text-red-600 font-black">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder={t.adminPasswordPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none text-slate-900 font-mono font-bold transition-all"
                />
              </div>

              {/* Field 3: Login Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {isAuthenticating ? (
                    <span>{t.adminLoggingIn}</span>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 text-emerald-400" />
                      <span>{t.adminLoginButton}</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Official Access Footnote */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 space-y-1 text-center">
              <span className="font-bold text-slate-700 block">
                {language === 'ta' ? 'அதிகாரப்பூர்வ அரசு அணுகல்' : 'Government Authorized Access Only'}
              </span>
              <span>
                {language === 'ta'
                  ? 'அங்கீகரிக்கப்படாத அணுகல் சட்டப்படி குற்றமாகும்.'
                  : 'Unauthorized attempts are logged and monitored under IT disaster security policies.'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 border-t border-slate-800 py-3 px-4 text-center text-xs">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <p>© 2026 HAZARD<span className="text-red-500">IQ</span> — Disaster Control Center</p>
          <span className="font-mono text-[11px] text-slate-600">TNSDMA / GCC</span>
        </div>
      </footer>
    </div>
  );
};

export default AdminLoginPage;
