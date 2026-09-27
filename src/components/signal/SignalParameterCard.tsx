import React from 'react';
import { SignalAnalysis } from '../../types/signal';
import { Badge } from '../common/Badge';
import { ShieldAlert, FileCode2 } from 'lucide-react';

interface SignalParameterCardProps {
  signal: SignalAnalysis;
}

export const SignalParameterCard: React.FC<SignalParameterCardProps> = ({ signal }) => {
  return (
    <div className="bg-gradient-to-b from-[#131B2D] to-[#0F1523] border border-[rgba(255,107,0,0.2)] rounded-xl p-5 sm:p-6 tactical-brackets shadow-[0_8px_32px_-4px_rgba(0,0,0,0.7)]">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-[rgba(255,107,0,0.18)] gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-[#161F33] border border-[#FF6B00] text-[#FF6B00] shadow-[0_0_15px_rgba(255,107,0,0.3)]">
            <FileCode2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-mono text-xl font-bold text-white tracking-wide">
                {signal.fileName}
              </h2>
              <Badge variant={signal.fileType === 'IQ' ? 'iq' : 'wav'}>
                .{signal.fileType}
              </Badge>
            </div>
            <div className="text-xs font-mono text-slate-300 mt-1 flex items-center gap-2">
              <span>TARGET ID: <strong className="text-[#FF6B00]">{signal.id}</strong></span>
              <span className="text-slate-600">•</span>
              <span>FILE SIZE: {signal.fileSize}</span>
            </div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex flex-wrap items-center gap-3">
          <Badge status={signal.status} showDot size="md">
            ● ANALYSIS COMPLETE
          </Badge>
          {signal.anomalies > 0 && (
            <Badge severity="HIGH" showDot size="md">
              <ShieldAlert className="w-3.5 h-3.5" />
              {signal.anomalies} ANOMALIES FLAGGED
            </Badge>
          )}
        </div>
      </div>

      {/* Extracted Parameters Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-5 font-mono">
        {/* Sampling Rate */}
        <div className="bg-[#0B0F19] p-3.5 rounded-lg border border-[rgba(255,107,0,0.18)] hover:border-[#FF6B00]/40 transition-colors">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">SAMPLING RATE</span>
          <div className="text-base sm:text-lg font-bold text-white mt-1">{signal.samplingRate}</div>
          <span className="text-[9px] text-[#FF8A00] font-semibold">Calibrated I/Q ADC</span>
        </div>

        {/* Duration */}
        <div className="bg-[#0B0F19] p-3.5 rounded-lg border border-[rgba(255,107,0,0.18)] hover:border-[#FF6B00]/40 transition-colors">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">DURATION</span>
          <div className="text-base sm:text-lg font-bold text-white mt-1">{signal.duration.toFixed(1)} s</div>
          <span className="text-[9px] text-slate-400">Total Capture Window</span>
        </div>

        {/* SNR */}
        <div className="bg-[#0B0F19] p-3.5 rounded-lg border border-[rgba(255,107,0,0.18)] hover:border-[#FF6B00]/40 transition-colors">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">SNR</span>
          <div className="text-base sm:text-lg font-bold text-[#FF6B00] mt-1">{signal.snr.toFixed(1)} dB</div>
          <span className="text-[9px] text-[#FF8A00] font-semibold">High Fidelity</span>
        </div>

        {/* Bandwidth */}
        <div className="bg-[#0B0F19] p-3.5 rounded-lg border border-[rgba(255,107,0,0.18)] hover:border-[#FF6B00]/40 transition-colors">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">BANDWIDTH</span>
          <div className="text-base sm:text-lg font-bold text-white mt-1">{signal.bandwidth}</div>
          <span className="text-[9px] text-slate-400">Occupied Channel</span>
        </div>

        {/* Center Frequency */}
        <div className="bg-[#0B0F19] p-3.5 rounded-lg border border-[rgba(255,107,0,0.18)] col-span-2 sm:col-span-1 hover:border-[#FF6B00]/40 transition-colors">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">CENTER FREQUENCY</span>
          <div className="text-base sm:text-lg font-bold text-[#FF8A00] mt-1">{signal.centerFrequency}</div>
          <span className="text-[9px] text-[#FF8A00] font-semibold">Tuned LO Raster</span>
        </div>
      </div>
    </div>
  );
};
