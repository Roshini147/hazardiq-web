import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import {
  Map,
  ShieldAlert,
  Users,
  Boxes,
  Truck,
  MapPinned,
  Database,
  Activity,
  Info,
  Bell,
  Globe,
  Radio,
  FileWarning,
  PhoneCall,
  ShieldCheck,
  User as UserIcon,
  LogOut,
  X,
  ExternalLink
} from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { getNotifications, markNotificationAsRead } from '../services/api';

export default function AppLayout() {
  const { t, language, setLanguage } = useTranslation();
  const { user, isAuthority, logout } = useAuth();
  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState<string>('');
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-IN', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 30000);
    return () => clearInterval(timer);
  }, [language]);

  useEffect(() => {
    if (user) {
      getNotifications()
        .then((data) => {
          if (data) {
            setNotifications(data.notifications || []);
            setUnreadCount(data.unread_count || 0);
          }
        })
        .catch(() => {});
    }
  }, [user]);

  const handleRead = async (id: number) => {
    await markNotificationAsRead(id);
    setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: 1 } : n));
    setUnreadCount(Math.max(0, unreadCount - 1));
  };

  const navLinks = [
    ['/', t('nav_overview'), Activity],
    ['/map', t('nav_risk_map'), Map],
    ['/my-area', t('nav_my_area'), MapPinned],
    ['/alerts', t('nav_alerts'), Radio],
    ['/capacity', t('nav_capacity'), Boxes],
    ['/safe-areas', t('nav_safe_locations'), ShieldCheck],
    ['/report-incident', t('nav_report_incident'), FileWarning],
    ['/emergency-info', t('nav_emergency_info'), PhoneCall],
    ['/hazards', t('nav_hazards'), ShieldAlert],
    ['/vulnerability', t('nav_vulnerability'), Users],
    ['/relocation', t('nav_relocation'), Truck],
    ['/resources', t('nav_resources'), Database],
    ['/data-sources', t('nav_data_sources'), Database],
    ['/about', t('nav_about'), Info],
  ];

  return (
    <div className="app-shell">
      {/* Institutional Sidebar */}
      <aside>
        <div className="brand">
          <div className="brand-mark">HQ</div>
          <div>
            <strong>HAZARDIQ</strong>
            <small style={{ color: '#93c5fd', fontSize: '10px' }}>
              {t('brand_tagline')}
            </small>
          </div>
        </div>

        <nav>
          {navLinks.map(([to, label, Icon]: any) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="side-status">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <span className="dot" />
            <span style={{ fontSize: '11px', fontWeight: 600 }}>{t('system_operational')}</span>
          </div>
          <div style={{ fontSize: '10px', color: '#64748b' }}>
            Chennai District Ops • GCC 2025
          </div>
        </div>
      </aside>

      {/* Main Content Area with Professional Government Header */}
      <main>
        <header className="gov-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '18px', fontWeight: 800, color: '#0b2545', letterSpacing: '0.04em' }}>
                HAZARDIQ
              </h1>
              <span className="badge badge-primary" style={{ fontSize: '10px', padding: '2px 8px' }}>
                CHENNAI RISK INTELLIGENCE
              </span>
            </div>
            <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#475569' }}>
              {t('brand_tagline')}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Clock & Monitoring State */}
            <div style={{ textAlign: 'right', fontSize: '11px', color: '#475569' }} className="desktop-only">
              <div style={{ fontWeight: 600, color: '#1e293b' }}>{currentTime}</div>
              <div>State: <span style={{ color: '#059669', fontWeight: 700 }}>MONITORING</span></div>
            </div>

            {/* Language Selector (English / Tamil) */}
            <div style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', padding: '3px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                style={{
                  padding: '4px 8px',
                  fontSize: '11px',
                  fontWeight: 700,
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  background: language === 'en' ? '#0b2545' : 'transparent',
                  color: language === 'en' ? '#ffffff' : '#475569'
                }}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ta')}
                style={{
                  padding: '4px 8px',
                  fontSize: '11px',
                  fontWeight: 700,
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  background: language === 'ta' ? '#0b2545' : 'transparent',
                  color: language === 'ta' ? '#ffffff' : '#475569'
                }}
              >
                தமிழ்
              </button>
            </div>

            {/* Notifications Bell */}
            <div style={{ position: 'relative' }}>
              <button
                className="icon-button"
                onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                title="Targeted Alerts & Notifications"
                style={{ position: 'relative' }}
              >
                <Bell size={18} color="#1e293b" />
                {unreadCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-3px',
                      right: '-3px',
                      background: '#dc2626',
                      color: '#fff',
                      fontSize: '9px',
                      fontWeight: 800,
                      borderRadius: '50%',
                      width: '15px',
                      height: '15px',
                      display: 'grid',
                      placeItems: 'center'
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '38px',
                    width: '320px',
                    background: '#ffffff',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    zIndex: 1000,
                    padding: '12px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px' }}>
                    <strong style={{ fontSize: '13px', color: '#0f172a' }}>
                      {language === 'ta' ? 'அவசர அறிவிப்புகள்' : 'Targeted Notifications'}
                    </strong>
                    <button onClick={() => setShowNotifDropdown(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                      <X size={14} />
                    </button>
                  </div>

                  {notifications.length === 0 ? (
                    <div style={{ fontSize: '12px', color: '#64748b', padding: '12px 0', textAlign: 'center' }}>
                      {t('no_active_alerts')}
                    </div>
                  ) : (
                    <div style={{ maxHeight: '260px', overflowY: 'auto', display: 'grid', gap: '8px' }}>
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          style={{
                            padding: '8px 10px',
                            borderRadius: '6px',
                            background: n.is_read ? '#f8fafc' : '#eff6ff',
                            border: `1px solid ${n.is_read ? '#e2e8f0' : '#bfdbfe'}`,
                            fontSize: '12px'
                          }}
                        >
                          <div style={{ fontWeight: 600, color: '#1e293b' }}>{n.title}</div>
                          <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>{n.message}</div>
                          {!n.is_read && (
                            <button
                              onClick={() => handleRead(n.id)}
                              style={{
                                marginTop: '4px',
                                background: 'none',
                                border: 'none',
                                color: '#1d4ed8',
                                fontSize: '10px',
                                cursor: 'pointer',
                                padding: 0,
                                fontWeight: 600
                              }}
                            >
                              Mark as read
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Authority / User Access */}
            {isAuthority ? (
              <Link
                to="/authority/command-center"
                className="button"
                style={{
                  fontSize: '11px',
                  background: '#133e87',
                  border: '1px solid #133e87',
                  padding: '7px 12px'
                }}
              >
                Command Center
              </Link>
            ) : user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#1e293b', fontWeight: 600 }}>
                  {user.username}
                </span>
                <button
                  onClick={() => logout()}
                  className="button"
                  style={{ fontSize: '11px', padding: '5px 10px', background: '#64748b' }}
                >
                  {t('nav_logout')}
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '6px' }}>
                <Link
                  to="/auth"
                  className="button"
                  style={{
                    fontSize: '11px',
                    background: '#ffffff',
                    color: '#0b2545',
                    border: '1px solid #cbd5e1',
                    padding: '6px 12px'
                  }}
                >
                  {t('nav_login')}
                </Link>
                <Link
                  to="/authority/login"
                  className="button"
                  style={{
                    fontSize: '11px',
                    background: '#0b2545',
                    border: '1px solid #0b2545',
                    padding: '6px 12px'
                  }}
                >
                  {t('nav_authority_portal')}
                </Link>
              </div>
            )}
          </div>
        </header>

        {/* Dynamic Outlet */}
        <section className="content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
