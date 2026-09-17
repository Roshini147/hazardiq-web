import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';
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
  
  isAuthenticated: boolean;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
  
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(storage.isAuthenticated());
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

  const login = (user: string, pass: string) => {
    if (user.trim() === 'admin' && pass.trim() === 'hazardiq') {
      storage.login();
      setIsAuthenticated(true);
      return true;
    }
    return false;
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
