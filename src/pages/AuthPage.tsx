import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerCitizen } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../i18n/LanguageContext';
import { Users, Lock, Mail, MapPin, Globe } from 'lucide-react';

const CHENNAI_ZONES = [
  'Zone 1 - Thiruvottiyur',
  'Zone 2 - Manali',
  'Zone 3 - Madhavaram',
  'Zone 4 - Tondiarpet',
  'Zone 5 - Royapuram',
  'Zone 6 - Thiru-Vi-Ka-Nagar',
  'Zone 7 - Ambattur',
  'Zone 8 - Anna Nagar',
  'Zone 9 - Teynampet',
  'Zone 10 - Kodambakkam',
  'Zone 11 - Valasaravakkam',
  'Zone 12 - Alandur',
  'Zone 13 - Adyar',
  'Zone 14 - Perungudi',
  'Zone 15 - Sholinganallur'
];

export default function AuthPage() {
  const { t, language, setLanguage } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [formData, setFormData] = useState({
    username: 'citizen_user',
    email: 'citizen@gmail.com',
    password: 'Citizen@123',
    preferred_zone: 'Zone 13 - Adyar',
    preferred_ward: 'Ward 172',
    preferred_language: 'ta'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'LOGIN') {
        const res = await loginUser({ email: formData.email, password: formData.password });
        if (res.success) {
          login(res.data.token, res.data.user);
          if (res.data.user.preferred_language) {
            setLanguage(res.data.user.preferred_language as any);
          }
          navigate('/my-area');
        } else {
          setError(res.error?.message || 'Login failed');
        }
      } else {
        const res = await registerCitizen(formData);
        if (res.success) {
          login(res.data.token, res.data.user);
          if (formData.preferred_language) {
            setLanguage(formData.preferred_language as any);
          }
          navigate('/my-area');
        } else {
          setError(res.error?.message || 'Registration failed');
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || err.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '440px', margin: '40px auto' }}>
      <div className="panel" style={{ padding: '32px 34px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
          <button
            type="button"
            className={`filter-chip ${mode === 'LOGIN' ? 'active' : ''}`}
            onClick={() => setMode('LOGIN')}
            style={{ flex: 1, textAlign: 'center' }}
          >
            {t('nav_login')}
          </button>
          <button
            type="button"
            className={`filter-chip ${mode === 'REGISTER' ? 'active' : ''}`}
            onClick={() => setMode('REGISTER')}
            style={{ flex: 1, textAlign: 'center' }}
          >
            {t('nav_register')}
          </button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '18px', color: '#0f172a' }}>
            {mode === 'LOGIN' ? (language === 'ta' ? 'குடிமக்கள் உள்நுழைவு' : 'Public Citizen Sign In') : (language === 'ta' ? 'புதிய பயனர் பதிவு' : 'Register for Targeted Alerts')}
          </h3>
          <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
            {language === 'ta'
              ? 'உங்கள் பகுதிக்கான நேரடி அவசர பேரிடர் எச்சரிக்கைகளைப் பெற உள்நுழையவும்.'
              : 'Sign in to receive localized emergency flood alerts and targeted notifications for your ward.'}
          </p>
        </div>

        {error && <div className="error" style={{ marginBottom: '16px' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '14px' }}>
          {mode === 'REGISTER' && (
            <div>
              <label className="form-label">Full Name / Username *</label>
              <input
                type="text"
                className="form-input"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>
          )}

          <div>
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              className="form-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="form-label">Password *</label>
            <input
              type="password"
              className="form-input"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          {mode === 'REGISTER' && (
            <>
              <div>
                <label className="form-label">Your Preferred Chennai Zone (For Targeted Alerts) *</label>
                <select
                  className="form-input"
                  value={formData.preferred_zone}
                  onChange={(e) => setFormData({ ...formData, preferred_zone: e.target.value })}
                  required
                >
                  {CHENNAI_ZONES.map((z) => (
                    <option key={z} value={z}>{z}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="form-label">Ward (Optional)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Ward 172"
                    value={formData.preferred_ward}
                    onChange={(e) => setFormData({ ...formData, preferred_ward: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Language</label>
                  <select
                    className="form-input"
                    value={formData.preferred_language}
                    onChange={(e) => setFormData({ ...formData, preferred_language: e.target.value })}
                  >
                    <option value="en">English</option>
                    <option value="ta">தமிழ் (Tamil)</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="button"
            disabled={loading}
            style={{ width: '100%', padding: '10px', fontSize: '14px', marginTop: '6px' }}
          >
            {loading ? 'Processing...' : mode === 'LOGIN' ? t('nav_login') : t('nav_register')}
          </button>
        </form>
      </div>
    </div>
  );
}
