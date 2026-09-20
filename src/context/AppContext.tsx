import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage, CitizenProfile } from '../utils/storage';
import { TRANSLATIONS, Language } from '../i18n/translations';
import { RiskZone } from '../data/hazards';
import { SafeArea } from '../data/shelters';
import { CitizenReport } from '../data/reports';
import { EmergencyAlert } from '../data/alerts';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: typeof TRANSLATIONS['en'];
  lowBandwidth: boolean;
  toggleLowBandwidth: () => void;
  
  zones: RiskZone[];
  shelters: SafeArea[];
  reports: CitizenReport[];
  alerts: EmergencyAlert[];
  
  isEscalated: boolean;
  simulateRiskEscalation: () => void;
  resetRiskEscalation: () => void;
  
  addCitizenReport: (data: Omit<CitizenReport, 'id' | 'reportId' | 'timestamp' | 'status'>) => CitizenReport;
  updateReportStatus: (reportId: string, status: CitizenReport['status']) => void;
  sendEmergencyAlert: (data: Omit<EmergencyAlert, 'id' | 'alertCode' | 'issuedAt' | 'active'>) => EmergencyAlert;
  
  // Citizen Auth
  citizen: CitizenProfile | null;
  isCitizenAuthenticated: boolean;
  citizenLogin: (profile: CitizenProfile) => void;
  citizenLogout: () => void;

  // Admin Auth
  isAuthenticated: boolean;
  isAdminAuthenticated: boolean;
  login: (user: string, pass: string) => boolean;
  adminLogin: (user: string, pass: string) => boolean;
  quickLogin: () => void;
  logout: () => void;
  adminLogout: () => void;
  
  selectedZone: RiskZone | null;
  setSelectedZone: (zone: RiskZone | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLangState] = useState<Language>(storage.getLanguage());
  const [lowBandwidth, setLowBwState] = useState<boolean>(storage.isLowBandwidth());
  const [zones, setZones] = useState<RiskZone[]>(storage.getZones());
  const [shelters, setShelters] = useState<SafeArea[]>(storage.getShelters());
  const [reports, setReports] = useState<CitizenReport[]>(storage.getReports());
  const [alerts, setAlerts] = useState<EmergencyAlert[]>(storage.getAlerts());
  const [isEscalated, setIsEscalated] = useState<boolean>(storage.isEscalated());
  const [citizen, setCitizen] = useState<CitizenProfile | null>(() => storage.getCitizen());
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => storage.isAdminAuthenticated());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => storage.isAdminAuthenticated());
  const [selectedZone, setSelectedZone] = useState<RiskZone | null>(zones[0] || null);

  const t = TRANSLATIONS[language];

  const setLanguage = (lang: Language) => {
    storage.setLanguage(lang);
    setLangState(lang);
  };

  const toggleLanguage = () => {
    const next = language === 'en' ? 'ta' : 'en';
    setLanguage(next);
  };

  const toggleLowBandwidth = () => {
    const next = !lowBandwidth;
    storage.setLowBandwidth(next);
    setLowBwState(next);
  };

  const simulateRiskEscalation = () => {
    storage.setEscalated(true);
    setIsEscalated(true);
    setZones(storage.getZones());
    // Also simulate added strain on shelters
    const updatedShelters = storage.updateShelterOccupancy('safe-b', 200);
    setShelters(updatedShelters);
  };

  const resetRiskEscalation = () => {
    storage.setEscalated(false);
    setIsEscalated(false);
    setZones(storage.getZones());
    setShelters(storage.getShelters());
  };

  const addCitizenReport = (data: Omit<CitizenReport, 'id' | 'reportId' | 'timestamp' | 'status'>) => {
    const newRep = storage.addReport(data);
    setReports(storage.getReports());
    return newRep;
  };

  const updateReportStatus = (reportId: string, status: CitizenReport['status']) => {
    const updated = storage.updateReportStatus(reportId, status);
    setReports(updated);
  };

  const sendEmergencyAlert = (data: Omit<EmergencyAlert, 'id' | 'alertCode' | 'issuedAt' | 'active'>) => {
    const newAlt = storage.addAlert(data);
    setAlerts(storage.getAlerts());
    return newAlt;
  };


  const isCitizenAuthenticated = citizen !== null;

  const citizenLogin = (profile: CitizenProfile) => {
    storage.citizenLogin(profile);
    setCitizen(profile);
  };

  const citizenLogout = () => {
    storage.citizenLogout();
    setCitizen(null);
  };

  const adminLogin = (user: string, pass: string) => {
    const success = storage.adminLogin(user, pass);
    if (success) {
      setIsAdminAuthenticated(true);
      setIsAuthenticated(true);
    }
    return success;
  };

  const adminLogout = () => {
    storage.adminLogout();
    setIsAdminAuthenticated(false);
    setIsAuthenticated(false);
  };

  const login = (user: string, pass: string) => {
    const success = adminLogin(user, pass);
    return success;
  };

  const _oldLogin = (user: string, pass: string) => {
    const u = user.trim().toLowerCase();
    const p = pass.trim();
    // Accept standard official credentials and demo variants
    if (
      (u === 'admin' && (p === 'hazardiq' || p === 'admin' || p === 'admin123' || p === '')) ||
      (u === 'admin@tnsdma.gov.in' && (p === 'hazardiq' || p === 'admin' || p === 'admin123' || p === '')) ||
      (u === 'officer' && (p === 'hazardiq' || p === 'officer' || p === '')) ||
      u === 'admin' ||
      u === 'officer'
    ) {
      storage.login();
      setIsAuthenticated(true);
      return true;
    }
    // Fallback: if username is provided in demo mode, authenticate
    if (u.length > 0 && (p === 'hazardiq' || p === 'admin' || p.length === 0)) {
      storage.login();
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const quickLogin = () => {
    storage.login();
    setIsAuthenticated(true);
  };

  const logout = () => {
    storage.logout();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (lowBandwidth) {
      document.documentElement.classList.add('low-bandwidth');
    } else {
      document.documentElement.classList.remove('low-bandwidth');
    }
  }, [lowBandwidth]);

  return (
    <AppContext.Provider
      value={{
        citizen,
        isCitizenAuthenticated,
        citizenLogin,
        citizenLogout,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        language,
        setLanguage,
        toggleLanguage,
        t,
        lowBandwidth,
        toggleLowBandwidth,
        zones,
        shelters,
        reports,
        alerts,
        isEscalated,
        simulateRiskEscalation,
        resetRiskEscalation,
        addCitizenReport,
        updateReportStatus,
        sendEmergencyAlert,
        isAuthenticated,
        login,
        quickLogin,
        logout,
        selectedZone,
        setSelectedZone,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
