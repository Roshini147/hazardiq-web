import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAuthority } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../i18n/LanguageContext';
import { Shield, Lock, UserCheck, AlertCircle } from 'lucide-react';

export default function AuthorityLogin() {
  const { t, language } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [usernameOrEmail, setUsernameOrEmail] = useState('operator@hazardiq.tn.gov.in');
  const [password, setPassword] = useState('Operator@123');
  const [role, setRole] = useState<'OPERATOR' | 'ANALYST' | 'ADMIN'>('OPERATOR');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRolePreset = (r: 'OPERATOR' | 'ANALYST' | 'ADMIN') => {
    setRole(r);
    if (r === 'OPERATOR') {
      setUsernameOrEmail('operator@hazardiq.tn.gov.in');
      setPassword('Operator@123');
    } else if (r === 'ANALYST') {
      setUsernameOrEmail('analyst@hazardiq.tn.gov.in');
      setPassword('Analyst@123');
    } else {
      setUsernameOrEmail('admin@hazardiq.tn.gov.in');
      setPassword('Admin@123');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await loginAuthority({ usernameOrEmail, password, role });
      if (res.success) {
        login(res.data.token, res.data.user);
        navigate('/authority/command-center');
      } else {
        setError(res.error?.message || 'Authority authorization failed.');
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '480px', margin: '40px auto' }}>
      <div className="panel" style={{ padding: '32px 36px', borderTop: '4px solid #1e3a8a' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '10px',
              background: '#1e3a8a',
              display: 'inline-grid',
              placeItems: 'center',
              marginBottom: '12px'
            }}
          >
            <Shield size={26} color="#ffffff" />
          </div>
          <h2 style={{ margin: '0 0 4px', fontSize: '20px', color: '#0f172a' }}>
            {language === 'ta' ? 'அதிகாரிகள் கட்டுப்பாட்டு மையம்' : 'Authority Command Center'}
          </h2>
          <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
            {language === 'ta'
              ? 'அங்கீகரிக்கப்பட்ட பேரிடர் மேலாண்மை அலுவலர்கள் மற்றும் அவசரகால ஆய்வாளர்கள் உள்நுழைவு.'
              : 'Restricted access for Emergency Management Officers, Operators, and GIS Analysts.'}
          </p>
        </div>

        {/* Operational Role Presets for Authorized Personnel */}
        <div style={{ marginBottom: '20px', background: '#f8fafc', padding: '10px', borderRadius: '6px' }}>
          <label style={{ fontSize: '11px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '6px' }}>
            Select Operational Role Preset:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
            {(['OPERATOR', 'ANALYST', 'ADMIN'] as const).map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => handleRolePreset(r)}
                style={{
                  padding: '6px 4px',
                  fontSize: '11px',
                  fontWeight: 600,
                  borderRadius: '4px',
                  border: role === r ? '1px solid #1e3a8a' : '1px solid #cbd5e1',
                  background: role === r ? '#1e3a8a' : '#ffffff',
                  color: role === r ? '#ffffff' : '#334155',
                  cursor: 'pointer'
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="error" style={{ marginBottom: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'grid', gap: '16px' }}>
          <div>
            <label className="form-label">Official Email / Service ID</label>
            <input
              type="text"
              className="form-input"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="form-label">Authorization Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="button"
            disabled={loading}
            style={{ width: '100%', padding: '11px', fontSize: '14px', marginTop: '8px' }}
          >
            <UserCheck size={16} style={{ display: 'inline', marginRight: '6px' }} />
            {loading ? 'Authenticating...' : 'Access Command Center'}
          </button>
        </form>

        <div style={{ marginTop: '20px', borderTop: '1px solid #e2e8f0', paddingTop: '14px', textAlign: 'center', fontSize: '11px', color: '#64748b' }}>
          🔒 Protected government disaster command network. All transactions and allocations are cryptographically audited.
        </div>
      </div>
    </div>
  );
}
