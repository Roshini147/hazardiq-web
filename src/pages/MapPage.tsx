import React, { useState } from 'react';
import ChennaiMap from '../components/ChennaiMap';
import { useApi } from '../hooks/useData';
import { getRisk } from '../services/api';
import { useTranslation } from '../i18n/LanguageContext';
import { ShieldCheck, AlertTriangle, Building, Hospital, X, Navigation } from 'lucide-react';

export default function MapPage() {
  const { t, language } = useTranslation();
  const r = useApi(getRisk, [] as any[]);
  const [selectedFeature, setSelectedFeature] = useState<any | null>(null);

  return (
    <div>
      <div className="page-title">
        <div>
          <h2>{language === 'ta' ? 'சென்னை புவிசார் பேரிடர் வரைபடம்' : 'Chennai GIS Risk & Safe Zone Map'}</h2>
          <p>
            {language === 'ta'
              ? 'சென்னை மாநகர வார்டு எல்லைகள், தீவிர அபாயப் பகுதிகள், பாதுகாப்பான இடங்கள் மற்றும் நிவாரண முகாம்களின் நேரலை நிலை.'
              : 'Interactive Chennai GIS decision support: Ward boundaries, high-risk inundation zones, designated safe areas, and 215 live relief shelters.'}
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selectedFeature ? '1fr 320px' : '1fr', gap: '16px' }}>
        <div>
          <ChennaiMap
            risks={r.data}
            onSelectFeature={(feature) => setSelectedFeature(feature)}
          />
        </div>

        {/* Side Feature Details Drawer */}
        {selectedFeature && (
          <div className="panel" style={{ padding: '20px', height: '560px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
              <strong style={{ fontSize: '14px', color: '#0f172a' }}>
                {selectedFeature.type === 'SAFE_ZONE' ? 'Designated Safe Zone' : selectedFeature.type === 'RISK_AREA' ? 'Risk Area Assessment' : selectedFeature.type === 'SHELTER' ? 'Relief Shelter' : 'Emergency Hospital'}
              </strong>
              <button
                onClick={() => setSelectedFeature(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={16} />
              </button>
            </div>

            {selectedFeature.type === 'SAFE_ZONE' && (
              <div style={{ fontSize: '13px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', marginBottom: '8px' }}>
                  <ShieldCheck size={24} />
                  <h4 style={{ margin: 0, fontSize: '16px' }}>{selectedFeature.data.area}</h4>
                </div>
                <div style={{ background: '#ecfdf5', padding: '10px', borderRadius: '6px', marginBottom: '12px' }}>
                  <div><strong>Suitability Score:</strong> {selectedFeature.data.suitability_score} / 100</div>
                  <div><strong>Risk Score:</strong> {selectedFeature.data.risk} (Low)</div>
                  <div><strong>Available Capacity:</strong> {selectedFeature.data.available_capacity} persons</div>
                </div>
                <p style={{ color: '#475569', lineHeight: 1.5 }}>
                  This zone is situated on elevated topography with negligible flood vulnerability, designated as a priority receiving area for evacuees.
                </p>
              </div>
            )}

            {selectedFeature.type === 'RISK_AREA' && (
              <div style={{ fontSize: '13px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626', marginBottom: '8px' }}>
                  <AlertTriangle size={24} />
                  <h4 style={{ margin: 0, fontSize: '16px' }}>{selectedFeature.data.area}</h4>
                </div>
                <div style={{ background: '#fef2f2', padding: '10px', borderRadius: '6px', marginBottom: '12px' }}>
                  <div><strong>Risk Level:</strong> <span style={{ color: '#b91c1c', fontWeight: 700 }}>{selectedFeature.data.level}</span></div>
                  <div><strong>Composite Score:</strong> {selectedFeature.data.score} / 100</div>
                  <div><strong>Zone / Ward:</strong> {selectedFeature.data.zone}, {selectedFeature.data.ward}</div>
                </div>
                {selectedFeature.data.factors && (
                  <div style={{ fontSize: '12px', color: '#334155' }}>
                    <div>• Vulnerability Index: {selectedFeature.data.factors.vulnerability}%</div>
                    <div>• Capacity Deficit: {selectedFeature.data.factors.capacity_deficit}%</div>
                    <div>• Hazard Exposure: {selectedFeature.data.factors.hazard_exposure}%</div>
                  </div>
                )}
              </div>
            )}

            {selectedFeature.type === 'SHELTER' && (
              <div style={{ fontSize: '13px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1e3a8a', marginBottom: '8px' }}>
                  <Building size={24} />
                  <h4 style={{ margin: 0, fontSize: '15px' }}>{selectedFeature.data.name}</h4>
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '10px' }}>
                  {selectedFeature.data.facility_type} • {selectedFeature.data.address}
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px', borderRadius: '6px' }}>
                  <div><strong>Capacity:</strong> {selectedFeature.data.total_capacity}</div>
                  <div><strong>Occupied:</strong> {selectedFeature.data.current_occupancy}</div>
                  <div><strong>Available:</strong> {selectedFeature.data.available_capacity}</div>
                  <div style={{ marginTop: '4px' }}>
                    <strong>Status: </strong>
                    <span className={`badge badge-${selectedFeature.data.capacity_status === 'FULL' ? 'danger' : selectedFeature.data.capacity_status === 'LIMITED' ? 'warning' : 'success'}`}>
                      {selectedFeature.data.capacity_status}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {selectedFeature.type === 'HOSPITAL' && (
              <div style={{ fontSize: '13px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0284c7', marginBottom: '8px' }}>
                  <Hospital size={24} />
                  <h4 style={{ margin: 0, fontSize: '15px' }}>{selectedFeature.data.name}</h4>
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '10px' }}>
                  {selectedFeature.data.resource_type} • {selectedFeature.data.zone}
                </div>
                <div style={{ background: '#f0f9ff', padding: '10px', borderRadius: '6px' }}>
                  <div><strong>Bed Capacity:</strong> {selectedFeature.data.capacity || 'Trauma Center'}</div>
                  <div><strong>Operational Status:</strong> 24x7 Emergency Ready</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
