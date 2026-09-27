import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Radio,
  Activity,
  Dna,
  AlertTriangle,
  BrainCircuit,
  HelpCircle,
  Network,
  FileText,
  ArrowRight,
  FileCode,
  FileAudio,
  CheckCircle2,
  Terminal,
  Zap,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { mockWaveformPreview } from '../data/mockWaveform';
import { ResponsiveContainer, LineChart, Line } from 'recharts';

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [pulse, setPulse] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulse((p) => (p + 1) % 100);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const featureCards = [
    {
      title: 'IQ ANALYSIS',
      desc: 'High-speed ingestion of dual-channel In-Phase and Quadrature complex binary streams.',
      icon: FileCode,
      tag: 'RAW ADC',
    },
    {
      title: 'WAV ANALYSIS',
      desc: 'Acoustic RF demodulation and audio frequency baseline feature extraction.',
      icon: FileAudio,
      tag: 'BASEBAND',
    },
    {
      title: 'SIGNAL DNA',
      desc: 'Multi-dimensional biometric fingerprinting mapping temporal, spectral and modulation metrics.',
      icon: Dna,
      tag: '7D BIOMETRIC',
    },
    {
      title: 'ANOMALY DETECTION',
      desc: 'Millisecond-precision localization of LO drift, spectral regrowth, and deep signal nulls.',
      icon: AlertTriangle,
      tag: 'REAL-TIME',
      isWarning: true,
    },
    {
      title: 'AI CLASSIFICATION',
      desc: 'Deep 1D-CNN and Ensemble tree models delivering high-confidence military transmitter typing.',
      icon: BrainCircuit,
      tag: 'ENSEMBLE AI',
    },
    {
      title: 'EXPLAINABLE AI',
      desc: 'Transparent SHAP and Integrated Gradient attribution highlighting decision rationale.',
      icon: HelpCircle,
      tag: 'INTERPRETABLE',
    },
    {
      title: 'SIMILARITY SEARCH',
      desc: 'High-dimensional vector embedding nearest-neighbor topology and cluster analysis.',
      icon: Network,
      tag: 'KNN / COSINE',
    },
    {
      title: 'AUTO REPORTS',
      desc: 'Instant generation of mission-ready intelligence dossiers, JSON payloads and PDF reports.',
      icon: FileText,
      tag: 'EXPORT READY',
    },
  ];

  return (
    <div className="min-h-screen bg-[#080B12] text-slate-100 bg-grid-tactical selection:bg-[#FF6B00] selection:text-[#080B12] flex flex-col relative overflow-hidden">
      {/* Top Ambient Glow Orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#FF6B00]/15 via-[#FF8A00]/5 to-transparent blur-3xl pointer-events-none" />

      {/* Top Navigation Bar */}
      <header className="h-18 px-6 lg:px-12 border-b border-[rgba(255,107,0,0.18)] bg-[#04060A]/90 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B00] to-[#FF8A00] flex items-center justify-center text-[#080B12] shadow-[0_0_20px_rgba(255,107,0,0.5)]">
            <Radio className="w-5 h-5 font-black" />
          </div>
          <div>
            <span className="font-mono text-xl font-black tracking-widest text-white">
              SIGNAL<span className="text-[#FF6B00]">-X</span>
            </span>
            <div className="text-[10px] font-mono tracking-widest text-slate-400">
              AI-POWERED SIGNAL INTELLIGENCE
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="hidden sm:inline-flex"
          >
            COMMAND CENTER
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/analyze')}
            rightIcon={<ArrowRight className="w-4 h-4 text-[#080B12]" />}
            className="shadow-[0_0_20px_rgba(255,107,0,0.45)]"
          >
            ANALYZE SIGNAL
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 lg:px-12 pt-16 pb-20 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 z-10">
        {/* Left Headline & Pitch */}
        <div className="flex-1 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161F33] border border-[rgba(255,107,0,0.35)] text-xs font-mono text-[#FF8A00] shadow-[0_0_15px_rgba(255,107,0,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-ping" />
            <span>SMART INDIA HACKATHON // ACTIVE RF SENSORS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-mono font-black text-white tracking-tight leading-[1.1]">
            TURN RAW SIGNALS INTO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#FFB000] glow-text-accent">INTELLIGENCE.</span>
          </h1>

          <p className="text-slate-300 font-mono text-sm sm:text-base max-w-xl leading-relaxed">
            Automated analysis of .IQ and .WAV recordings with intelligent parameter extraction, anomaly detection, AI classification and explainable signal intelligence.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/analyze')}
              leftIcon={<Activity className="w-5 h-5 text-[#080B12]" />}
              className="shadow-[0_0_30px_rgba(255,107,0,0.5)]"
            >
              ANALYZE A SIGNAL
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/workspace/signal_042')}
              leftIcon={<Terminal className="w-5 h-5 text-[#FF6B00]" />}
            >
              EXPLORE DEMO
            </Button>
          </div>

          {/* Verification tags */}
          <div className="pt-6 border-t border-[rgba(255,107,0,0.18)] flex flex-wrap items-center gap-6 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF6B00]" />
              <span>.IQ &amp; .WAV COMPATIBLE</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF6B00]" />
              <span>94.7% AI CONVICTION</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF6B00]" />
              <span>SUB-MILLISECOND ANOMALIES</span>
            </div>
          </div>
        </div>

        {/* Right Hero Visualization (Interactive RF Workstation Preview) */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none">
          <div className="bg-gradient-to-b from-[#131B2D] to-[#0F1523] border border-[#FF6B00]/50 rounded-2xl p-6 tactical-brackets shadow-[0_0_50px_rgba(255,107,0,0.25)] relative overflow-hidden">
            {/* Scanline overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(255,107,0,0.08)] to-transparent h-16 w-full animate-scan pointer-events-none" />

            {/* Simulated Workstation Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(255,107,0,0.2)] mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] animate-pulse" />
                <span className="font-mono text-xs font-bold text-white uppercase">
                  ACTIVE SCANNER // SIGNAL_042.IQ
                </span>
              </div>
              <Badge variant="accent" size="xs">
                20 MSPS // LIVE
              </Badge>
            </div>

            {/* Mini Waveform Display */}
            <div className="h-32 w-full bg-[#06080F] rounded-lg border border-[rgba(255,107,0,0.18)] p-2 mb-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockWaveformPreview}>
                  <Line
                    type="monotone"
                    dataKey="inPhase"
                    stroke="#FF6B00"
                    strokeWidth={1.8}
                    dot={false}
                    isAnimationActive={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="quadrature"
                    stroke="#FFB000"
                    strokeWidth={1.3}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Mini Spectrogram & Metrics Strip */}
            <div className="grid grid-cols-3 gap-2 font-mono text-xs">
              <div className="bg-[#0B0F19] p-2.5 rounded-lg border border-[rgba(255,107,0,0.15)]">
                <span className="text-[9px] text-slate-400 block">BANDWIDTH</span>
                <span className="font-bold text-white text-xs">2.04 MHz</span>
              </div>
              <div className="bg-[#0B0F19] p-2.5 rounded-lg border border-[rgba(255,107,0,0.15)]">
                <span className="text-[9px] text-slate-400 block">SNR</span>
                <span className="font-bold text-[#FF8A00] text-xs">18.7 dB</span>
              </div>
              <div className="bg-[#0B0F19] p-2.5 rounded-lg border border-[#F59E0B]/40">
                <span className="text-[9px] text-slate-400 block">ANOMALIES</span>
                <span className="font-bold text-[#F59E0B] text-xs">3 DETECTED</span>
              </div>
            </div>

            {/* AI Verdict Bar */}
            <div className="mt-3 p-2.5 rounded-xl bg-[#06080F] border border-[#FF6B00]/40 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-[#FF6B00]" />
                <span className="text-white font-bold">CLASS A (TACTICAL FHSS)</span>
              </div>
              <span className="text-[#FF6B00] font-bold">94.7% CONF</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="px-6 lg:px-12 py-16 bg-[#04060A]/80 border-t border-[rgba(255,107,0,0.18)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase tracking-wider">
              END-TO-END SIGNAL INTELLIGENCE PIPELINE
            </h2>
            <p className="text-xs font-mono text-slate-400 mt-2">
              From raw electromagnetic capture to automated neural inference and explainable mission dossiers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featureCards.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className={`bg-gradient-to-b from-[#131B2D] to-[#0F1523] p-6 rounded-xl border transition-all duration-200 hover:-translate-y-1 ${
                    feat.isWarning
                      ? 'border-[#F59E0B]/40 hover:border-[#F59E0B] warning-brackets shadow-[0_8px_32px_-4px_rgba(0,0,0,0.7),0_0_15px_rgba(245,158,11,0.15)]'
                      : 'border-[rgba(255,107,0,0.2)] hover:border-[#FF6B00] tactical-brackets shadow-[0_8px_32px_-4px_rgba(0,0,0,0.7),0_0_15px_rgba(255,107,0,0.15)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-lg ${
                      feat.isWarning
                        ? 'bg-[#1C1822] border border-[#F59E0B]/50 text-[#F59E0B]'
                        : 'bg-[#161F33] border border-[#FF6B00]/40 text-[#FF6B00]'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant={feat.isWarning ? 'warning' : 'accent'} size="xs">
                      {feat.tag}
                    </Badge>
                  </div>

                  <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wide mb-2">
                    {feat.title}
                  </h3>
                  <p className="font-mono text-xs text-slate-300 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to action footer */}
      <section className="px-6 lg:px-12 py-16 text-center bg-[#080B12] border-t border-[rgba(255,107,0,0.18)]">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-mono font-bold text-white uppercase tracking-wider">
            READY TO RUN SIGNAL RECONNAISSANCE?
          </h2>
          <p className="font-mono text-xs text-slate-300">
            Select or drag your .IQ / .WAV files to initiate automated feature extraction, biometric DNA synthesis and AI classification.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/analyze')}
              rightIcon={<ArrowRight className="w-4 h-4 text-[#080B12]" />}
              className="shadow-[0_0_25px_rgba(255,107,0,0.5)]"
            >
              LAUNCH INGEST PIPELINE
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
