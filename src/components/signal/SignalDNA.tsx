import React from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from 'recharts';
import { SignalDNAMetric, SignalParameters } from '../../types/signal';
import { defaultDnaMetrics, defaultSignalParameters } from '../../data/mockSignals';
import { Dna, ShieldCheck, Sparkles, Activity } from 'lucide-react';

interface SignalDNAProps {
  metrics?: SignalDNAMetric[];
  parameters?: SignalParameters;
  score?: number;
}

export const SignalDNA: React.FC<SignalDNAProps> = ({
  metrics = defaultDnaMetrics,
  parameters = defaultSignalParameters,
  score = 94.2,
}) => {
  return (
    <div className="bg-gradient-to-b from-[#131B2D] to-[#0F1523] border border-[rgba(255,107,0,0.2)] rounded-xl p-5 sm:p-6 tactical-brackets shadow-[0_8px_32px_-4px_rgba(0,0,0,0.7)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[rgba(255,107,0,0.15)] gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[#161F33] border border-[#FF6B00] text-[#FF6B00] shadow-[0_0_15px_rgba(255,107,0,0.3)]">
            <Dna className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-slate-100">
              SIGNAL DNA BIOMETRIC FINGERPRINT
            </h3>
            <p className="text-xs font-mono text-slate-400">
              7-DIMENSIONAL RF MANIFOLD // HIGH-FIDELITY SIGNATURE
            </p>
          </div>
        </div>

        {/* Big Overall DNA Match Score */}
        <div className="flex items-center gap-3 bg-[#161F33] px-4 py-2.5 rounded-xl border border-[#FF6B00]/50 shadow-[0_0_20px_rgba(255,107,0,0.25)]">
          <div>
            <div className="text-[10px] font-mono text-slate-400">DNA FIDELITY SCORE</div>
            <div className="text-2xl font-mono font-black text-[#FF6B00] glow-text-accent">
              {score}%
            </div>
          </div>
          <ShieldCheck className="w-6 h-6 text-[#FF6B00]" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Radar Chart */}
        <div className="lg:col-span-6 h-[320px] bg-[#06080F] rounded-lg border border-[rgba(255,107,0,0.18)] p-2 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={metrics}>
              <PolarGrid stroke="rgba(255, 107, 0, 0.15)" strokeDasharray="3 3" />
              <PolarAngleAxis
                dataKey="dimension"
                stroke="#FF8A00"
                fontSize={11}
                fontFamily="JetBrains Mono, monospace"
                tick={{ fill: '#FF8A00', fontWeight: 600 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                stroke="#64748B"
                fontSize={9}
                fontFamily="JetBrains Mono, monospace"
                tick={{ fill: '#64748B' }}
              />
              <Radar
                name="Signal DNA"
                dataKey="value"
                stroke="#FF6B00"
                strokeWidth={2}
                fill="#FF6B00"
                fillOpacity={0.4}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F1523',
                  borderColor: '#FF6B00',
                  borderRadius: '8px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '11px',
                  color: '#F8FAFC',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.8), 0 0 15px rgba(255,107,0,0.25)',
                }}
                formatter={(val: any) => [`${val}%`, 'Dimension Score']}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Extracted Parameter Cards Grid */}
        <div className="lg:col-span-6 space-y-3 font-mono">
          <div className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            EXTRACTED BIOMETRIC PARAMETERS
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-[#0B0F19] p-3 rounded-lg border border-[rgba(255,107,0,0.18)] hover:border-[#FF6B00]/40 transition-colors">
              <span className="text-[10px] text-slate-400 uppercase">RMS</span>
              <div className="text-lg font-bold text-white mt-0.5">{parameters.rms}</div>
              <span className="text-[9px] text-[#FF8A00] font-semibold">Normalized</span>
            </div>

            <div className="bg-[#0B0F19] p-3 rounded-lg border border-[rgba(255,107,0,0.18)] hover:border-[#FF6B00]/40 transition-colors">
              <span className="text-[10px] text-slate-400 uppercase">PEAK AMPLITUDE</span>
              <div className="text-lg font-bold text-white mt-0.5">{parameters.peakAmplitude}</div>
              <span className="text-[9px] text-[#FF8A00] font-semibold">Max Envelope</span>
            </div>

            <div className="bg-[#0B0F19] p-3 rounded-lg border border-[rgba(255,107,0,0.18)] hover:border-[#FF6B00]/40 transition-colors">
              <span className="text-[10px] text-slate-400 uppercase">SPECTRAL ENTROPY</span>
              <div className="text-lg font-bold text-white mt-0.5">{parameters.spectralEntropy}</div>
              <span className="text-[9px] text-slate-400">Wiener Measure</span>
            </div>

            <div className="bg-[#0B0F19] p-3 rounded-lg border border-[rgba(255,107,0,0.18)] hover:border-[#FF6B00]/40 transition-colors">
              <span className="text-[10px] text-slate-400 uppercase">DOMINANT FREQ</span>
              <div className="text-base font-bold text-white mt-0.5">{parameters.dominantFrequency}</div>
              <span className="text-[9px] text-[#FF8A00] font-semibold">Carrier Peak</span>
            </div>

            <div className="bg-[#0B0F19] p-3 rounded-lg border border-[rgba(255,107,0,0.18)] hover:border-[#FF6B00]/40 transition-colors">
              <span className="text-[10px] text-slate-400 uppercase">BANDWIDTH (OBW)</span>
              <div className="text-base font-bold text-white mt-0.5">{parameters.bandwidth}</div>
              <span className="text-[9px] text-[#FF8A00] font-semibold">99% Energy</span>
            </div>

            <div className="bg-[#0B0F19] p-3 rounded-lg border border-[rgba(255,107,0,0.18)] hover:border-[#FF6B00]/40 transition-colors">
              <span className="text-[10px] text-slate-400 uppercase">CREST FACTOR</span>
              <div className="text-lg font-bold text-white mt-0.5">{parameters.crestFactor}</div>
              <span className="text-[9px] text-slate-400">PAPR Ratio</span>
            </div>
          </div>

          {/* Biometrics Summary Note */}
          <div className="p-3.5 rounded-lg bg-[#04060A] border border-[rgba(255,107,0,0.25)] text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
            <div>
              <span className="text-[#FF6B00] font-bold">DNA Synthesis:</span> Unique signature verified against reference dataset with 94.2% deterministic affinity to tactical spread spectrum transmitters.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
