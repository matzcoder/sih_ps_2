import React from 'react';
import { AnomalyEvent } from '../../types/signal';
import { AlertTriangle, Clock, ChevronRight } from 'lucide-react';
import { Badge } from '../common/Badge';

interface SignalTimelineProps {
  duration?: number;
  anomalies: AnomalyEvent[];
  onSelectAnomaly: (anomaly: AnomalyEvent) => void;
  selectedAnomalyId?: string;
}

export const SignalTimeline: React.FC<SignalTimelineProps> = ({
  duration = 32.4,
  anomalies,
  onSelectAnomaly,
  selectedAnomalyId,
}) => {
  return (
    <div className="bg-gradient-to-b from-[#131B2D] to-[#0F1523] border border-[rgba(255,107,0,0.2)] rounded-xl p-5 tactical-brackets shadow-[0_8px_32px_-4px_rgba(0,0,0,0.7)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[rgba(255,107,0,0.15)] gap-3 mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#FF6B00]" />
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-100">
              TEMPORAL ANOMALY TIMELINE
            </h3>
            <p className="text-[10px] font-mono text-slate-400">
              CHRONOLOGICAL OCCURRENCE TRACK // SPATIAL EVENT PINS
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-[#F59E0B] bg-[#161F33] px-3 py-1.5 rounded-lg border border-[#F59E0B]/40 warning-brackets shadow-[0_0_12px_rgba(245,158,11,0.2)]">
          <AlertTriangle className="w-3.5 h-3.5 animate-bounce text-[#F59E0B]" />
          <span className="font-semibold">{anomalies.length} ANOMALIES DETECTED</span>
        </div>
      </div>

      {/* Visual Timeline Bar */}
      <div className="relative py-8 px-4 bg-[#06080F] rounded-lg border border-[rgba(255,107,0,0.18)] mb-6">
        {/* Central Track Line */}
        <div className="w-full h-1 bg-[#161F33] relative rounded-full">
          {/* Tick markers */}
          {[0, 5, 10, 15, 20, 25, 30].map((sec) => {
            const leftPct = (sec / duration) * 100;
            if (leftPct > 100) return null;
            return (
              <div
                key={sec}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
                style={{ left: `${leftPct}%` }}
              >
                <div className="w-1 h-3 bg-[rgba(255,107,0,0.3)]" />
                <span className="text-[9px] font-mono text-slate-500 mt-2">
                  {sec.toString().padStart(2, '0')}s
                </span>
              </div>
            );
          })}

          {/* Anomaly Pin Markers */}
          {anomalies.map((anom) => {
            const leftPct = (anom.timestamp / duration) * 100;
            const isSelected = selectedAnomalyId === anom.id;

            return (
              <button
                key={anom.id}
                onClick={() => onSelectAnomaly(anom)}
                className="group absolute top-1/2 -translate-y-1/2 -translate-x-1/2 focus:outline-none z-10 cursor-pointer"
                style={{ left: `${leftPct}%` }}
                title={`${anom.title} at ${anom.timestampFormatted}`}
              >
                {/* Ping wave */}
                <span className="absolute -inset-2 rounded-full bg-[#FF4D4D]/30 animate-ping pointer-events-none" />
                
                {/* Marker Button */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-transform group-hover:scale-125 ${
                    isSelected
                      ? 'bg-[#FF4D4D] border-white text-white shadow-[0_0_18px_rgba(255,77,77,0.9)]'
                      : 'bg-[#1C1215] border-[#FF4D4D] text-[#FF4D4D] shadow-[0_0_12px_rgba(255,77,77,0.5)]'
                  }`}
                >
                  <AlertTriangle className="w-3 h-3" />
                </div>

                {/* Floating Tag */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#0B0F19] border border-[#FF6B00]/70 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold text-[#FF6B00] whitespace-nowrap opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-[0_0_8px_rgba(255,107,0,0.3)]">
                  {anom.timestampFormatted}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Anomaly Quick Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {anomalies.map((anom) => {
          const isSelected = selectedAnomalyId === anom.id;
          return (
            <div
              key={anom.id}
              onClick={() => onSelectAnomaly(anom)}
              className={`p-3.5 rounded-lg border transition-all cursor-pointer group ${
                isSelected
                  ? 'bg-[#161F33] border-[#FF6B00] shadow-[0_0_20px_rgba(255,107,0,0.25)]'
                  : 'bg-[#0B0F19] border-[rgba(255,107,0,0.18)] hover:border-[#FF6B00]/60 hover:bg-[#161F33]/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono font-bold text-white group-hover:text-[#FF6B00] transition-colors">
                  {anom.title}
                </span>
                <Badge severity={anom.severity} size="xs">
                  {anom.severity}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                <span className="text-[#FF8A00] font-bold">@ {anom.timestampFormatted}</span>
                <span className="text-slate-400 group-hover:text-[#FF6B00] flex items-center">
                  VIEW <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
