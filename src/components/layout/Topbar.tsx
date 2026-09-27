import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, PlusCircle, Radio, Clock, ShieldCheck, Bell } from 'lucide-react';
import { Button } from '../common/Button';

interface TopbarProps {
  onOpenSidebar: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Compute breadcrumb title based on pathname
  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') return 'DASHBOARD // OVERVIEW';
    if (path.startsWith('/analyze')) return 'INGEST // SIGNAL UPLOAD PIPELINE';
    if (path.startsWith('/workspace')) return 'WORKSTATION // TIME & FREQUENCY DOMAIN';
    if (path.startsWith('/signal-dna')) return 'BIOMETRICS // 7D SIGNAL DNA';
    if (path.startsWith('/anomalies')) return 'DETECTION // ANOMALY EVENT LOG';
    if (path.startsWith('/classification')) return 'INTELLIGENCE // AI CLASSIFICATION & XAI';
    if (path.startsWith('/similarity')) return 'TOPOLOGY // SIMILARITY GRAPH SEARCH';
    if (path.startsWith('/reports')) return 'DOSSIER // AUTOMATED MISSION REPORT';
    if (path.startsWith('/history')) return 'ARCHIVE // SIGNAL DATABASE';
    if (path.startsWith('/settings')) return 'SYSTEM // DSP & MODEL CONFIGURATION';
    return 'SIGNAL INTELLIGENCE';
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#080B12]/95 backdrop-blur-md border-b border-[rgba(255,107,0,0.18)] flex items-center justify-between px-4 lg:px-8">
      {/* Left: Mobile Menu + Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="p-2 text-slate-300 hover:text-[#FF6B00] rounded hover:bg-[#161F33] lg:hidden focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF6B00] cursor-pointer"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 font-mono">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#161F33] border border-[rgba(255,107,0,0.3)] text-[10px] text-[#FF6B00] font-bold shadow-[0_0_10px_rgba(255,107,0,0.15)]">
            <Radio className="w-3 h-3 animate-pulse text-[#FF6B00]" />
            <span>NODE: SIG-ALPHA</span>
          </div>
          <span className="text-slate-600 hidden sm:inline">/</span>
          <span className="text-xs sm:text-sm font-bold tracking-wider text-slate-200">
            {getBreadcrumb()}
          </span>
        </div>
      </div>

      {/* Right: Telemetry UTC Clock & Action Buttons */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* UTC Clock with glowing marker */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0F1523] border border-[rgba(255,107,0,0.2)] text-xs font-mono">
          <Clock className="w-3.5 h-3.5 text-[#FF8A00]" />
          <span className="text-slate-200">{timeStr || 'CALCULATING...'}</span>
        </div>

        {/* Security / System status pill */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0F1523] border border-[rgba(255,107,0,0.2)] text-[10px] font-mono text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-[#FF6B00]" />
          <span>FIPS 140-3 READY</span>
        </div>

        {/* Quick Ingest Button */}
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/analyze')}
          leftIcon={<PlusCircle className="w-4 h-4 text-[#080B12]" />}
          className="shadow-[0_0_15px_rgba(255,107,0,0.4)]"
        >
          <span className="hidden xs:inline">ANALYZE SIGNAL</span>
          <span className="xs:hidden">ANALYZE</span>
        </Button>
      </div>
    </header>
  );
};
