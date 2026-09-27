import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SimilarSignal } from '../../types/signal';
import { ExternalLink, GitCompare } from 'lucide-react';

interface SimilarSignalCardProps {
  signal: SimilarSignal;
  isSelected?: boolean;
  onSelect?: (signal: SimilarSignal) => void;
}

export const SimilarSignalCard: React.FC<SimilarSignalCardProps> = ({
  signal,
  isSelected = false,
  onSelect,
}) => {
  const navigate = useNavigate();

  // Split title if formatted as "Signal #184 (coastal_radar_burst.iq)"
  const titleMatch = signal.name.match(/^(Signal\s+#\d+)\s*\((.+)\)$/);
  const primaryTitle = titleMatch ? titleMatch[1] : signal.name;
  const fileSubtitle = titleMatch ? `(${titleMatch[2]})` : '';

  return (
    <div
      onClick={() => onSelect && onSelect(signal)}
      className={`relative p-5 rounded-xl transition-all duration-200 cursor-pointer flex flex-col justify-between ${
        isSelected
          ? 'bg-[#0B101D] border-2 border-[#FF6B00] shadow-[0_0_25px_rgba(255,107,0,0.22)] tactical-brackets'
          : 'bg-[#0B101D] border border-[#232F48] hover:border-[#FF6B00]/60 hover:shadow-[0_4px_25px_rgba(0,0,0,0.7)]'
      }`}
    >
      <div>
        {/* Header: Title + File Name + Badges + Similarity Score */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#232F48]/80 mb-3">
          <div className="min-w-0 flex-1">
            <h4 className="font-mono text-base font-bold text-white tracking-wide truncate">
              {primaryTitle}
            </h4>
            {fileSubtitle && (
              <div className="font-mono text-xs font-bold text-slate-200 tracking-tight mt-0.5 truncate">
                {fileSubtitle}
              </div>
            )}
            <p className="text-[10px] font-mono text-slate-400 mt-1 leading-tight">
              ID: {signal.signalId} // RECORDED: {signal.timestamp}
            </p>
          </div>

          {/* Right Badges & Similarity Score */}
          <div className="flex items-center gap-2.5 shrink-0 pt-0.5">
            {/* .IQ / .WAV Badge */}
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[#FF6B00]/10 border border-[#FF6B00]/50 text-[#FF8A00] shadow-sm">
              .{signal.fileType}
            </span>

            {/* Similarity Score */}
            <div className="text-right min-w-[70px]">
              <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-semibold block leading-none">
                SIMILARITY
              </span>
              <span className="text-xl font-mono font-black text-[#FF6B00] leading-tight block mt-0.5 drop-shadow-[0_0_8px_rgba(255,107,0,0.4)]">
                {signal.similarityScore.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* 3 Metric Tiles (Bandwidth, SNR, Modulation) */}
        <div className="grid grid-cols-3 gap-2 font-mono text-xs mb-3.5">
          <div className="bg-[#070B14] p-2.5 rounded-lg border border-[#1A2338]">
            <span className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold block">
              BANDWIDTH
            </span>
            <span className="font-bold text-white text-xs block mt-1">
              {signal.bandwidth}
            </span>
          </div>

          <div className="bg-[#070B14] p-2.5 rounded-lg border border-[#1A2338]">
            <span className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold block">
              SNR
            </span>
            <span className="font-bold text-[#FF8A00] text-xs block mt-1">
              {signal.snr.toFixed(1)} dB
            </span>
          </div>

          <div className="bg-[#070B14] p-2.5 rounded-lg border border-[#1A2338]">
            <span className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold block">
              MODULATION
            </span>
            <span className="font-bold text-slate-200 text-xs block mt-1 truncate" title={signal.modulation}>
              {signal.modulation}
            </span>
          </div>
        </div>

        {/* Correlated Signature Features */}
        <div className="mb-4">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold block mb-2">
            CORRELATED SIGNATURE FEATURES:
          </span>
          <div className="flex flex-wrap gap-1.5 min-h-[52px] content-start">
            {signal.sharedFeatures.map((feat, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-full bg-[#070B14] border border-[#1E293B] hover:border-[#FF6B00]/40 text-[10px] font-mono font-medium text-slate-300 transition-colors"
              >
                {feat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex items-center gap-2 pt-2 border-t border-[#232F48]/40">
        {onSelect && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(signal);
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-mono font-bold uppercase tracking-wider transition-all ${
              isSelected
                ? 'bg-[#FF6B00] hover:bg-[#FF8A00] text-white shadow-[0_0_15px_rgba(255,107,0,0.4)]'
                : 'bg-transparent border border-[#FF6B00] text-[#FF8A00] hover:bg-[#FF6B00] hover:text-white'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>{isSelected ? 'SELECTED FOR DIFF' : 'COMPARE PROFILE'}</span>
          </button>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/workspace/${signal.signalId}`);
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-mono font-bold text-slate-300 hover:text-white hover:bg-[#162035] transition-colors"
        >
          <span>OPEN</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
