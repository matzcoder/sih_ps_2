import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {
  LayoutDashboard,
  UploadCloud,
  Activity,
  Dna,
  AlertTriangle,
  BrainCircuit,
  Network,
  FileText,
  History,
  Settings,
  Shield,
  Radio,
  X,
  LucideIcon,
  Flame,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
  highlight?: boolean;
  badge?: string;
  badgeWarning?: boolean;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const params = useParams<{ id?: string }>();
  const activeSignalId = params.id || 'signal_042';

  const navGroups: NavGroup[] = [
    {
      group: 'COMMAND',
      items: [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Analyze Signal', path: '/analyze', icon: UploadCloud, highlight: true },
        { name: 'Signal History', path: '/history', icon: History },
      ],
    },
    {
      group: 'ACTIVE TELEMETRY',
      items: [
        { name: 'Workspace', path: `/workspace/${activeSignalId}`, icon: Activity },
        { name: 'Signal DNA', path: `/signal-dna/${activeSignalId}`, icon: Dna },
        { name: 'Anomalies', path: `/anomalies/${activeSignalId}`, icon: AlertTriangle, badge: '3', badgeWarning: true },
        { name: 'AI Classification', path: `/classification/${activeSignalId}`, icon: BrainCircuit, badge: '94.7%' },
        { name: 'Similarity Search', path: '/similarity', icon: Network },
        { name: 'Intelligence Report', path: `/reports/${activeSignalId}`, icon: FileText },
      ],
    },
    {
      group: 'SYSTEM',
      items: [
        { name: 'Configuration', path: '/settings', icon: Settings },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#080B12] border-r border-[rgba(255,107,0,0.18)] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-[rgba(255,107,0,0.18)] bg-[#04060A]">
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6B00] to-[#FF8A00] flex items-center justify-center text-[#080B12] shadow-[0_0_15px_rgba(255,107,0,0.5)] group-hover:scale-105 transition-transform">
              <Radio className="w-4 h-4 font-black" />
            </div>
            <div>
              <span className="font-mono text-lg font-black tracking-widest text-[#F8FAFC] group-hover:text-[#FF6B00] transition-colors">
                SIGNAL<span className="text-[#FF6B00]">-X</span>
              </span>
              <div className="text-[9px] font-mono tracking-widest text-slate-400">
                DSP & NEURAL TELEMETRY
              </div>
            </div>
          </NavLink>

          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded hover:bg-[#FF6B00]/15 cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Active Target Card */}
        <div className="p-3 mx-3 my-3 bg-[#0F1523] border border-[rgba(255,107,0,0.25)] rounded-lg tactical-brackets shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-ping" />
              ACTIVE TARGET
            </span>
            <span className="text-[#FF6B00] font-bold">LIVE</span>
          </div>
          <div className="font-mono text-xs font-bold text-slate-100 truncate">
            {activeSignalId}.iq
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-1">
            <span>20 MHz // 2.41 GHz</span>
            <span className="text-[#FF8A00] font-semibold">SNR 18.7dB</span>
          </div>
        </div>

        {/* Navigation items list */}
        <nav className="flex-1 px-3 space-y-4 overflow-y-auto py-2">
          {navGroups.map((grp) => (
            <div key={grp.group}>
              <div className="px-3 text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase mb-1.5 flex items-center justify-between">
                <span>{grp.group}</span>
                <span className="text-[9px] text-[#FF6B00]/70">●</span>
              </div>
              <ul className="space-y-1">
                {grp.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono font-medium transition-all group ${
                            isActive
                              ? 'bg-[#FF6B00]/15 text-[#FF6B00] border border-[#FF6B00]/50 shadow-[0_0_16px_rgba(255,107,0,0.2)] font-semibold'
                              : 'text-slate-300 hover:text-[#FF8A00] hover:bg-[#161F33]/70 border border-transparent'
                          } ${item.highlight && !location.pathname.startsWith(item.path) ? 'ring-1 ring-[#FF6B00]/30' : ''}`
                        }
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                          <span className="truncate">{item.name}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                              item.badgeWarning
                                ? 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/50 animate-pulse'
                                : 'bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/40'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Tactical Footer / Hardware Telemetry Status */}
        <div className="p-3 border-t border-[rgba(255,107,0,0.18)] bg-[#04060A] text-[10px] font-mono space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-[#FF6B00]" />
              DSP ACCELERATION
            </span>
            <span className="text-[#FF6B00] font-bold">CUDA OK</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>MEM ALLOC</span>
            <span className="text-slate-200">2.4 / 16 GB</span>
          </div>
        </div>
      </aside>
    </>
  );
};
