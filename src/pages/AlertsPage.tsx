import React, { useState, useEffect } from 'react';
import { getAlerts } from '../services/api';
import { useTranslation } from '../i18n/LanguageContext';
import { ShieldAlert, AlertCircle, Info, BellRing, Filter, CheckCircle2 } from 'lucide-react';

export default function AlertsPage() {
  const { t, language } = useTranslation();
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');

  useEffect(() => {
    getAlerts()
      .then((data) => {
        setAlerts(data || []);
        setLoading(false);
      })
      .catch((e) => {
        console.error('Failed to load alerts', e);
        setLoading(false);
      });
  }, []);

  const filtered = alerts.filter((a) => {
    if (selectedSeverity === 'ALL') return true;
    return a.severity === selectedSeverity;
  });

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'EMERGENCY':
        return <ShieldAlert size={20} color="#b91c1c" />;
      case 'WARNING':
        return <AlertCircle size={20} color="#d97706" />;
      case 'ADVISORY':
        return <BellRing size={20} color="#2563eb" />;
      default:
        return <Info size={20} color="#059669" />;
    }
  };

  return (
    <div>
      <div className="page-title">
        <div>
          <h2>{language === 'ta' ? 'அதிகாரப்பூர்வ பேரிடர் எச்சரிக்கைகள்' : 'Official Disaster Alerts & Advisories'}</h2>
          <p>
            {language === 'ta'
              ? 'சென்னை மாவட்ட பேரிடர் மேலாண்மை ஆணையத்தால் வெளியிடப்பட்ட நேரலை எச்சரிக்கைகள்.'
              : 'Verified geographic disaster alerts published by Tamil Nadu State and Chennai District authorities.'}
          </p>
        </div>

        {/* Severity Filter */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Filter size={15} style={{ color: '#64748b' }} />
          {['ALL', 'EMERGENCY', 'WARNING', 'ADVISORY', 'INFORMATION'].map((s) => (
            <button
              key={s}
              className={`filter-chip ${selectedSeverity === s ? 'active' : ''}`}
              onClick={() => setSelectedSeverity(s)}
            >
              {s === 'ALL' ? (language === 'ta' ? 'அனைத்தும்' : 'All') : s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading">{t('loading_data')}</div>
      ) : filtered.length === 0 ? (
        <div className="panel" style={{ padding: '40px', textAlign: 'center' }}>
          <CheckCircle2 size={40} color="#059669" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ margin: '0 0 6px', color: '#1e293b' }}>
            {language === 'ta' ? 'தீவிர எச்சரிக்கைகள் ஏதுமில்லை' : 'No Active Emergency Alerts'}
          </h3>
          <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>
            {language === 'ta'
              ? 'தேர்ந்தெடுக்கப்பட்ட வகைக்கு எந்தவிதமான தீவிர பேரிடர் எச்சரிக்கைகளும் இல்லை.'
              : 'All administrative monitoring channels report standard seasonal operations.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {filtered.map((alert) => {
            const isEmergency = alert.severity === 'EMERGENCY';
            const isWarning = alert.severity === 'WARNING';

            return (
              <div
                key={alert.id}
                className="panel"
                style={{
                  padding: '20px 24px',
                  borderLeft: `5px solid ${isEmergency ? '#dc2626' : isWarning ? '#f59e0b' : '#3b82f6'}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {getSeverityIcon(alert.severity)}
                    <div>
                      <h3 style={{ margin: 0, fontSize: '16px', color: '#0f172a' }}>
                        {language === 'ta' && alert.title_ta ? alert.title_ta : alert.title}
                      </h3>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                        {alert.hazard_type} • {t('alert_affected_area')}: <strong>{alert.affected_zone || 'Citywide'}</strong> {alert.affected_ward ? `(${alert.affected_ward})` : ''}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span className={`badge badge-${isEmergency ? 'danger' : isWarning ? 'warning' : 'neutral'}`}>
                      {alert.severity}
                    </span>
                    <span className="badge badge-success">
                      ✓ {alert.verification_status}
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: '14px', fontSize: '14px', lineHeight: 1.6, color: '#334155' }}>
                  {language === 'ta' && alert.message_ta ? alert.message_ta : alert.message}
                </div>

                <div
                  style={{
                    marginTop: '12px',
                    padding: '10px 14px',
                    background: '#f8fafc',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    fontSize: '13px'
                  }}
                >
                  <strong style={{ color: '#047857' }}>👉 {t('alert_recommended_action')}: </strong>
                  {language === 'ta' && alert.recommended_action_ta ? alert.recommended_action_ta : alert.recommended_action}
                </div>

                <div
                  style={{
                    marginTop: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '11px',
                    color: '#64748b',
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '8px'
                  }}
                >
                  <span>{t('alert_source')}: {alert.source}</span>
                  <span>Issued: {new Date(alert.issued_at).toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
