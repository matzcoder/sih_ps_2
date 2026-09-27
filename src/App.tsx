import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { AnalyzeSignal } from './pages/AnalyzeSignal';
import { SignalWorkspace } from './pages/SignalWorkspace';
import { SignalDNAPage } from './pages/SignalDNAPage';
import { AnomaliesPage } from './pages/AnomaliesPage';
import { ClassificationPage } from './pages/ClassificationPage';
import { SimilarityPage } from './pages/SimilarityPage';
import { ReportsPage } from './pages/ReportsPage';
import { HistoryPage } from './pages/HistoryPage';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Standalone Landing Page */}
      <Route path="/" element={<Landing />} />

      {/* Main Command Center Layout */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analyze" element={<AnalyzeSignal />} />

        {/* Signal Workspace */}
        <Route path="/workspace" element={<Navigate to="/workspace/signal_042" replace />} />
        <Route path="/workspace/:id" element={<SignalWorkspace />} />

        {/* Signal DNA Biometrics */}
        <Route path="/signal-dna" element={<Navigate to="/signal-dna/signal_042" replace />} />
        <Route path="/signal-dna/:id" element={<SignalDNAPage />} />

        {/* Anomalies */}
        <Route path="/anomalies" element={<Navigate to="/anomalies/signal_042" replace />} />
        <Route path="/anomalies/:id" element={<AnomaliesPage />} />

        {/* AI Classification & XAI */}
        <Route path="/classification" element={<Navigate to="/classification/signal_042" replace />} />
        <Route path="/classification/:id" element={<ClassificationPage />} />

        {/* Similarity Search */}
        <Route path="/similarity" element={<SimilarityPage />} />

        {/* Intelligence Reports */}
        <Route path="/reports" element={<Navigate to="/reports/signal_042" replace />} />
        <Route path="/reports/:id" element={<ReportsPage />} />

        {/* History Archive */}
        <Route path="/history" element={<HistoryPage />} />

        {/* System Settings */}
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* 404 Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
