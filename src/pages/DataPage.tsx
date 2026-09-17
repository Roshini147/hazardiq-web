import React, { useState } from 'react';
import { useApi } from '../hooks/useData';
import {
  getHazards,
  getCapacity,
  getRelocation,
  getSafeAreas,
  getResources,
  getSources,
  getRisk
} from '../services/api';
import { useTranslation } from '../i18n/LanguageContext';
import { Search, Download, ShieldCheck, AlertTriangle, XCircle } from 'lucide-react';

export type DataKind = 'hazards' | 'capacity' | 'relocation' | 'safe' | 'resources' | 'sources' | 'risk';

const tableHeaders: Record<DataKind, string[]> = {
  hazards: ['Hazard Type', 'Area', 'Risk Score', 'Exposure', 'Confidence'],
  capacity: ['Area', 'Ward', 'Available', 'Required', 'Deficit', 'Ratio', 'Level'],
  relocation: ['Area', 'Ward', 'Score', 'Level', 'Recommended Action'],
  safe: ['Area', 'Ward', 'Risk', 'Available Capacity', 'Suitability'],
  resources: ['Name', 'Type', 'Area', 'Capacity', 'Status'],
  sources: ['Name', 'Data Type', 'Coverage', 'Confidence'],
  risk: ['Area', 'Ward', 'Zone', 'Score', 'Level']
};

