import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Lock, User, KeyRound, ShieldAlert } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { login, isAuthenticated, language } = useApp();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // If already authenticated, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError(
        language === 'ta'
          ? 'தவறான பயனர் பெயர் அல்லது கடவுச்சொல். தயவுசெய்து சரிபார்க்கவும்.'
          : 'Invalid credentials. Please verify your officer credentials.'
      );
    }
  };

  const handleFillCredentials = () => {
    setUsername('admin');
    setPassword('hazardiq');
    setError('');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Authority Secure Portal Header Strip */}
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
          <span className="text-[11px] font-mono font-black text-emerald-800 flex items-center justify-center gap-1.5 uppercase">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            {language === 'ta'
              ? 'அங்கீகரிக்கப்பட்ட அரசு பேரிடர் கட்டளை மையம்'
              : 'AUTHORIZED GOVERNMENT DISASTER CONSOLE'}
          </span>
        </div>

        {/* Brand & Heading */}
        <div className="text-center space-y-1">
          <div className="h-12 w-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold mx-auto shadow-md">
            <Lock className="h-6 w-6 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {language === 'ta' ? 'அரசு பேரிடர் கட்டுப்பாட்டு மையம்' : 'Government Disaster Console'}
          </h1>
          <p className="text-xs text-slate-500">
            {language === 'ta'
              ? 'தமிழ்நாடு பேரிடர் மேலாண்மை ஆணையம் & சென்னை மாநகராட்சி கட்டளை மையம்'
              : 'Tamil Nadu Disaster Management Authority & GCC Unified Command'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {error && (
            <div className="p-2.5 rounded-lg bg-red-100 border border-red-300 text-red-800 font-bold">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 flex items-center gap-1">
              <User className="h-3.5 w-3.5 text-slate-500" />
              <span>{language === 'ta' ? 'அதிகாரி பயனர் பெயர்' : 'Officer Username'}</span>
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none text-slate-900 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 flex items-center gap-1">
              <KeyRound className="h-3.5 w-3.5 text-slate-500" />
              <span>{language === 'ta' ? 'கடவுச்சொல்' : 'Password'}</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none text-slate-900 font-mono"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-colors"
          >
            {language === 'ta' ? 'கட்டுப்பாட்டு தளத்தை அணுகவும்' : 'Access Disaster Console'}
          </button>
        </form>

        {/* Official Officer Quick Access Box */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
          <div className="flex justify-between items-center text-[11px] text-slate-600 font-bold">
            <span>{language === 'ta' ? 'அதிகாரி விரைவு அணுகல்:' : 'Authorized Officer Access:'}</span>
            <button
              type="button"
              onClick={handleFillCredentials}
              className="text-blue-600 hover:text-blue-700 underline font-bold"
            >
              {language === 'ta' ? 'விவரங்களை நிரப்புக' : 'Fill Credentials'}
            </button>
          </div>
          <div className="font-mono text-slate-700 bg-white p-2 rounded border border-slate-200 text-[11px] flex justify-between">
            <span>User: <strong>admin</strong></span>
            <span>Password: <strong>hazardiq</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
