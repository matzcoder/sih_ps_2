import React from 'react';
import { CheckCircle2, Loader2, Circle, Activity, Shield, Sparkles } from 'lucide-react';
import { PipelineStage } from '../../types/signal';

interface AnalysisPipelineProps {
  stages: PipelineStage[];
  currentStageIndex: number;
  overallProgress: number;
  fileName: string;
}

export const AnalysisPipeline: React.FC<AnalysisPipelineProps> = ({
  stages,
  currentStageIndex,
  overallProgress,
  fileName,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-gradient-to-b from-[#131B2D] to-[#0F1523] border border-[#FF6B00]/50 rounded-2xl p-6 sm:p-8 tactical-brackets shadow-[0_0_40px_rgba(255,107,0,0.25)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[rgba(255,107,0,0.2)] gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] animate-ping" />
            <h2 className="font-mono text-lg font-bold text-white uppercase tracking-wider">
              REAL-TIME DSP &amp; AI PIPELINE IN PROGRESS
            </h2>
          </div>
          <p className="font-mono text-xs text-slate-300 mt-1">
            TARGET: <span className="text-[#FF6B00] font-bold">{fileName}</span> // 8 STAGE DSP INFERENCE
          </p>
        </div>

        {/* Big Overall Percentage */}
        <div className="flex items-center gap-3 bg-[#161F33] px-4 py-2 rounded-xl border border-[rgba(255,107,0,0.4)] shadow-[0_0_15px_rgba(255,107,0,0.2)]">
          <div className="text-right">
            <div className="text-[10px] font-mono text-slate-400">TOTAL PROGRESS</div>
            <div className="text-2xl font-mono font-black text-[#FF6B00] glow-text-accent">
              {overallProgress}%
            </div>
          </div>
        </div>
      </div>

      {/* Main Progress Bar */}
      <div className="my-6">
        <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-2">
          <span className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#FF6B00]" />
            CURRENT STAGE: <span className="text-[#FF6B00] font-bold">{stages[currentStageIndex]?.name || 'PROCESSING'}</span>
          </span>
          <span className="text-slate-400 font-mono">
            STAGE {currentStageIndex + 1} / {stages.length}
          </span>
        </div>
        <div className="w-full bg-[#06080F] h-3.5 rounded-full overflow-hidden border border-[rgba(255,107,0,0.35)] p-0.5">
          <div
            className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#FFB000] h-full rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(255,107,0,0.8)]"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Stage Grid / Steps List */}
      <div className="space-y-3 font-mono text-xs">
        {stages.map((stage, idx) => {
          const isComplete = stage.status === 'COMPLETE';
          const isProcessing = stage.status === 'PROCESSING';
          const isPending = stage.status === 'PENDING';

          return (
            <div
              key={stage.id}
              className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                isProcessing
                  ? 'bg-[#161F33] border-[#FF6B00] shadow-[0_0_20px_rgba(255,107,0,0.3)]'
                  : isComplete
                  ? 'bg-[#0B0F19] border-[rgba(255,107,0,0.25)] text-slate-200'
                  : 'bg-[#0B0F19]/40 border-[rgba(255,107,0,0.1)] text-slate-500'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Stage Icon */}
                <div className="shrink-0">
                  {isComplete && <CheckCircle2 className="w-4 h-4 text-[#FF8A00]" />}
                  {isProcessing && <Loader2 className="w-4 h-4 text-[#FF6B00] animate-spin" />}
                  {isPending && <Circle className="w-4 h-4 text-slate-600" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400">0{idx + 1}.</span>
                    <span
                      className={`font-bold uppercase tracking-wider ${
                        isProcessing ? 'text-[#FF6B00]' : isComplete ? 'text-slate-100' : 'text-slate-400'
                      }`}
                    >
                      {stage.name}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{stage.description}</div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="text-right shrink-0">
                {isProcessing && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00] font-bold shadow-[0_0_10px_rgba(255,107,0,0.2)]">
                    <span>PROCESSING</span>
                    <span>{stage.progress}%</span>
                  </span>
                )}
                {isComplete && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#161F33] text-[#FF8A00] border border-[rgba(255,107,0,0.3)] font-semibold">
                    COMPLETE
                  </span>
                )}
                {isPending && (
                  <span className="px-2 py-0.5 text-slate-500 text-[10px]">
                    PENDING
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Technical Status */}
      <div className="mt-6 pt-4 border-t border-[rgba(255,107,0,0.2)] flex items-center justify-between text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-[#FF6B00]" />
          <span>DSP WORKER: THREAD #04 ACTIVE</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#FF8A00] font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ACCELERATED INFERENCE</span>
        </div>
      </div>
    </div>
  );
};
