import React from 'react';
import { Activity, Radio, Cpu } from 'lucide-react';

export interface LoadingStateProps {
  title?: string;
  message?: string;
  icon?: 'radar' | 'waveform' | 'dsp';
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  title = 'PROCESSING SIGNAL TELEMETRY',
  message = 'Executing Fourier transforms and multi-dimensional feature extraction...',
  icon = 'radar',
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl bg-[#0F1523] border border-[rgba(255,107,0,0.25)] tactical-brackets shadow-[0_8px_32px_-4px_rgba(0,0,0,0.7)]">
      {/* Animated Reticle / Radar Icon */}
      <div className="relative flex items-center justify-center w-20 h-20 mb-6">
        <div className="absolute inset-0 rounded-full border border-[#FF6B00]/30 animate-ping" />
        <div className="absolute inset-2 rounded-full border border-dashed border-[#FF8A00]/50 animate-spin" style={{ animationDuration: '6s' }} />
        <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#161F33] border border-[#FF6B00] text-[#FF6B00] shadow-[0_0_20px_rgba(255,107,0,0.5)]">
          {icon === 'radar' && <Radio className="w-6 h-6 animate-pulse" />}
          {icon === 'waveform' && <Activity className="w-6 h-6 animate-pulse" />}
          {icon === 'dsp' && <Cpu className="w-6 h-6 animate-pulse" />}
        </div>
      </div>

      <h3 className="font-mono text-base font-bold text-[#FF6B00] tracking-widest uppercase mb-2 glow-text-accent">
        {title}
      </h3>
      <p className="text-xs font-mono text-slate-300 max-w-md mx-auto leading-relaxed">
        {message}
      </p>

      <div className="mt-6 flex items-center gap-2 text-[10px] font-mono text-slate-400 bg-[#04060A] px-3.5 py-1.5 rounded-full border border-[rgba(255,107,0,0.2)]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-ping" />
        <span>BUFFER: 4096 I/Q SAMPLES</span>
        <span className="text-slate-600">|</span>
        <span>DSP ENGINE: ONLINE</span>
      </div>
    </div>
  );
};
