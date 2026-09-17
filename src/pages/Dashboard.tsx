import React from 'react';
import MetricCard from '../components/MetricCard';
import ChennaiMap from '../components/ChennaiMap';
import { useApi } from '../hooks/useData';
import { getDashboard, getRisk } from '../services/api';
import { Link } from 'react-router-dom';
import RiskChart from '../components/RiskChart';
import { useTranslation } from '../i18n/LanguageContext';
import { ArrowRight, ShieldCheck, MapPin, Radio, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const { t, language } = useTranslation();
  const d = useApi(getDashboard, {} as any);
  const r = useApi(getRisk, [] as any[]);

  return (
    <>
      <div className="page-title">
        <div>
          <h2>{language === 'ta' ? 'செயல்பாட்டுக் கண்ணோட்டம்' : 'Operational Overview & Risk Intelligence'}</h2>
          <p>
            {language === 'ta'
              ? 'சென்னை மாநகர வார்டு அளவிலான பேரிடர் அபாயம், பாதிப்பு நிலை, முகாம் கொள்ளளவு மற்றும் மறுவாழ்வுத் திட்டமிடல்.'
              : 'Ward-level decision intelligence for hazard exposure, carrying capacity, safe shelters, and relocation planning.'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link className="button" to="/my-area" style={{ background: '#133e87' }}>
            <MapPin size={14} style={{ display: 'inline', marginRight: '6px' }} />
            {t('nav_my_area')}
          </Link>
          <Link className="button" to="/risk-assessment">
            {t('btn_open_risk_assessment')}
          </Link>
        </div>
      </div>

      {/* 6 Key Preserved KPI Metrics */}
      <div className="metrics">
        <MetricCard label={t('kpi_assessed_areas')} value={d.data.assessed_areas ?? '—'} />
        <MetricCard label={t('kpi_high_risk')} value={d.data.high_risk_areas ?? '—'} />
        <MetricCard label={t('kpi_critical_vulnerability')} value={d.data.critical_vulnerability_areas ?? '—'} />
        <MetricCard label={t('kpi_capacity_deficit')} value={d.data.capacity_deficit_areas ?? '—'} />
        <MetricCard label={t('kpi_relocation_priority')} value={d.data.relocation_priority_areas ?? '—'} />
        <MetricCard label={t('kpi_safe_capacity')} value={d.data.safe_capacity ? d.data.safe_capacity.toLocaleString() : '—'} />
      </div>

      <div className="grid2 dashboard-grid">
        <div className="panel">
          <div className="panel-head">
            <div>
              <h3>{language === 'ta' ? 'அபாய விநியோகம்' : 'Risk Distribution Classification'}</h3>
              <span>{language === 'ta' ? 'மாதிரி கணிப்பு விநியோகம்' : 'Backend-derived multi-factor risk categorization'}</span>
            </div>
          </div>
          <RiskChart risks={r.data} />
        </div>

        <div className="panel">
          <div className="panel-head">
            <div>
              <h3>{language === 'ta' ? 'மதிப்பீட்டு கவரேஜ்' : 'Assessment Coverage'}</h3>
              <span>{language === 'ta' ? 'சென்னை தரவுப் பார்வை' : 'Real-time database operational indices'}</span>
            </div>
          </div>
          <div className="coverage">
            <div>
              <b>{d.data.assessed_areas ?? '—'}</b>
              <span>{language === 'ta' ? 'மதிப்பிடப்பட்ட பகுதிகள்' : 'wards assessed'}</span>
            </div>
            <div>
              <b style={{ color: '#b91c1c' }}>{d.data.capacity_deficit_areas ?? '—'}</b>
              <span>{language === 'ta' ? 'கொள்ளளவு பற்றாக்குறை' : 'capacity deficit areas'}</span>
            </div>
            <div>
              <b style={{ color: '#d97706' }}>{d.data.relocation_priority_areas ?? '—'}</b>
              <span>{language === 'ta' ? 'மறுவாழ்வு முன்னுரிமை' : 'relocation priority'}</span>
            </div>
          </div>
          <div style={{ padding: '0 20px 20px', fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
            {language === 'ta'
              ? 'கிரேட்டர் சென்னை கார்ப்பரேஷனின் 215 அதிகாரப்பூர்வ நிவாரண மையங்கள் மற்றும் 95 அவசர சிகிச்சை மருத்துவமனைகள் நேரலையாக இணைக்கப்பட்டுள்ளன.'
              : 'Integrated with 215 Greater Chennai Corporation official relief centers and 95 emergency health facilities with real-time capacity tracking.'}
          </div>
        </div>
      </div>

      {/* Chennai Risk Map Panel */}
      <div className="panel map-panel" style={{ marginTop: '20px' }}>
        <div className="panel-head">
          <div>
            <h3>{language === 'ta' ? 'சென்னை பேரிடர் வரைபடம்' : 'Chennai Interactive Risk & Shelter Map'}</h3>
            <span>
              {language === 'ta'
                ? 'வார்டு எல்லைகள், அபாய மண்டலங்கள் மற்றும் நேரலை முகாம் கொள்ளளவு நிலை'
                : 'Administrative ward boundary service with real-time shelter capacity states'}
            </span>
          </div>
          <Link to="/map" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {t('btn_open_full_map')} <ArrowRight size={14} />
          </Link>
        </div>
        {r.loading ? (
          <div className="loading">{t('loading_geospatial')}</div>
        ) : (
          <ChennaiMap risks={r.data} />
        )}
      </div>
    </>
  );
}
