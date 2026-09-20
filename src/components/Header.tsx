import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Home,
  AlertTriangle,
  FileText,
  PhoneCall,
  Menu,
  X,
  WifiOff,
  Building2,
  Users,
  ShieldCheck,
  User,
  LogOut,
  Globe,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    language,
    toggleLanguage,
    lowBandwidth,
    toggleLowBandwidth,
    t,
    citizen,
    isCitizenAuthenticated,
    citizenLogout,
    isAdminAuthenticated,
    adminLogout,
  } = useApp();

  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdminRoute = location.pathname.startsWith('/admin');

  // Base citizen-safe navigation links
  const citizenNavLinks = [
    { to: '/', label: t.navHome, icon: Home },
    { to: '/risk-map', label: t.navRiskMap, icon: MapPin },
    { to: '/safe-areas', label: t.navSafeAreas, icon: Building2 },
    { to: '/relocation', label: t.navRelocation, icon: Users },
    { to: '/alerts', label: t.navAlerts, icon: AlertTriangle, badge: 'Live' },
    { to: '/report', label: t.navReport, icon: FileText },
  ];

  // Government Admin Navigation Links (Only shown when admin is authenticated or on admin routes)
  const adminNavLinks = [
    { to: '/', label: language === 'ta' ? 'குடிமக்கள் தளம்' : 'Citizen Portal', icon: Home },
    { to: '/risk-map', label: t.navRiskMap, icon: MapPin },
    { to: '/safe-areas', label: t.navSafeAreas, icon: Building2 },
    { to: '/relocation', label: t.navRelocation, icon: Users },
    { to: '/alerts', label: t.navAlerts, icon: AlertTriangle, badge: 'Live' },
    {
      to: '/admin/dashboard',
      label: language === 'ta' ? 'நிர்வாக முனையம்' : 'Admin Console',
      icon: ShieldCheck,
      badge: 'Gov',
    },
  ];

  const navLinks = isAdminRoute || isAdminAuthenticated ? adminNavLinks : citizenNavLinks;

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

          <div className="flex items-center gap-3">
            {/* Citizen Active Session Badge */}
            {isCitizenAuthenticated && citizen && !isAdminRoute && (
              <div className="hidden md:flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-slate-800/90 text-slate-200 border border-slate-700 text-[11px]">
                <User className="h-3 w-3 text-red-400" />
                <span className="font-bold text-white">{citizen.name}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300 truncate max-w-[120px]">{citizen.place || citizen.zone}</span>
                <button
                  type="button"
                  onClick={citizenLogout}
                  className="ml-1 text-slate-400 hover:text-red-400 transition-colors"
                  title={t.citizenLogout}
                >
                  <LogOut className="h-3 w-3" />
                </button>
              </div>
            )}

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
              <span>{lowBandwidth ? (language === 'ta' ? 'குறைந்த அலைவரிசை: ஆன்' : 'Low-BW: ON') : (language === 'ta' ? 'குறைந்த அலைவரிசை' : 'Low-BW Mode')}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-slate-200 hover:text-white px-2.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 font-bold transition-colors border border-slate-700"
            >
              <Globe className="h-3 w-3 text-red-400" />
              <span>{language === 'en' ? 'தமிழ் (TA)' : 'English (EN)'}</span>
            </button>

            {/* If Admin is logged in or on Admin route */}
            {isAdminAuthenticated && (
              <div className="flex items-center gap-2">
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-700/60"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{language === 'ta' ? 'நிர்வாக முனையம்' : 'Admin Console'}</span>
                </Link>
                <button
                  type="button"
                  onClick={adminLogout}
                  className="text-slate-400 hover:text-red-400 p-1"
                  title={language === 'ta' ? 'வெளியேறு' : 'Logout Admin'}
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand with User's Shield Logo and RED 'IQ' */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/assets/logo.png"
            alt="HAZARDIQ Shield Logo"
            className="h-10 w-10 object-contain drop-shadow-md group-hover:scale-105 transition-transform"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white font-sans">
                HAZARD<span className="text-red-500">IQ</span>
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
          {isCitizenAuthenticated && citizen && (
            <div className="px-3 py-2 bg-slate-800/80 rounded-lg text-xs flex items-center justify-between text-slate-300 mb-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-red-400" />
                <span className="font-bold text-white">{citizen.name}</span>
                <span className="text-slate-500">({citizen.zone})</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  citizenLogout();
                  setMobileMenuOpen(false);
                }}
                className="text-red-400 hover:text-red-300 font-bold"
              >
                {t.citizenLogout}
              </button>
            </div>
          )}

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

export default Header;
