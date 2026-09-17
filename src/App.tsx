import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { RiskMapPage } from './pages/RiskMapPage';
import { SafeAreasPage } from './pages/SafeAreasPage';
import { RelocationPage } from './pages/RelocationPage';
import { VulnerabilityPage } from './pages/VulnerabilityPage';
import { CitizenReportPage } from './pages/CitizenReportPage';
import { CitizenAlertsPage } from './pages/CitizenAlertsPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public Citizen & Decision Support Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/risk-map" element={<RiskMapPage />} />
        <Route path="/map" element={<RiskMapPage />} />
        <Route path="/safe-areas" element={<SafeAreasPage />} />
        <Route path="/relocation" element={<RelocationPage />} />
        <Route path="/vulnerability" element={<VulnerabilityPage />} />
        <Route path="/alerts" element={<CitizenAlertsPage />} />
        <Route path="/report" element={<CitizenReportPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/emergency" element={<CitizenAlertsPage />} />
        <Route path="/emergency-info" element={<CitizenAlertsPage />} />

        {/* Protected Government Authority Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

        {/* Fallback to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
