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
import { CitizenLoginPage } from './pages/CitizenLoginPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { useApp } from './context/AppContext';

export const App: React.FC = () => {
  const { isCitizenAuthenticated, isAdminAuthenticated } = useApp();

  return (
    <Routes>
      {/* 1. Standalone Dedicated Login Pages */}
      <Route path="/citizen/login" element={<CitizenLoginPage />} />
      <Route path="/login" element={<CitizenLoginPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* 2. Routes inside MainLayout */}
      <Route element={<MainLayout />}>
        {/*
          FIRST PAGE REQUIREMENT (Prompt Section 2 & 15):
          When a citizen opens the website, the FIRST page must be Citizen Login.
          If not authenticated, show CitizenLoginPage.
          Once logged in with required details, open Citizen Portal (HomePage).
        */}
        <Route
          path="/"
          element={
            isCitizenAuthenticated ? (
              <HomePage />
            ) : (
              <CitizenLoginPage />
            )
          }
        />

        {/* Citizen-facing features */}
        <Route
          path="/risk-map"
          element={
            isCitizenAuthenticated ? <RiskMapPage /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/map"
          element={
            isCitizenAuthenticated ? <RiskMapPage /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/safe-areas"
          element={
            isCitizenAuthenticated ? <SafeAreasPage /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/relocation"
          element={
            isCitizenAuthenticated ? <RelocationPage /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/vulnerability"
          element={
            isCitizenAuthenticated ? <VulnerabilityPage /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/alerts"
          element={
            isCitizenAuthenticated ? <CitizenAlertsPage /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/report"
          element={
            isCitizenAuthenticated ? <CitizenReportPage /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/emergency"
          element={
            isCitizenAuthenticated ? <CitizenAlertsPage /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/emergency-info"
          element={
            isCitizenAuthenticated ? <CitizenAlertsPage /> : <Navigate to="/" replace />
          }
        />

        {/*
          REMOVE HOW IT WORKS (Prompt Section 6):
          Redirect /how-it-works to Home
        */}
        <Route path="/how-it-works" element={<Navigate to="/" replace />} />

        {/*
          GOVERNMENT VIEWING PLATFORM (Prompt Section 10 & 15):
          Strictly requires admin authentication.
          Cannot be bypassed; unauthenticated requests redirect to /admin/login.
        */}
        <Route
          path="/admin/dashboard"
          element={
            isAdminAuthenticated ? (
              <AdminDashboardPage />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />

        {/* Fallback to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
