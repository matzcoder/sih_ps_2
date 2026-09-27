import React from 'react';
import { ModelConsensusItem } from '../../types/signal';
import { modelConsensusList } from '../../services/api';
import { Cpu, CheckCircle2, ShieldCheck, Network } from 'lucide-react';

interface ModelConsensusProps {
  consensus?: ModelConsensusItem[];
  fusionScore?: number;
}

export const ModelConsensus: React.FC<ModelConsensusProps> = ({
  consensus = modelConsensusList,
  fusionScore = 93.7,
}) => {
  return (
    <div className="bg-gradient-to-b from-[#131B2D] to-[#0F1523] border border-[rgba(255,107,0,0.2)] rounded-xl p-5 tactical-brackets shadow-[0_8px_32px_-4px_rgba(0,0,0,0.7)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,107,0,0.15)] mb-4">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-[#FF6B00]" />
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-100">
            MULTI-MODEL ARCHITECTURE CONSENSUS
          </h3>
        </div>
        <div className="text-[10px] font-mono text-[#FF8A00] flex items-center gap-1 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#FF6B00]" />
          <span>3 / 3 CONCURRENCE</span>
        </div>
      </div>

      {/* Model Cards Grid */}
      <div className="space-y-3 font-mono text-xs">
        {consensus.map((model) => (
          <div
            key={model.modelName}
            className="p-3.5 rounded-lg bg-[#0B0F19] border border-[rgba(255,107,0,0.18)] flex items-center justify-between hover:border-[#FF6B00]/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-[#06080F] text-[#FF6B00] border border-[rgba(255,107,0,0.25)]">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white uppercase">{model.modelName}</div>
                <div className="text-[10px] text-slate-400">{model.architecture}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-right">
              <div>
                <span className="text-[10px] text-slate-400 block">PREDICTION</span>
                <span className="font-bold text-[#FF6B00]">{model.prediction}</span>
              </div>
              <div className="bg-[#06080F] px-3 py-1.5 rounded-lg border border-[rgba(255,107,0,0.25)] min-w-[70px]">
                <div className="text-[10px] text-slate-400">SCORE</div>
                <div className="font-bold text-white">{model.confidence}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fusion Result Banner */}
      <div className="mt-4 p-3.5 rounded-xl bg-[#06080F] border border-[#FF6B00]/60 flex items-center justify-between font-mono shadow-[0_0_20px_rgba(255,107,0,0.15)]">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#FF6B00]" />
          <div>
            <span className="text-xs font-bold text-white">BAYESIAN FUSION DECISION: </span>
            <span className="text-xs font-bold text-[#FF6B00]">CLASS A (TACTICAL)</span>
          </div>
        </div>
        <div className="text-xs font-bold text-[#FF6B00] bg-[#161F33] px-2.5 py-1 rounded-lg border border-[#FF6B00]/40">
          {fusionScore}% FUSED
        </div>
      </div>
    </div>
  );
};