export default function DataPage({ kind }: { kind: DataKind }) {
  const { t, language } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const fetchFn = {
    hazards: getHazards,
    capacity: getCapacity,
    relocation: getRelocation,
    safe: getSafeAreas,
    resources: getResources,
    sources: getSources,
    risk: getRisk
  }[kind];

  const q = useApi(fetchFn, []);

  const pageTitle = {
    risk: language === 'ta' ? 'அபாய மதிப்பீடு' : 'Risk Assessment',
    hazards: language === 'ta' ? 'அபாயத் தகவல்கள்' : 'Hazard Intelligence',
    capacity: language === 'ta' ? 'முகாம் கொள்ளளவு' : 'Capacity Analysis',
    relocation: language === 'ta' ? 'மறுவாழ்வு முன்னுரிமைகள்' : 'Relocation Priorities',
    safe: language === 'ta' ? 'பாதுகாப்பான இடங்கள்' : 'Safe Areas Suitability',
    resources: language === 'ta' ? 'மருத்துவமனைகள் & வளங்கள்' : 'Emergency Facilities & Resources',
    sources: language === 'ta' ? 'அரசு தரவு மூலங்கள்' : 'Official Data Sources'
  }[kind];

  const filteredData = Array.isArray(q.data)
    ? q.data.filter((item: any) => {
        if (!searchTerm) return true;
        const s = searchTerm.toLowerCase();
        return (
          (item.area && item.area.toLowerCase().includes(s)) ||
          (item.name && item.name.toLowerCase().includes(s)) ||
          (item.ward && String(item.ward).toLowerCase().includes(s)) ||
          (item.level && item.level.toLowerCase().includes(s)) ||
          (item.type && item.type.toLowerCase().includes(s))
        );
      })
    : [];

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(q.data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `hazardiq-${kind}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  const renderStatusBadge = (levelOrStatus: string) => {
    const s = String(levelOrStatus).toUpperCase();
    if (s === 'CRITICAL' || s === 'FULL' || s === 'CRITICAL DEFICIT') {
      return (
        <span className="badge badge-danger">
          <XCircle size={12} className="inline mr-1" />
          {s === 'FULL' ? t('status_full') : s}
        </span>
      );
    }
    if (s === 'HIGH' || s === 'LIMITED' || s === 'MODERATE DEFICIT') {
      return (
        <span className="badge badge-warning">
          <AlertTriangle size={12} className="inline mr-1" />
          {s === 'LIMITED' ? t('status_limited') : s}
        </span>
      );
    }
    if (s === 'AVAILABLE' || s === 'SUFFICIENT' || s === 'OPERATIONAL' || s === 'LOW') {
      return (
        <span className="badge badge-success">
          <ShieldCheck size={12} className="inline mr-1" />
          {s === 'AVAILABLE' ? t('status_available') : s}
        </span>
      );
    }
    return <span className="badge badge-neutral">{s}</span>;
  };

  return (
    <div>
      <div className="page-title">
        <div>
          <h2>{pageTitle}</h2>
          <p>
            {language === 'ta'
              ? 'அரசு தரவுத்தளத்தில் இருந்து பெறப்பட்ட அதிகாரப்பூர்வ பதிவுகள்.'
              : 'Official verified decision-support records derived from government databases.'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="search-bar">
            <Search size={15} style={{ color: '#667788' }} />
            <input
              type="text"
              placeholder={t('btn_search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="button" onClick={handleExport} title="Download JSON records">
            <Download size={14} style={{ display: 'inline', marginRight: '6px' }} />
            {t('btn_export')}
          </button>
        </div>
      </div>

      <div className="panel table-panel">
        {q.loading ? (
          <div className="loading">{t('loading_data')}</div>
        ) : q.error ? (
          <div className="error">{q.error}</div>
        ) : filteredData.length === 0 ? (
          <div className="empty-state">
            <p>{language === 'ta' ? 'பதிவுகள் எதுவும் கிடைக்கவில்லை.' : 'No matching records found.'}</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                {tableHeaders[kind].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((x: any, i: number) => (
                <tr key={i}>
                  {tableHeaders[kind].map((h) => {
                    let cellVal: any = '';
                    if (h === 'Area') cellVal = x.area || x.name;
                    else if (h === 'Ward') cellVal = x.ward || '—';
                    else if (h === 'Zone') cellVal = x.zone || '—';
                    else if (h === 'Risk Score' || h === 'Score') cellVal = <b>{x.score}</b>;
                    else if (h === 'Risk') cellVal = x.risk;
                    else if (h === 'Exposure') cellVal = x.exposure_score || x.exposure;
                    else if (h === 'Confidence') cellVal = `${Math.round((x.confidence || 0.8) * 100)}%`;
                    else if (h === 'Level') cellVal = renderStatusBadge(x.level);
                    else if (h === 'Available' || h === 'Available Capacity') {
                      cellVal = (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontWeight: 600 }}>{x.available_capacity ?? x.capacity}</span>
                          {x.total_capacity && (
                            <span style={{ fontSize: '11px', color: '#687887' }}>
                              / {x.total_capacity} {t('places_remaining')}
                            </span>
                          )}
                        </div>
                      );
                    } else if (h === 'Required') cellVal = x.required_capacity;
                    else if (h === 'Deficit') {
                      cellVal = x.deficit > 0 ? (
                        <span style={{ color: '#b91c1c', fontWeight: 600 }}>+{x.deficit}</span>
                      ) : (
                        <span style={{ color: '#059669' }}>0</span>
                      );
                    } else if (h === 'Ratio') cellVal = Number(x.ratio || 0).toFixed(2);
                    else if (h === 'Suitability') {
                      cellVal = (
                        <span style={{ fontWeight: 600, color: '#1d4ed8' }}>
                          {x.suitability_score} / 100
                        </span>
                      );
                    } else if (h === 'Capacity') cellVal = `${x.capacity} beds`;
                    else if (h === 'Status') cellVal = renderStatusBadge(x.status);
                    else if (h === 'Type' || h === 'Hazard Type') cellVal = x.type || x.resource_type;
                    else if (h === 'Data Type') cellVal = x.data_type;
                    else if (h === 'Coverage') cellVal = x.coverage;
                    else if (h === 'Name') cellVal = <b>{x.name}</b>;
                    else if (h === 'Recommended Action') {
                      cellVal = <span style={{ fontSize: '12px', lineHeight: 1.4 }}>{x.recommended_action}</span>;
                    }

                    return <td key={h}>{cellVal}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
