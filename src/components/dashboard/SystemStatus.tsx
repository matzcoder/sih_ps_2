import React from 'react';
import { Cpu, HardDrive, Zap, Radio, Activity } from 'lucide-react';
import { SystemMetrics } from '../../types/signal';

interface SystemStatusProps {
  metrics: SystemMetrics;
}

export const SystemStatus: React.FC<SystemStatusProps> = ({ metrics }) => {
  return (
    <div className="bg-gradient-to-b from-[#131B2D] to-[#0F1523] border border-[rgba(255,107,0,0.2)] rounded-xl p-5 tactical-brackets shadow-[0_8px_32px_-4px_rgba(0,0,0,0.7)]">
      <div className="flex items-center justify-between pb-3 border-b border-[rgba(255,107,0,0.15)] mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#FF6B00]" />
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-100">
            SYSTEM ENGINE &amp; DSP TELEMETRY
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#FF6B00] bg-[#161F33] px-2.5 py-0.5 rounded-full border border-[#FF6B00]/40 shadow-[0_0_10px_rgba(255,107,0,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-ping" />
          DSP ACCELERATOR ONLINE
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
        {/* DSP Throughput */}
        <div className="bg-[#0B0F19] p-3.5 rounded-lg border border-[rgba(255,107,0,0.18)] hover:border-[#FF6B00]/40 transition-colors">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1">
            <Zap className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span className="text-[10px] uppercase">DSP THROUGHPUT</span>
          </div>
          <div className="text-lg font-bold text-white">{metrics.dspThroughput}</div>
          <div className="text-[10px] text-[#FF8A00] mt-1 font-semibold">Welch / FFT Engine</div>
        </div>

        {/* GPU Acceleration */}
        <div className="bg-[#0B0F19] p-3.5 rounded-lg border border-[rgba(255,107,0,0.18)] hover:border-[#FF6B00]/40 transition-colors">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1">
            <Cpu className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span className="text-[10px] uppercase">GPU LOAD</span>
          </div>
          <div className="text-lg font-bold text-white">{metrics.gpuLoad}%</div>
          <div className="w-full bg-[#04060A] h-1.5 rounded-full mt-2 overflow-hidden border border-[rgba(255,107,0,0.15)]">
            <div className="bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] h-full" style={{ width: `${metrics.gpuLoad}%` }} />
          </div>
        </div>

        {/* Storage */}
        <div className="bg-[#0B0F19] p-3.5 rounded-lg border border-[rgba(255,107,0,0.18)] hover:border-[#FF6B00]/40 transition-colors">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1">
            <HardDrive className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span className="text-[10px] uppercase">STORAGE ARRAY</span>
          </div>
          <div className="text-lg font-bold text-white">{metrics.storageUsed}</div>
          <div className="text-[10px] text-slate-400 mt-1">NVMe RAID Array</div>
        </div>

        {/* Active Sensor Nodes */}
        <div className="bg-[#0B0F19] p-3.5 rounded-lg border border-[rgba(255,107,0,0.18)] hover:border-[#FF6B00]/40 transition-colors">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1">
            <Radio className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span className="text-[10px] uppercase">SENSOR NODES</span>
          </div>
          <div className="text-lg font-bold text-white">{metrics.activeSensors} ONLINE</div>
          <div className="text-[10px] text-[#FF8A00] mt-1 font-semibold">Antenna Arrays Synced</div>
        </div>
      </div>
    </div>
  );
};
