import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  MapPin,
  Home,
  AlertTriangle,
  FileText,
  HelpCircle,
  PhoneCall,
  Menu,
  X,
  Gauge,
  WifiOff,
  UserCheck,
  Building2,
  Users,
  Compass,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { language, toggleLanguage, lowBandwidth, toggleLowBandwidth, t, isAuthenticated } = useApp();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t.navHome, icon: Home },
    { to: '/risk-map', label: t.navRiskMap, icon: MapPin },
    { to: '/safe-areas', label: t.navSafeAreas, icon: Building2 },
    { to: '/relocation', label: t.navRelocation, icon: Users },
    { to: '/alerts', label: t.navAlerts, icon: AlertTriangle, badge: 'Live' },
    { to: '/report', label: t.navReport, icon: FileText },
    { to: '/how-it-works', label: t.navHowItWorks, icon: HelpCircle },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    if (path === '/risk-map' && location.pathname === '/map') return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-800 shadow-md">
      {/* Top Operational Government Command Bar */}
      <div className="bg-slate-950 text-slate-400 text-xs px-4 py-1 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {t.operationalNotice}
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-300 font-mono text-[11px]">{t.authorityStatement}</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Low Bandwidth Mode Switcher */}
            <button
              onClick={toggleLowBandwidth}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs transition-colors ${
                lowBandwidth
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
              title="Toggle Low Bandwidth Mode for Disaster Scenarios"
            >
              <WifiOff className="h-3 w-3" />
              <span>{lowBandwidth ? (language === 'ta' ? 'குறைந்த அலைவரிசை: ஆன்' : 'Low-BW Mode: ON') : (language === 'ta' ? 'குறைந்த அலைவரிசை' : 'Low-BW Mode')}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-slate-200 hover:text-white px-2.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 font-bold transition-colors border border-slate-700"
            >
              <span>{language === 'en' ? 'தமிழ் (TA)' : 'English (EN)'}</span>
            </button>

            {/* Authenticated Admin Quick Link */}
            {isAuthenticated && (
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                <UserCheck className="h-3 w-3" />
                <span>Console</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-lg bg-red-600 flex items-center justify-center text-white font-black shadow-lg group-hover:bg-red-500 transition-colors">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                {t.appTitle}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 uppercase">
                GCC • TNSDMA
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden md:block">
              {t.appSubtitle}
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors relative ${
                  active
                    ? 'bg-red-600 text-white font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <link.icon className="h-4 w-4" />
                <span>{link.label}</span>
                {link.badge && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action: Emergency Hotline */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="tel:112"
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-red-700 hover:bg-red-600 text-white font-bold text-sm shadow transition-colors animate-pulse"
          >
            <PhoneCall className="h-4 w-4" />
            <span>112 EMERGENCY</span>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-800 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3 py-2 rounded-md text-base font-medium ${
                isActive(link.to)
                  ? 'bg-red-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <link.icon className="h-5 w-5" />
                <span>{link.label}</span>
              </div>
              {link.badge && (
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500 text-slate-950">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}

          <div className="pt-2 border-t border-slate-800 mt-2">
            <a
              href="tel:112"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md bg-red-700 text-white font-bold text-center"
            >
              <PhoneCall className="h-5 w-5" />
              <span>EMERGENCY HELPLINE 112</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
