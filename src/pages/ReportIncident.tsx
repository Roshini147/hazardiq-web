import React, { useState } from 'react';
import { submitIncident } from '../services/api';
import { useTranslation } from '../i18n/LanguageContext';
import { AlertTriangle, Send, CheckCircle2, MapPin, Users } from 'lucide-react';

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

export default function ReportIncident() {
  const { t, language } = useTranslation();
  const [formData, setFormData] = useState({
    incident_type: 'Severe Waterlogging',
    severity: 'HIGH',
    area_name: '',
    zone: CHENNAI_ZONES[12], // Zone 13 - Adyar
    ward: '',
    people_affected: 0,
    description: '',
    reporter_name: '',
    reporter_phone: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await submitIncident({
        ...formData,
        people_affected: Number(formData.people_affected) || 0
      });

      if (res.success) {
        setSubmittedId(res.data.id);
      } else {
        setError(res.error?.message || 'Failed to submit report');
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || err.message || 'An error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="page-title">
        <div>
          <h2>{language === 'ta' ? 'அவசர சம்பவத்தைப் புகாரளிக்கவும்' : 'Citizen Incident & Hazard Reporting'}</h2>
          <p>
            {language === 'ta'
              ? 'வெள்ளப்பெருக்கு, மரம் விழுதல் அல்லது உடனடி உதவி தேவைப்படும் சூழல்களை அவசர மீட்புக் கட்டுப்பாட்டு மையத்திற்கு நேரடியாகத் தெரிவிக்கவும்.'
              : 'Submit emergency hazard reports directly to the Greater Chennai Corporation & Disaster Control Room.'}
          </p>
        </div>
      </div>

      {submittedId ? (
        <div className="panel" style={{ padding: '36px', textAlign: 'center' }}>
          <CheckCircle2 size={48} color="#059669" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ margin: '0 0 8px', color: '#0f172a', fontSize: '20px' }}>
            {language === 'ta' ? 'புகார் வெற்றிகரமாக பதிவு செய்யப்பட்டது!' : 'Report Logged Successfully'}
          </h3>
          <p style={{ color: '#475569', fontSize: '14px', marginBottom: '16px' }}>
            {language === 'ta'
              ? `உங்கள் புகார் எண் #${submittedId}. களக் குழுவினர் சரிபார்த்து உடனடி நடவடிக்கை மேற்கொள்வார்கள்.`
              : `Your incident reference number is #${submittedId}. Field response teams have been alerted for review and dispatch.`}
          </p>
          <button
            className="button"
            onClick={() => {
              setSubmittedId(null);
              setFormData({
                incident_type: 'Severe Waterlogging',
                severity: 'HIGH',
                area_name: '',
                zone: CHENNAI_ZONES[12],
                ward: '',
                people_affected: 0,
                description: '',
                reporter_name: '',
                reporter_phone: ''
              });
            }}
          >
            {language === 'ta' ? 'மற்றொரு புகாரைச் சமர்ப்பிக்க' : 'Submit Another Report'}
          </button>
        </div>
      ) : (
        <div className="panel" style={{ padding: '24px 28px' }}>
          {error && <div className="error" style={{ marginBottom: '16px' }}>{error}</div>}

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label className="form-label">{t('incident_type')} *</label>
                <select
                  className="form-input"
                  value={formData.incident_type}
                  onChange={(e) => setFormData({ ...formData, incident_type: e.target.value })}
                  required
                >
                  <option value="Severe Waterlogging">Severe Waterlogging / Road Submerged</option>
                  <option value="River / Canal Overflow">River / Canal Overflow</option>
                  <option value="Tree Fall / Road Blocked">Tree Fall / Road Blocked</option>
                  <option value="Electrical Hazard / Live Wire">Electrical Hazard / Live Wire</option>
                  <option value="Stranded Persons / Rescue Needed">Stranded Persons / Rescue Needed</option>
                  <option value="Wall / Building Collapse">Wall / Building Collapse</option>
                  <option value="Drinking Water Contamination">Drinking Water Contamination</option>
                </select>
              </div>

              <div>
                <label className="form-label">{t('incident_severity')} *</label>
                <select
                  className="form-input"
                  value={formData.severity}
                  onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                  required
                >
                  <option value="LOW">LOW — Minor water stagnation</option>
                  <option value="MODERATE">MODERATE — Partial road blockage</option>
                  <option value="HIGH">HIGH — Inundation into homes</option>
                  <option value="CRITICAL">CRITICAL — Immediate life risk / Evacuation required</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
              <div>
                <label className="form-label">{t('incident_location')} (Street / Landmark) *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 100 Feet Road, Near Bus Stand"
                  value={formData.area_name}
                  onChange={(e) => setFormData({ ...formData, area_name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="form-label">{t('incident_ward')}</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Ward 172"
                  value={formData.ward}
                  onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label className="form-label">{t('incident_zone')} *</label>
                <select
                  className="form-input"
                  value={formData.zone}
                  onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                  required
                >
                  {CHENNAI_ZONES.map((z) => (
                    <option key={z} value={z}>{z}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">{t('people_affected')}</label>
                <input
                  type="number"
                  className="form-input"
                  min="0"
                  value={formData.people_affected}
                  onChange={(e) => setFormData({ ...formData, people_affected: parseInt(e.target.value, 10) || 0 })}
                />
              </div>
            </div>

            <div>
              <label className="form-label">{t('incident_description')} *</label>
              <textarea
                className="form-input"
                rows={4}
                placeholder="Describe the current water depth, trapped individuals, vulnerable elderly/children, and nearest safe road access..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label className="form-label">Contact Name (Optional)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Your Name"
                  value={formData.reporter_name}
                  onChange={(e) => setFormData({ ...formData, reporter_name: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Phone Number (For Rescue Contact)</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="10-digit mobile number"
                  value={formData.reporter_phone}
                  onChange={(e) => setFormData({ ...formData, reporter_phone: e.target.value })}
                />
              </div>
            </div>

            <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="button" disabled={submitting} style={{ padding: '10px 24px', fontSize: '14px' }}>
                <Send size={15} style={{ display: 'inline', marginRight: '8px' }} />
                {submitting ? 'Submitting...' : t('btn_submit_report')}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
