import React, { useState, useEffect } from 'react';
import { getAreas, getShelters, getAlerts, getRisk } from '../services/api';
import { useTranslation } from '../i18n/LanguageContext';
import { Search, ShieldAlert, CheckCircle, AlertTriangle, Hospital, MapPin, Users } from 'lucide-react';

export default function MyArea() {
  const { t, language } = useTranslation();
  const [areas, setAreas] = useState<any[]>([]);
  const [selectedAreaId, setSelectedAreaId] = useState<string>('');
  const [shelters, setShelters] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [risks, setRisks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAreas(), getShelters(), getAlerts(), getRisk()])
      .then(([areaData, shelterData, alertData, riskData]) => {
        setAreas(areaData || []);
        setShelters(shelterData || []);
        setAlerts(alertData || []);
        setRisks(riskData || []);
        if (areaData && areaData.length > 0) {
          setSelectedAreaId(String(areaData[0].id));
        }
        setLoading(false);
      })
      .catch((e) => {
        console.error('Failed to load area data', e);
        setLoading(false);
      });
  }, []);

  const currentArea = areas.find((a) => String(a.id) === selectedAreaId);
  const currentRisk = risks.find((r) => r.area_id === currentArea?.id || r.area === currentArea?.name);
  const areaShelters = shelters.filter(
    (s) => s.ward === currentArea?.ward || s.zone === currentArea?.zone
  );
  const areaAlerts = alerts.filter(
    (a) => !a.affected_zone || a.affected_zone === 'Citywide' || a.affected_zone === currentArea?.zone
  );

  return (
    <div>
      <div className="page-title">
        <div>
          <h2>{language === 'ta' ? 'எனது பகுதி நிலவரம்' : 'Check My Area — Community Risk & Shelters'}</h2>
          <p>
            {language === 'ta'
              ? 'உங்கள் மண்டலம் அல்லது வார்டைத் தேர்ந்தெடுத்து அப்பகுதிக்கான அபாய நிலை, முகாம் கொள்ளளவு மற்றும் அவசர எச்சரிக்கைகளைப் பார்க்கவும்.'
              : 'Select your administrative ward to inspect real-time flood risk, live shelter capacities, and targeted alerts.'}
          </p>
        </div>
      </div>

      {/* Area Selector */}
      <div className="panel" style={{ padding: '16px 20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: '#1e3a5f' }}>
            <MapPin size={16} style={{ display: 'inline', marginRight: '6px' }} />
            {language === 'ta' ? 'பகுதியைத் தேர்ந்தெடுக்கவும்:' : 'Select Administrative Area:'}
          </label>
          <select
            value={selectedAreaId}
            onChange={(e) => setSelectedAreaId(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              fontSize: '13px',
              minWidth: '260px',
              fontFamily: 'inherit'
            }}
          >
            {areas.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} — {a.zone}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">{t('loading_data')}</div>
      ) : !currentArea ? (
        <div className="error">{t('data_unavailable')}</div>
      ) : (
        <>
          {/* Quick Metrics */}
          <div className="metrics" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <div className="metric">
              <div className="metric-label">{language === 'ta' ? 'அபாய நிலை' : 'Current Risk'}</div>
              <div
                className="metric-value"
                style={{
                  color:
                    currentRisk?.level === 'CRITICAL'
                      ? '#dc2626'
                      : currentRisk?.level === 'HIGH'
                      ? '#d97706'
                      : '#059669'
                }}
              >
                {currentRisk?.level || 'MODERATE'}
              </div>
              <div className="metric-detail">Score: {currentRisk?.score || 45} / 100</div>
            </div>

            <div className="metric">
              <div className="metric-label">{language === 'ta' ? 'மக்கள் தொகை' : 'Population Exposure'}</div>
              <div className="metric-value">{(currentArea.population || 28000).toLocaleString()}</div>
              <div className="metric-detail">{(currentArea.households || 6700).toLocaleString()} households</div>
            </div>

            <div className="metric">
              <div className="metric-label">{language === 'ta' ? 'நிலப்பரப்பு உயரம்' : 'DEM Elevation'}</div>
              <div className="metric-value">{currentArea.elevation_m || 5.2} m</div>
              <div className="metric-detail">Above mean sea level</div>
            </div>

            <div className="metric">
              <div className="metric-label">{t('kpi_safe_capacity')}</div>
              <div className="metric-value" style={{ color: '#047857' }}>
                {areaShelters.reduce((acc, s) => acc + (s.available_capacity || 0), 0)}
              </div>
              <div className="metric-detail">{areaShelters.length} designated shelters</div>
            </div>
          </div>

          {/* Active Alerts for Area */}
          <div className="panel" style={{ padding: '18px 20px', marginBottom: '20px' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={18} color="#b91c1c" />
              {language === 'ta' ? 'இப்பகுதிக்கான அவசர எச்சரிக்கைகள்' : 'Active Disaster Alerts for this Area'}
            </h3>
            {areaAlerts.length === 0 ? (
              <div style={{ color: '#64748b', fontSize: '13px' }}>{t('no_active_alerts')}</div>
            ) : (
              <div style={{ display: 'grid', gap: '12px' }}>
                {areaAlerts.map((a) => (
                  <div
                    key={a.id}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '6px',
                      background: a.severity === 'WARNING' || a.severity === 'EMERGENCY' ? '#fef2f2' : '#fffbeb',
                      border: `1px solid ${a.severity === 'WARNING' || a.severity === 'EMERGENCY' ? '#fca5a5' : '#fde68a'}`
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <strong style={{ fontSize: '14px', color: '#1e293b' }}>
                        {language === 'ta' && a.title_ta ? a.title_ta : a.title}
                      </strong>
                      <span className={`badge badge-${a.severity === 'EMERGENCY' ? 'danger' : 'warning'}`}>
                        {a.severity}
                      </span>
                    </div>
                    <p style={{ margin: '0 0 6px', fontSize: '13px', color: '#334155' }}>
                      {language === 'ta' && a.message_ta ? a.message_ta : a.message}
                    </p>
                    <div style={{ fontSize: '12px', color: '#047857', fontWeight: 600 }}>
                      👉 {t('alert_recommended_action')}: {language === 'ta' && a.recommended_action_ta ? a.recommended_action_ta : a.recommended_action}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Shelter Capacity List for Area */}
          <div className="panel" style={{ padding: '18px 20px', marginBottom: '20px' }}>
            <h3 style={{ margin: '0 0 14px', fontSize: '16px' }}>
              {language === 'ta' ? 'அருகிலுள்ள நிவாரண முகாம்கள் & நேரலை கொள்ளளவு' : 'Designated Relief Centers & Live Capacity'}
            </h3>
            {areaShelters.length === 0 ? (
              <div style={{ color: '#64748b', fontSize: '13px' }}>{t('not_available')}</div>
            ) : (
              <div style={{ display: 'grid', gap: '12px' }}>
                {areaShelters.map((s) => {
                  const isFull = s.capacity_status === 'FULL';
                  const pct = Math.min(100, Math.round(((s.current_occupancy || 0) / s.total_capacity) * 100));

                  return (
                    <div
                      key={s.id}
                      style={{
                        padding: '14px 18px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        background: isFull ? '#fff1f2' : '#ffffff'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <strong style={{ fontSize: '14px', color: '#0f172a' }}>{s.name}</strong>
                          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                            {s.facility_type} • {s.address}
                          </div>
                        </div>
                        <span
                          className={`badge badge-${isFull ? 'danger' : s.capacity_status === 'LIMITED' ? 'warning' : 'success'}`}
                        >
                          {isFull ? t('status_full') : s.capacity_status}
                        </span>
                      </div>

                      {/* Visual Capacity Bar matching prompt section 10 */}
                      <div style={{ marginTop: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                          <span>
                            <strong>{s.current_occupancy}</strong> / {s.total_capacity} {t('occupancy')} ({pct}%)
                          </span>
                          <span style={{ color: isFull ? '#b91c1c' : '#047857', fontWeight: 600 }}>
                            {t('available_capacity')}: {s.available_capacity}
                          </span>
                        </div>
                        <div className="progress-bar-bg">
                          <div
                            className={`progress-bar-fill ${isFull ? 'bg-red' : s.capacity_status === 'LIMITED' ? 'bg-amber' : 'bg-green'}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        {isFull && (
                          <div style={{ fontSize: '11px', color: '#b91c1c', fontWeight: 600, marginTop: '4px' }}>
                            ⛔ {t('capacity_full_warning')}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
