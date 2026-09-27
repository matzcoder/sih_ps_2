import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { SignalAnalysis, SignalParameters, SignalDNAMetric } from '../types/signal';
import { SignalDNA } from '../components/signal/SignalDNA';
import { LoadingState } from '../components/common/LoadingState';
import { Button } from '../components/common/Button';
import { Dna, ArrowLeft, BrainCircuit, Download, ShieldCheck } from 'lucide-react';
import { Toast } from '../components/common/Toast';

export const SignalDNAPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [signal, setSignal] = useState<SignalAnalysis | null>(null);
  const [dnaData, setDnaData] = useState<{ parameters: SignalParameters; metrics: SignalDNAMetric[] } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [toast, setToast] = useState<{ type: 'success' | 'info'; title: string; message: string } | null>(null);

  const signalId = id || 'signal_042';

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [sig, dna] = await Promise.all([
          api.getAnalysis(signalId),
          api.getSignalDNA(signalId),
        ]);
        setSignal(sig);
        setDnaData(dna);
      } catch (err) {
        console.error('Failed to load Signal DNA data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [signalId]);

  if (loading || !signal || !dnaData) {
    return <LoadingState title="SYNTHESIZING 7D SIGNAL BIOMETRIC MANIFOLD" />;
  }

  const handleExportDNA = () => {
    const payload = JSON.stringify({ signalId, ...dnaData }, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SIGNAL_DNA_${signal.fileName}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setToast({
      type: 'success',
      title: 'DNA SIGNATURE EXPORTED',
      message: `Downloaded 7-dimensional biometric JSON descriptor for ${signal.fileName}.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toast && (
        <Toast
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#232F48] gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="xs"
            onClick={() => navigate(`/workspace/${signal.id}`)}
            leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
          >
            WORKSPACE
          </Button>
          <div className="h-4 w-px bg-[#232F48] hidden sm:block" />
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center">
                <Dna className="w-4 h-4 text-[#FF6B00] animate-pulse" />
              </div>
              <h1 className="font-mono text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
                SIGNAL DNA // {signal.fileName}
              </h1>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-0.5">
              Deterministic RF biometric characterization across 7 orthogonal mathematical dimensions.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportDNA}
            leftIcon={<Download className="w-4 h-4" />}
          >
            EXPORT DNA VECTOR
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/classification/${signal.id}`)}
            rightIcon={<BrainCircuit className="w-4 h-4" />}
          >
            CLASSIFY SIGNATURE
          </Button>
        </div>
      </div>

      {/* Main Signal DNA Visualizer & Parameter Cards */}
      <SignalDNA
        metrics={dnaData.metrics}
        parameters={dnaData.parameters}
        score={dnaData.parameters.dnaScore}
      />

      {/* Detailed Dimension Explanations */}
      <div className="bg-[#0F1523]/80 border border-[#232F48] rounded-xl p-5 tactical-brackets font-mono backdrop-blur-md shadow-lg">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2 pb-2.5 border-b border-[#232F48]">
          <ShieldCheck className="w-4 h-4 text-[#FF6B00]" />
          7-DIMENSIONAL RF BIOMETRIC METHODOLOGY
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
          {dnaData.metrics.map((m) => (
            <div key={m.dimension} className="p-3.5 bg-[#161F33]/70 rounded-lg border border-[#232F48] hover:border-[#FF6B00]/40 transition-colors">
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-bold text-[#FF8A00] tracking-wide">{m.dimension}</span>
                <span className="text-white font-bold bg-[#FF6B00]/10 px-2 py-0.5 rounded text-[11px] border border-[#FF6B00]/30">{m.value}%</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                {m.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
