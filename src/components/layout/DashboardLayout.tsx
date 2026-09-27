import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#080B12] text-slate-100 flex flex-col bg-grid-tactical">
      {/* Sidebar navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        {/* Topbar */}
        <Topbar onOpenSidebar={() => setSidebarOpen(true)} />

        {/* Dynamic Route Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          <Outlet />
        </main>

        {/* Compact tactical footer */}
        <footer className="py-3.5 px-6 border-t border-[rgba(255,107,0,0.15)] bg-[#04060A]/90 text-[11px] font-mono text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[#FF6B00] font-bold">SIGNAL-X</span>
            <span className="text-slate-600">//</span>
            <span>AI SIGNAL INTELLIGENCE &amp; NEURAL BIOMETRICS</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>ENGINE: DUAL-CHANNEL DSP</span>
            <span className="text-slate-600">•</span>
            <span className="text-[#FF8A00] font-semibold">ALL SYSTEMS NOMINAL</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
