import React from 'react';
import { ExplainableEvidence } from '../../types/signal';
import { explainableEvidenceList } from '../../services/api';
import { Check, AlertTriangle, HelpCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { Badge } from '../common/Badge';

interface ExplainableAIProps {
  evidence?: ExplainableEvidence[];
  explanation?: string;
}

export const ExplainableAI: React.FC<ExplainableAIProps> = ({
  evidence = explainableEvidenceList,
  explanation = 'The AI model reached this decision primarily because the signal exhibits a textbook sinc-squared Power Spectral Density profile with an occupied bandwidth of 2.04 MHz, consistent with tactical DSSS/FHSS military transceivers. 4-quadrant constellation analysis confirms QPSK symbol mapping with Error Vector Magnitude below 4.2%, overcoming isolated noise fluctuations recorded at T=28.9s.',
}) => {
  const supporting = evidence.filter((e) => e.isSupporting);
  const contradicting = evidence.filter((e) => !e.isSupporting);

  return (
    <div className="bg-gradient-to-b from-[#131B2D] to-[#0F1523] border border-[rgba(255,107,0,0.2)] rounded-xl p-5 sm:p-6 tactical-brackets shadow-[0_8px_32px_-4px_rgba(0,0,0,0.7)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[rgba(255,107,0,0.15)] gap-3 mb-5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#FF6B00]" />
          <div>
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-slate-100">
              WHY DID THE AI REACH THIS CONCLUSION?
            </h3>
            <p className="text-xs font-mono text-slate-400">
              SHAP / INTEGRATED GRADIENT FEATURE ATTRIBUTION &amp; EVIDENCE MATRIX
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-[#FF6B00] bg-[#161F33] px-3 py-1 rounded-lg border border-[#FF6B00]/40 shadow-[0_0_12px_rgba(255,107,0,0.2)]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>VERIFIED ATTRIBUTION</span>
        </div>
      </div>

      {/* Narrative Synthesis */}
      <div className="p-4 rounded-xl bg-[#06080F] border border-[rgba(255,107,0,0.2)] font-mono text-xs text-slate-200 leading-relaxed mb-6">
        <div className="text-[10px] text-[#FF6B00] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5" />
          DECISION REASONING SUMMARY
        </div>
        <p className="text-slate-300 leading-relaxed">{explanation}</p>
      </div>

      {/* Supporting Evidence List */}
      <div className="space-y-4 font-mono text-xs">
        <div>
          <span className="text-[11px] font-bold text-[#FF8A00] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Check className="w-4 h-4 text-[#FF6B00] stroke-[3]" />
            SUPPORTING EVIDENCE (HIGH WEIGHT ATTRIBUTION)
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {supporting.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-lg bg-[#0B0F19] border border-[rgba(255,107,0,0.18)] hover:border-[#FF6B00]/60 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#FF6B00]/20 text-[#FF6B00] flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </span>
                    <span className="font-bold text-white text-xs">{item.title}</span>
                  </div>
                  <Badge variant="accent" size="xs">
                    {item.featureWeight}% WT
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-400 pl-6 leading-normal">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contradicting Evidence */}
        {contradicting.length > 0 && (
          <div className="pt-2">
            <span className="text-[11px] font-bold text-[#F59E0B] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
              CONTRADICTING / DEVIATING EVIDENCE
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {contradicting.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-lg bg-[#0B0F19] border border-[#F59E0B]/40 hover:border-[#F59E0B] transition-colors warning-brackets"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#F59E0B]/20 text-[#F59E0B] flex items-center justify-center text-[10px] font-bold">
                        ⚠
                      </span>
                      <span className="font-bold text-[#F59E0B] text-xs">{item.title}</span>
                    </div>
                    <Badge variant="warning" size="xs">
                      {item.featureWeight}% WT
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-400 pl-6 leading-normal">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
