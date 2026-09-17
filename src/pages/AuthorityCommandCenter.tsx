import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../i18n/LanguageContext';
import {
  getShelters,
  allocateCapacity,
  checkInShelter,
  checkOutShelter,
  publishAlert,
  getIncidents,
  updateIncidentStatus,
  getAuditLogs,
  getAnalyticsOverview,
  getHistoricalDisasters
} from '../services/api';
import {
  ShieldAlert,
  Building,
  AlertTriangle,
  Radio,
  FileCheck2,
  ScrollText,
  Users,
  Activity,
  Layers,
  MapPin,
  CheckCircle2,
  XCircle,
  Plus,
  RefreshCw,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AuthorityCommandCenter() {
  const { user, isAuthority, logout } = useAuth();
  const { t, language } = useTranslation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'shelters' | 'alerts' | 'incidents' | 'history' | 'audit'>('shelters');
  const [shelters, setShelters] = useState<any[]>([]);
  const [incidents, setIncidents] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [historicalDisasters, setHistoricalDisasters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Allocation Modal State
  const [selectedShelterForAlloc, setSelectedShelterForAlloc] = useState<any | null>(null);
  const [allocCount, setAllocCount] = useState<number>(25);
  const [allocZone, setAllocZone] = useState<string>('Zone 13 - Adyar');
  const [allocNotes, setAllocNotes] = useState<string>('Emergency heavy monsoon inundation transfer');
  const [allocLoading, setAllocLoading] = useState(false);
  const [allocError, setAllocError] = useState<string | null>(null);
  const [allocSuccess, setAllocSuccess] = useState<string | null>(null);

  // Create Alert State
  const [alertForm, setAlertForm] = useState({
    title: '',
    title_ta: '',
    severity: 'WARNING',
    hazard_type: 'Flash Flood',
    affected_zone: 'Zone 13 - Adyar',
    affected_ward: 'Ward 172',
    message: '',
    message_ta: '',
    recommended_action: '',
    recommended_action_ta: '',
    source: 'Chennai Disaster Operations Centre'
  });
  const [alertPublishing, setAlertPublishing] = useState(false);
  const [alertResultMsg, setAlertResultMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthority) {
      navigate('/authority/login');
      return;
    }
    refreshData();
  }, [isAuthority]);

  const refreshData = () => {
    setLoading(true);
    Promise.all([
      getShelters(),
      getIncidents(),
      getAuditLogs({ limit: 40 }),
      getAnalyticsOverview(),
      getHistoricalDisasters()
    ])
      .then(([shelterList, incList, logs, stats, hist]) => {
        setShelters(shelterList || []);
        setIncidents(incList || []);
        setAuditLogs(logs || []);
        setAnalytics(stats || null);
        setHistoricalDisasters(hist || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load command center data', err);
        setLoading(false);
      });
  };

  // Capacity Allocation Handler
  const handleExecuteAllocation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShelterForAlloc) return;
    setAllocLoading(true);
    setAllocError(null);
    setAllocSuccess(null);

    try {
      const res = await allocateCapacity(selectedShelterForAlloc.id, {
        count: Number(allocCount),
        affected_zone: allocZone,
        notes: allocNotes
      });

      if (res.success) {
        setAllocSuccess(`Successfully allocated ${allocCount} evacuees! New occupancy: ${res.data.current_occupancy}/${res.data.total_capacity}.`);
        refreshData();
        setTimeout(() => {
          setSelectedShelterForAlloc(null);
          setAllocSuccess(null);
        }, 1800);
      } else {
        setAllocError(res.error?.message || 'Allocation rejected.');
      }
    } catch (err: any) {
      setAllocError(err.response?.data?.error?.message || err.message || 'Allocation rejected.');
    } finally {
      setAllocLoading(false);
    }
  };

  // Direct Check-in
  const handleCheckIn = async (shelterId: number, count: number = 10) => {
    try {
      const res = await checkInShelter(shelterId, count);
      if (res.success) {
        refreshData();
      } else {
        alert(res.error?.message || 'Check-in failed');
      }
    } catch (err: any) {
      alert(err.response?.data?.error?.message || err.message || 'Check-in failed');
    }
  };

  // Direct Check-out
  const handleCheckOut = async (shelterId: number, count: number = 10) => {
    try {
      const res = await checkOutShelter(shelterId, count);
      if (res.success) {
        refreshData();
      } else {
        alert(res.error?.message || 'Check-out failed');
      }
    } catch (err: any) {
      alert(err.response?.data?.error?.message || err.message || 'Check-out failed');
    }
  };

  // Alert Publisher
  const handlePublishAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlertPublishing(true);
    setAlertResultMsg(null);

    try {
      const res = await publishAlert(alertForm);
      if (res.success) {
        setAlertResultMsg(`Alert published! Dispatched targeted notifications to ${res.data.targeted_recipients_count} citizens in ${alertForm.affected_zone}.`);
        setAlertForm({
          title: '',
          title_ta: '',
          severity: 'WARNING',
          hazard_type: 'Flash Flood',
          affected_zone: 'Zone 13 - Adyar',
          affected_ward: 'Ward 172',
          message: '',
          message_ta: '',
          recommended_action: '',
          recommended_action_ta: '',
          source: 'Chennai Disaster Operations Centre'
        });
        refreshData();
      } else {
        alert(res.error?.message || 'Alert failed');
      }
    } catch (err: any) {
      alert(err.response?.data?.error?.message || err.message || 'Alert failed');
    } finally {
      setAlertPublishing(false);
    }
  };

  // Incident Verification
  const handleUpdateIncident = async (id: number, status: string) => {
    try {
      await updateIncidentStatus(id, status);
      refreshData();
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    }
  };

  return (
    <div>
      {/* Institutional Top Command Bar */}
      <div
        style={{
          background: '#0b2545',
          color: '#ffffff',
          padding: '12px 24px',
          borderRadius: '8px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              background: '#133e87',
              padding: '6px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.08em'
            }}
          >
            DISASTER OPS
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '17px', color: '#ffffff', letterSpacing: '0.04em' }}>
              HAZARDIQ COMMAND CENTER
            </h2>
            <div style={{ fontSize: '11px', color: '#93c5fd' }}>
              Active Operator: <strong>{user?.username}</strong> ({user?.role}) • Authorized Agency: Greater Chennai Corporation / TNSDMA
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span
            style={{
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: 700,
              background: analytics?.emergency_status === 'CRITICAL' ? '#b91c1c' : '#065f46',
              color: '#ffffff'
            }}
          >
            STATUS: {analytics?.emergency_status || 'NORMAL'}
          </span>
          <button
            onClick={refreshData}
            className="button"
            style={{ padding: '6px 12px', fontSize: '11px', background: '#1e3a8a' }}
            title="Refresh database records"
          >
            <RefreshCw size={13} style={{ display: 'inline', marginRight: '4px' }} />
            Sync
          </button>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="button"
            style={{ padding: '6px 12px', fontSize: '11px', background: '#334155' }}
          >
            <LogOut size={13} style={{ display: 'inline', marginRight: '4px' }} />
            Exit Command
          </button>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="metrics" style={{ gridTemplateColumns: 'repeat(6, 1fr)', marginBottom: '20px' }}>
        <div className="metric">
          <div className="metric-label">{t('kpi_assessed_areas')}</div>
          <div className="metric-value">{analytics?.assessed_areas || 166}</div>
          <div className="metric-detail">GCC Wards Tracked</div>
        </div>
        <div className="metric">
          <div className="metric-label">{t('kpi_high_risk')}</div>
          <div className="metric-value" style={{ color: '#b91c1c' }}>
            {analytics?.high_risk_areas || 105}
          </div>
          <div className="metric-detail">Elevated Inundation</div>
        </div>
        <div className="metric">
          <div className="metric-label">{t('total_capacity')}</div>
          <div className="metric-value">{analytics?.total_shelter_capacity?.toLocaleString() || '61,375'}</div>
          <div className="metric-detail">215 GCC Relief Centres</div>
        </div>
        <div className="metric">
          <div className="metric-label">{t('current_occupancy')}</div>
          <div className="metric-value" style={{ color: '#d97706' }}>
            {analytics?.current_shelter_occupancy?.toLocaleString() || 0}
          </div>
          <div className="metric-detail">Checked in evacuees</div>
        </div>
        <div className="metric">
          <div className="metric-label">{t('available_capacity')}</div>
          <div className="metric-value" style={{ color: '#047857' }}>
            {analytics?.safe_capacity?.toLocaleString() || '61,375'}
          </div>
          <div className="metric-detail">Places available</div>
        </div>
        <div className="metric">
          <div className="metric-label">Open Incidents</div>
          <div className="metric-value" style={{ color: '#2563eb' }}>
            {incidents.filter((i) => i.status !== 'RESOLVED').length}
          </div>
          <div className="metric-detail">Field reports pending</div>
        </div>
      </div>

      {/* Command Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '4px',
          borderBottom: '2px solid #cbd5e1',
          marginBottom: '20px',
          background: '#ffffff',
          borderRadius: '6px 6px 0 0',
          padding: '6px 12px 0'
        }}
      >
        <button
          className={`filter-chip ${activeTab === 'shelters' ? 'active' : ''}`}
          onClick={() => setActiveTab('shelters')}
        >
          <Building size={15} style={{ display: 'inline', marginRight: '6px' }} />
          Shelter Capacity & Relocation
        </button>
        <button
          className={`filter-chip ${activeTab === 'alerts' ? 'active' : ''}`}
          onClick={() => setActiveTab('alerts')}
        >
          <Radio size={15} style={{ display: 'inline', marginRight: '6px' }} />
          Publish Geographic Alerts
        </button>
        <button
          className={`filter-chip ${activeTab === 'incidents' ? 'active' : ''}`}
          onClick={() => setActiveTab('incidents')}
        >
          <FileCheck2 size={15} style={{ display: 'inline', marginRight: '6px' }} />
          Incident Verification ({incidents.filter((i) => i.status !== 'RESOLVED').length})
        </button>
        <button
          className={`filter-chip ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <Layers size={15} style={{ display: 'inline', marginRight: '6px' }} />
          Disaster Damage History ({historicalDisasters.length})
        </button>
        <button
          className={`filter-chip ${activeTab === 'audit' ? 'active' : ''}`}
          onClick={() => setActiveTab('audit')}
        >
          <ScrollText size={15} style={{ display: 'inline', marginRight: '6px' }} />
          Audit Trail Log
        </button>
      </div>

      {/* TAB 1: SHELTER CAPACITY & ALLOCATION */}
      {activeTab === 'shelters' && (
        <div className="panel table-panel">
          <div className="panel-head">
            <div>
              <h3>Chennai Relief Shelters & Live Capacity Monitoring (215 Centres)</h3>
              <span>Transactional capacity tracking with hard over-allocation prevention</span>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Shelter Name</th>
                <th>Zone / Ward</th>
                <th>Total</th>
                <th>Occupied</th>
                <th>Available</th>
                <th>Visual Capacity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {shelters.map((s) => {
                const isFull = s.capacity_status === 'FULL';
                const pct = Math.min(100, Math.round(((s.current_occupancy || 0) / s.total_capacity) * 100));

                return (
                  <tr key={s.id} style={{ background: isFull ? '#fff1f2' : undefined }}>
                    <td><small>{s.external_id}</small></td>
                    <td>
                      <strong>{s.name}</strong>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{s.facility_type} • {s.address.slice(0, 45)}...</div>
                    </td>
                    <td>{s.zone} <br /><small>{s.ward}</small></td>
                    <td><strong>{s.total_capacity}</strong></td>
                    <td style={{ color: isFull ? '#b91c1c' : '#334155' }}><strong>{s.current_occupancy}</strong></td>
                    <td style={{ color: isFull ? '#b91c1c' : '#047857' }}>
                      <strong>{s.available_capacity}</strong>
                    </td>
                    <td style={{ minWidth: '150px' }}>
                      <div style={{ fontSize: '11px', marginBottom: '2px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>{pct}%</span>
                        <span>{isFull ? t('status_full') : `${s.available_capacity} left`}</span>
                      </div>
                      <div className="progress-bar-bg">
                        <div
                          className={`progress-bar-fill ${isFull ? 'bg-red' : s.capacity_status === 'LIMITED' ? 'bg-amber' : 'bg-green'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-${isFull ? 'danger' : s.capacity_status === 'LIMITED' ? 'warning' : 'success'}`}>
                        {isFull ? t('status_full') : s.capacity_status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button
                          className="button"
                          style={{ padding: '4px 8px', fontSize: '11px', background: isFull ? '#94a3b8' : '#1e3a8a' }}
                          disabled={isFull}
                          onClick={() => {
                            setSelectedShelterForAlloc(s);
                            setAllocCount(Math.min(25, s.available_capacity || 10));
                            setAllocError(null);
                            setAllocSuccess(null);
                          }}
                          title="Allocate evacuees"
                        >
                          Allocate
                        </button>
                        <button
                          className="button"
                          style={{ padding: '4px 6px', fontSize: '11px', background: '#059669' }}
                          disabled={isFull}
                          onClick={() => handleCheckIn(s.id, 5)}
                          title="Quick Check-In 5 persons"
                        >
                          +5
                        </button>
                        <button
                          className="button"
                          style={{ padding: '4px 6px', fontSize: '11px', background: '#64748b' }}
                          disabled={s.current_occupancy <= 0}
                          onClick={() => handleCheckOut(s.id, 5)}
                          title="Quick Check-Out 5 persons"
                        >
                          -5
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: TARGETED ALERTS PUBLISHER */}
      {activeTab === 'alerts' && (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="panel" style={{ padding: '24px 28px' }}>
            <div className="panel-head" style={{ padding: '0 0 14px', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '16px' }}>Publish Targeted Geographic Emergency Alert</h3>
                <span>Broadcasts immediately to citizens registered in the selected geography</span>
              </div>
            </div>

            {alertResultMsg && (
              <div
                style={{
                  padding: '12px 16px',
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  color: '#065f46',
                  borderRadius: '6px',
                  marginBottom: '16px',
                  fontSize: '13px'
                }}
              >
                ✓ {alertResultMsg}
              </div>
            )}

            <form onSubmit={handlePublishAlert} style={{ display: 'grid', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="form-label">Alert Severity *</label>
                  <select
                    className="form-input"
                    value={alertForm.severity}
                    onChange={(e) => setAlertForm({ ...alertForm, severity: e.target.value })}
                  >
                    <option value="INFORMATION">INFORMATION (Green)</option>
                    <option value="ADVISORY">ADVISORY (Blue)</option>
                    <option value="WARNING">WARNING (Amber)</option>
                    <option value="EMERGENCY">EMERGENCY (Red - Immediate Action)</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Hazard Type *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={alertForm.hazard_type}
                    onChange={(e) => setAlertForm({ ...alertForm, hazard_type: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="form-label">Targeted Zone (Notification Recipient Scope) *</label>
                  <select
                    className="form-input"
                    value={alertForm.affected_zone}
                    onChange={(e) => setAlertForm({ ...alertForm, affected_zone: e.target.value })}
                  >
                    <option value="Citywide">Citywide (All Registered Citizens)</option>
                    <option value="Zone 1 - Thiruvottiyur">Zone 1 - Thiruvottiyur</option>
                    <option value="Zone 2 - Manali">Zone 2 - Manali</option>
                    <option value="Zone 3 - Madhavaram">Zone 3 - Madhavaram</option>
                    <option value="Zone 4 - Tondiarpet">Zone 4 - Tondiarpet</option>
                    <option value="Zone 5 - Royapuram">Zone 5 - Royapuram</option>
                    <option value="Zone 6 - Thiru-Vi-Ka-Nagar">Zone 6 - Thiru-Vi-Ka-Nagar</option>
                    <option value="Zone 7 - Ambattur">Zone 7 - Ambattur</option>
                    <option value="Zone 8 - Anna Nagar">Zone 8 - Anna Nagar</option>
                    <option value="Zone 9 - Teynampet">Zone 9 - Teynampet</option>
                    <option value="Zone 10 - Kodambakkam">Zone 10 - Kodambakkam</option>
                    <option value="Zone 11 - Valasaravakkam">Zone 11 - Valasaravakkam</option>
                    <option value="Zone 12 - Alandur">Zone 12 - Alandur</option>
                    <option value="Zone 13 - Adyar">Zone 13 - Adyar</option>
                    <option value="Zone 14 - Perungudi">Zone 14 - Perungudi</option>
                    <option value="Zone 15 - Sholinganallur">Zone 15 - Sholinganallur</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Specific Ward (Optional)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Ward 172"
                    value={alertForm.affected_ward}
                    onChange={(e) => setAlertForm({ ...alertForm, affected_ward: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Alert Headline (English) *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Inundation Warning: Adyar River Water Level Rising"
                  value={alertForm.title}
                  onChange={(e) => setAlertForm({ ...alertForm, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="form-label">Alert Headline (Tamil - தமிழ்)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="எ.கா. அடையாறு ஆற்றில் வெள்ள நீர்மட்டம் உயர்வு எச்சரிக்கை"
                  value={alertForm.title_ta}
                  onChange={(e) => setAlertForm({ ...alertForm, title_ta: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">Detailed Message (English) *</label>
                <textarea
                  className="form-input"
                  rows={3}
                  placeholder="Describe flood depth, river discharge rate, and affected streets..."
                  value={alertForm.message}
                  onChange={(e) => setAlertForm({ ...alertForm, message: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="form-label">Recommended Citizen Action *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Evacuate ground floor properties; proceed to Model School Shelter."
                  value={alertForm.recommended_action}
                  onChange={(e) => setAlertForm({ ...alertForm, recommended_action: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button
                  type="submit"
                  className="button"
                  disabled={alertPublishing}
                  style={{ padding: '10px 24px', background: '#dc2626' }}
                >
                  <Radio size={16} style={{ display: 'inline', marginRight: '6px' }} />
                  {alertPublishing ? 'Broadcasting...' : 'Publish & Dispatch In-App Notifications'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 3: INCIDENT VERIFICATION */}
      {activeTab === 'incidents' && (
        <div className="panel table-panel">
          <div className="panel-head">
            <div>
              <h3>Citizen Incident Reports & Operational Verification</h3>
              <span>Inspect incoming public hazard notices, verify field conditions, and coordinate emergency resolution</span>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Severity</th>
                <th>Location / Ward</th>
                <th>Reported Details</th>
                <th>Affected</th>
                <th>Status</th>
                <th>Operator Action</th>
              </tr>
            </thead>
            <tbody>
              {incidents.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '30px' }}>
                    No citizen reports logged currently.
                  </td>
                </tr>
              ) : (
                incidents.map((inc) => (
                  <tr key={inc.id}>
                    <td>#{inc.id}</td>
                    <td><strong>{inc.incident_type}</strong></td>
                    <td>
                      <span className={`badge badge-${inc.severity === 'CRITICAL' || inc.severity === 'HIGH' ? 'danger' : 'warning'}`}>
                        {inc.severity}
                      </span>
                    </td>
                    <td>
                      {inc.area_name} <br />
                      <small style={{ color: '#64748b' }}>{inc.zone} {inc.ward ? `• ${inc.ward}` : ''}</small>
                    </td>
                    <td style={{ maxWidth: '300px', fontSize: '12px' }}>{inc.description}</td>
                    <td>{inc.people_affected}</td>
                    <td>
                      <span className={`badge badge-${inc.status === 'RESOLVED' ? 'success' : inc.status === 'VERIFIED' ? 'primary' : 'warning'}`}>
                        {inc.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {inc.status === 'REPORTED' && (
                          <button
                            className="button"
                            style={{ padding: '3px 8px', fontSize: '11px', background: '#2563eb' }}
                            onClick={() => handleUpdateIncident(inc.id, 'VERIFIED')}
                          >
                            Verify
                          </button>
                        )}
                        {inc.status !== 'RESOLVED' && (
                          <button
                            className="button"
                            style={{ padding: '3px 8px', fontSize: '11px', background: '#059669' }}
                            onClick={() => handleUpdateIncident(inc.id, 'RESOLVED')}
                          >
                            Resolve
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 4: DISASTER DAMAGE HISTORY */}
      {activeTab === 'history' && (
        <div className="panel table-panel">
          <div className="panel-head">
            <div>
              <h3>Chennai Historical Disaster Damage Records (2015–2023)</h3>
              <span>Official flood inundation, rainfall, and evacuation impact records</span>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Event ID</th>
                <th>Disaster Event</th>
                <th>Year</th>
                <th>Type</th>
                <th>Severity</th>
                <th>Rainfall</th>
                <th>Evacuated</th>
                <th>Casualties</th>
                <th>Primary Hydrological Cause</th>
              </tr>
            </thead>
            <tbody>
              {historicalDisasters.map((d: any) => (
                <tr key={d.id}>
                  <td><small>{d.event_id}</small></td>
                  <td><strong>{d.name}</strong> <br /><small>{d.affected_area}</small></td>
                  <td>{d.year}</td>
                  <td>{d.disaster_type}</td>
                  <td><span className="badge badge-danger">{d.severity}</span></td>
                  <td>{d.rainfall_mm ? `${d.rainfall_mm} mm` : '—'}</td>
                  <td><strong>{d.people_evacuated ? d.people_evacuated.toLocaleString() : '—'}</strong></td>
                  <td>{d.deaths || 0}</td>
                  <td style={{ fontSize: '11px', maxWidth: '300px' }}>{d.primary_cause}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 5: AUDIT TRAIL */}
      {activeTab === 'audit' && (
        <div className="panel table-panel">
          <div className="panel-head">
            <div>
              <h3>Tamper-Evident Operational Audit Trail</h3>
              <span>Chronological record of logins, shelter allocations, alerts, and incident resolutions</span>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Timestamp</th>
                <th>Operator</th>
                <th>Role</th>
                <th>Action</th>
                <th>Entity</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log: any) => (
                <tr key={log.id}>
                  <td><small>#{log.id}</small></td>
                  <td style={{ fontSize: '11px', whiteSpace: 'nowrap' }}>{log.created_at}</td>
                  <td><strong>{log.username}</strong></td>
                  <td><span className="badge badge-neutral">{log.role}</span></td>
                  <td><code>{log.action}</code></td>
                  <td>{log.entity} #{log.entity_id}</td>
                  <td style={{ fontSize: '12px' }}>{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* RELOCATION ALLOCATION MODAL */}
      {selectedShelterForAlloc && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>Allocate Relocation Evacuees</h3>
              <button
                onClick={() => setSelectedShelterForAlloc(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginBottom: '16px', background: '#f8fafc', padding: '12px', borderRadius: '6px', fontSize: '13px' }}>
              <div><strong>Target Shelter:</strong> {selectedShelterForAlloc.name}</div>
              <div><strong>Zone / Ward:</strong> {selectedShelterForAlloc.zone}, {selectedShelterForAlloc.ward}</div>
              <div style={{ marginTop: '6px', display: 'flex', gap: '16px' }}>
                <span>Total: <strong>{selectedShelterForAlloc.total_capacity}</strong></span>
                <span>Occupied: <strong>{selectedShelterForAlloc.current_occupancy}</strong></span>
                <span style={{ color: '#047857' }}>Available: <strong>{selectedShelterForAlloc.available_capacity}</strong></span>
              </div>
            </div>

            {allocError && (
              <div className="error" style={{ marginBottom: '14px' }}>
                ⛔ {allocError}
              </div>
            )}

            {allocSuccess && (
              <div style={{ padding: '10px 14px', background: '#ecfdf5', color: '#065f46', borderRadius: '6px', marginBottom: '14px', fontSize: '13px' }}>
                ✓ {allocSuccess}
              </div>
            )}

            <form onSubmit={handleExecuteAllocation} style={{ display: 'grid', gap: '14px' }}>
              <div>
                <label className="form-label">Number of Persons to Relocate *</label>
                <input
                  type="number"
                  className="form-input"
                  min="1"
                  value={allocCount}
                  onChange={(e) => setAllocCount(parseInt(e.target.value, 10) || 0)}
                  required
                />
                <span style={{ fontSize: '11px', color: '#64748b' }}>
                  Maximum permissible allocation: <strong>{selectedShelterForAlloc.available_capacity}</strong> places
                </span>
              </div>

              <div>
                <label className="form-label">Evacuating Zone / Affected Area *</label>
                <input
                  type="text"
                  className="form-input"
                  value={allocZone}
                  onChange={(e) => setAllocZone(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="form-label">Allocation Order Notes</label>
                <textarea
                  className="form-input"
                  rows={2}
                  value={allocNotes}
                  onChange={(e) => setAllocNotes(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button
                  type="button"
                  className="button"
                  style={{ background: '#64748b' }}
                  onClick={() => setSelectedShelterForAlloc(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="button"
                  disabled={allocLoading}
                  style={{ background: '#1e3a8a' }}
                >
                  {allocLoading ? 'Verifying Capacity...' : 'Confirm Allocation Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
