import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { GCC_ZONES } from '../data/gccZones';
import {
  ShieldAlert,
  ShieldCheck,
  User,
  Phone,
  MapPin,
  Calendar,
  Compass,
  Lock,
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Globe,
  Building2,
  Sparkles,
} from 'lucide-react';

export const CitizenLoginPage: React.FC = () => {
  const { t, language, toggleLanguage, citizenLogin } = useApp();
  const navigate = useNavigate();

  // Citizen Form State (Strictly the required 6 fields)
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other' | 'Prefer not to say' | ''>('');
  const [age, setAge] = useState<string>('');
  const [place, setPlace] = useState('');
  const [zone, setZone] = useState('');
  const [phone, setPhone] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate Indian Phone Number: 10 digits starting with 6, 7, 8, or 9 (with optional +91 prefix)
  const validatePhone = (phoneNumber: string): boolean => {
    const cleaned = phoneNumber.replace(/[\s\-]/g, '');
    const indianPhoneRegex = /^(\+91)?[6789]\d{9}$/;
    return indianPhoneRegex.test(cleaned);
  };

  const handleValidate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = t.citizenValidationName;
    }

    if (!gender) {
      newErrors.gender = t.citizenValidationGender;
    }

    const ageNum = parseInt(age, 10);
    if (!age || isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      newErrors.age = t.citizenValidationAge;
    }

    if (!place.trim()) {
      newErrors.place = t.citizenValidationPlace;
    }

    if (!zone) {
      newErrors.zone = t.citizenValidationZone;
    }

    if (!phone.trim() || !validatePhone(phone)) {
      newErrors.phone = t.citizenValidationPhone;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidate()) return;

    setIsSubmitting(true);

    const cleanPhone = phone.replace(/[\s\-]/g, '');
    const formattedPhone = cleanPhone.startsWith('+91')
      ? cleanPhone
      : `+91 ${cleanPhone}`;

    const profile = {
      name: name.trim(),
      gender: gender as 'Male' | 'Female' | 'Other' | 'Prefer not to say',
      age: parseInt(age, 10),
      place: place.trim(),
      zone: zone,
      phone: formattedPhone,
      loginAt: new Date().toISOString(),
    };

    citizenLogin(profile);

    // Short graceful transition
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-100 flex flex-col justify-between antialiased">
      {/* Top Government Official Strip & Language Toggle */}
      <div className="bg-slate-950 text-slate-400 text-xs px-4 py-2 border-b border-slate-800">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-emerald-400">
              {language === 'ta' ? 'தமிழ்நாடு அரசு • பேரிடர் மேலாண்மை பொது தளம்' : 'GOVERNMENT OF TAMIL NADU • CITIZEN DISASTER ADVISORY PORTAL'}
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-400 font-mono text-[11px]">
              TNSDMA & GREATER CHENNAI CORPORATION
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 text-slate-200 hover:text-white px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700 font-bold transition-colors border border-slate-700 text-xs shadow-xs"
              title="Switch Language"
            >
              <Globe className="h-3.5 w-3.5 text-red-400" />
              <span>{language === 'en' ? 'தமிழ் (TA)' : 'English (EN)'}</span>
            </button>

            {/* Emergency 112 Badge */}
            <a
              href="tel:112"
              className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-red-700/80 hover:bg-red-600 text-white font-bold transition-colors shadow-xs"
            >
              <PhoneCall className="h-3 w-3" />
              <span>112</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="max-w-xl w-full bg-white text-slate-900 rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
          
          {/* Header Strip with Government Colors */}
          <div className="bg-slate-950 text-white px-6 py-6 sm:px-8 border-b border-slate-800 text-center space-y-3">
            {/* Official Logo */}
            <div className="flex items-center justify-center">
              <img
                src="/assets/logo.png"
                alt="HAZARDIQ Official Shield Logo"
                className="h-20 w-20 object-contain drop-shadow-xl"
              />
            </div>

            {/* Branded Title with RED 'IQ' */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight font-sans text-white">
                HAZARD<span className="text-red-500">IQ</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1 max-w-md mx-auto leading-relaxed">
                {t.appSubtitle}
              </p>
            </div>

            {/* Portal Type Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 text-xs font-extrabold uppercase tracking-wider">
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>{t.citizenLoginBadge}</span>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900">
                {t.citizenFormTitle}
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t.citizenFormDesc}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs" noValidate>
              {/* Field 1: Name of the Citizen */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-slate-500" />
                    <span>{t.citizenNameLabel}</span>
                    <span className="text-red-600 font-black">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                  }}
                  placeholder={t.citizenNamePlaceholder}
                  className={`w-full px-3.5 py-2.5 rounded-xl border ${
                    errors.name ? 'border-red-500 bg-red-50/40' : 'border-slate-300'
                  } focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none text-slate-900 font-medium transition-all`}
                />
                {errors.name && (
                  <p className="text-[11px] font-bold text-red-600 flex items-center gap-1 pt-0.5">
                    <AlertCircle className="h-3 w-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Grid for Gender & Age */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Field 2: Gender */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 flex items-center gap-1">
                    <span>{t.citizenGenderLabel}</span>
                    <span className="text-red-600 font-black">*</span>
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value as any);
                      if (errors.gender) setErrors(prev => ({ ...prev, gender: '' }));
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${
                      errors.gender ? 'border-red-500 bg-red-50/40' : 'border-slate-300'
                    } focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none text-slate-900 font-medium bg-white transition-all`}
                  >
                    <option value="">{t.citizenGenderSelect}</option>
                    <option value="Male">{t.citizenGenderMale}</option>
                    <option value="Female">{t.citizenGenderFemale}</option>
                    <option value="Other">{t.citizenGenderOther}</option>
                    <option value="Prefer not to say">{t.citizenGenderPreferNot}</option>
                  </select>
                  {errors.gender && (
                    <p className="text-[11px] font-bold text-red-600 flex items-center gap-1 pt-0.5">
                      <AlertCircle className="h-3 w-3" />
                      {errors.gender}
                    </p>
                  )}
                </div>

                {/* Field 3: Age */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-slate-500" />
                      <span>{t.citizenAgeLabel}</span>
                      <span className="text-red-600 font-black">*</span>
                    </span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                      if (errors.age) setErrors(prev => ({ ...prev, age: '' }));
                    }}
                    placeholder={t.citizenAgePlaceholder}
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${
                      errors.age ? 'border-red-500 bg-red-50/40' : 'border-slate-300'
                    } focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none text-slate-900 font-medium transition-all`}
                  />
                  {errors.age && (
                    <p className="text-[11px] font-bold text-red-600 flex items-center gap-1 pt-0.5">
                      <AlertCircle className="h-3 w-3" />
                      {errors.age}
                    </p>
                  )}
                </div>
              </div>

              {/* Field 4: Place */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-slate-500" />
                    <span>{t.citizenPlaceLabel}</span>
                    <span className="text-red-600 font-black">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  value={place}
                  onChange={(e) => {
                    setPlace(e.target.value);
                    if (errors.place) setErrors(prev => ({ ...prev, place: '' }));
                  }}
                  placeholder={t.citizenPlacePlaceholder}
                  className={`w-full px-3.5 py-2.5 rounded-xl border ${
                    errors.place ? 'border-red-500 bg-red-50/40' : 'border-slate-300'
                  } focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none text-slate-900 font-medium transition-all`}
                />
                {errors.place && (
                  <p className="text-[11px] font-bold text-red-600 flex items-center gap-1 pt-0.5">
                    <AlertCircle className="h-3 w-3" />
                    {errors.place}
                  </p>
                )}
              </div>

              {/* Field 5: Zone Selection */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-slate-500" />
                    <span>{t.citizenZoneLabel}</span>
                    <span className="text-red-600 font-black">*</span>
                  </span>
                </label>
                <select
                  value={zone}
                  onChange={(e) => {
                    setZone(e.target.value);
                    if (errors.zone) setErrors(prev => ({ ...prev, zone: '' }));
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl border ${
                    errors.zone ? 'border-red-500 bg-red-50/40' : 'border-slate-300'
                  } focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none text-slate-900 font-medium bg-white transition-all`}
                >
                  <option value="">{t.citizenZoneSelect}</option>
                  {GCC_ZONES.map((z) => (
                    <option key={z.id} value={z.nameEn}>
                      {language === 'ta' ? z.nameTa : z.nameEn}
                    </option>
                  ))}
                </select>
                {errors.zone && (
                  <p className="text-[11px] font-bold text-red-600 flex items-center gap-1 pt-0.5">
                    <AlertCircle className="h-3 w-3" />
                    {errors.zone}
                  </p>
                )}
              </div>

              {/* Field 6: Phone Number */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-slate-500" />
                    <span>{t.citizenPhoneLabel}</span>
                    <span className="text-red-600 font-black">*</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    {language === 'ta' ? '10 இலக்க எண்' : 'Indian 10-Digit Format'}
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold text-xs">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={14}
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                    }}
                    placeholder={t.citizenPhonePlaceholder}
                    className={`w-full pl-12 pr-3.5 py-2.5 rounded-xl border ${
                      errors.phone ? 'border-red-500 bg-red-50/40' : 'border-slate-300'
                    } focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none text-slate-900 font-mono font-medium transition-all`}
                  />
                </div>
                {errors.phone ? (
                  <p className="text-[11px] font-bold text-red-600 flex items-center gap-1 pt-0.5">
                    <AlertCircle className="h-3 w-3" />
                    {errors.phone}
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-400 pt-0.5">
                    {t.citizenPhoneHelp}
                  </p>
                )}
              </div>

              {/* Field 7: Primary Login Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-sm shadow-lg shadow-red-950/20 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>{t.citizenLoggingIn}</span>
                  ) : (
                    <>
                      <span>{t.citizenLoginButton}</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Government Information at Bottom of Login Card */}
          <div className="bg-slate-50 border-t border-slate-100 p-4 sm:p-5 text-xs text-slate-600 space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-[11px]">
              <ShieldCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              <span>{t.citizenGovFooterSubtitle}</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {t.citizenGovTerms}
            </p>

            {/* Official Helplines Row */}
            <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <span className="text-slate-500">
                {language === 'ta' ? 'அவசர எண்கள்:' : 'Helplines:'}{' '}
                <strong className="text-slate-800 font-mono">112 | 1070 | 1913</strong>
              </span>

              {/* Gateway to Admin Login */}
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 font-bold underline"
              >
                <Lock className="h-3 w-3 text-slate-500" />
                <span>{t.citizenGovOfficialLink}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Official Government Public Footer */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 py-4 px-4 text-center text-xs">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 HAZARD<span className="text-red-500">IQ</span> — Greater Chennai Disaster Management Platform. All Rights Reserved.</p>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-slate-500">GCC • TNSDMA UNIFIED PORTAL</span>
            <Link
              to="/admin/login"
              className="text-slate-400 hover:text-slate-200 font-bold flex items-center gap-1 transition-colors"
            >
              <Lock className="h-3 w-3 text-emerald-400" />
              <span>{t.openAdminConsole}</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CitizenLoginPage;
