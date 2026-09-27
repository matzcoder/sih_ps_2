import React from 'react';
import { BrainCircuit, CheckCircle2 } from 'lucide-react';
import { Badge } from '../common/Badge';

interface ClassificationCardProps {
  primaryClass?: string;
  confidence?: number;
  fusionScore?: number;
  modulation?: string;
}

export const ClassificationCard: React.FC<ClassificationCardProps> = ({
  primaryClass = 'CLASS A',
  confidence = 94.7,
  fusionScore = 93.7,
  modulation = 'QPSK / DSSS',
}) => {
  return (
    <div className="bg-gradient-to-b from-[#131B2D] to-[#0F1523] border border-[rgba(255,107,0,0.2)] rounded-xl p-6 tactical-brackets shadow-[0_8px_32px_-4px_rgba(0,0,0,0.7)]">
      {/* Top Tag */}
      <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,107,0,0.15)] mb-5">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-[#FF6B00]" />
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-100">
            NEURAL RF CLASSIFICATION VERDICT
          </h3>
        </div>
        <Badge variant="accent" showDot size="sm">
          FUSION LOCKED
        </Badge>
      </div>

      {/* Main Result Display */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-[#0B0F19] p-5 rounded-xl border border-[rgba(255,107,0,0.25)] shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <div>
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block">
            PREDICTED TRANSMITTER CLASS
          </span>
          <div className="text-3xl sm:text-4xl font-mono font-black text-[#FF6B00] glow-text-accent mt-1 tracking-tight">
            {primaryClass}
          </div>
          <p className="text-xs font-mono text-slate-300 mt-2">
            Tactical Frequency Hopping Spread Spectrum // Military Drone Uplink
          </p>
        </div>

        {/* Confidence Percentage Badge */}
        <div className="flex flex-col items-start sm:items-end bg-[#06080F] p-4 rounded-xl border border-[rgba(255,107,0,0.3)] min-w-[150px] shadow-[0_0_20px_rgba(255,107,0,0.15)]">
          <span className="text-[10px] font-mono text-slate-400">CONFIDENCE</span>
          <div className="text-3xl font-mono font-black text-white glow-text-amber">
            {confidence}%
          </div>
          <div className="mt-1 flex items-center gap-1 text-[10px] font-mono text-[#FF8A00] font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>HIGH CONVICTION</span>
          </div>
        </div>
      </div>

      {/* Fusion & Modulation Details */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 font-mono text-xs">
        <div className="bg-[#0B0F19] p-3 rounded-lg border border-[rgba(255,107,0,0.18)] hover:border-[#FF6B00]/40 transition-colors">
          <span className="text-[10px] text-slate-400 uppercase">ENSEMBLE FUSION</span>
          <div className="text-base font-bold text-[#FF8A00] mt-0.5">{fusionScore}%</div>
          <span className="text-[9px] text-slate-400">Multi-Model Weighted</span>
        </div>

        <div className="bg-[#0B0F19] p-3 rounded-lg border border-[rgba(255,107,0,0.18)] hover:border-[#FF6B00]/40 transition-colors">
          <span className="text-[10px] text-slate-400 uppercase">MODULATION FAMILY</span>
          <div className="text-base font-bold text-white mt-0.5">{modulation}</div>
          <span className="text-[9px] text-slate-400">Constellation Form</span>
        </div>

        <div className="bg-[#0B0F19] p-3 rounded-lg border border-[rgba(255,107,0,0.18)] col-span-2 sm:col-span-1 hover:border-[#FF6B00]/40 transition-colors">
          <span className="text-[10px] text-slate-400 uppercase">BAYESIAN UNCERTAINTY</span>
          <div className="text-base font-bold text-[#FF8A00] mt-0.5">± 0.8%</div>
          <span className="text-[9px] text-slate-400">Markov Chain Monte Carlo</span>
        </div>
      </div>
    </div>
  );
};
