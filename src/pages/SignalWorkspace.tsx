import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { SignalAnalysis } from '../types/signal';
import { SignalParameterCard } from '../components/signal/SignalParameterCard';
import { WaveformChart } from '../components/signal/WaveformChart';
import { FrequencySpectrum } from '../components/signal/FrequencySpectrum';
import { Spectrogram } from '../components/signal/Spectrogram';
import { LoadingState } from '../components/common/LoadingState';
import { Button } from '../components/common/Button';
import { Dna, AlertTriangle, BrainCircuit, FileText, Network, Activity } from 'lucide-react';

export const SignalWorkspace: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [signal, setSignal] = useState<SignalAnalysis | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const signalId = id || 'signal_042';

  useEffect(() => {
    async function loadSignal() {
      setLoading(true);
      try {
        const data = await api.getAnalysis(signalId);
        setSignal(data);
      } catch (err) {
        console.error('Failed to load signal data', err);
      } finally {
        setLoading(false);
      }
    }
    loadSignal();
  }, [signalId]);

  if (loading || !signal) {
    return <LoadingState title="SYNCHRONIZING WORKSPACE TELEMETRY" />;
  }

  return (
    <div className="space-y-6">
      {/* Top Parameter Card Header */}
      <SignalParameterCard signal={signal} />

      {/* Action Navigation Tabs / Shortcuts */}
      <div className="flex flex-wrap items-center gap-2.5 pb-3 border-b border-[#232F48]">
        <Button
          variant="secondary"
          size="xs"
          onClick={() => navigate(`/signal-dna/${signal.id}`)}
          leftIcon={<Dna className="w-3.5 h-3.5 text-[#FF6B00]" />}
        >
          SIGNAL DNA (94.2%)
        </Button>
        <Button
          variant="secondary"
          size="xs"
          onClick={() => navigate(`/anomalies/${signal.id}`)}
          leftIcon={<AlertTriangle className="w-3.5 h-3.5 text-[#FFB000]" />}
        >
          ANOMALIES ({signal.anomalies})
        </Button>
        <Button
          variant="secondary"
          size="xs"
          onClick={() => navigate(`/classification/${signal.id}`)}
          leftIcon={<BrainCircuit className="w-3.5 h-3.5 text-[#FF8A00]" />}
        >
          AI CLASSIFICATION ({signal.confidence}%)
        </Button>
        <Button
          variant="secondary"
          size="xs"
          onClick={() => navigate('/similarity')}
          leftIcon={<Network className="w-3.5 h-3.5 text-[#FFB000]" />}
        >
          SIMILARITY SEARCH
        </Button>
        <Button
          variant="primary"
          size="xs"
          onClick={() => navigate(`/reports/${signal.id}`)}
          leftIcon={<FileText className="w-3.5 h-3.5" />}
        >
          GENERATE REPORT
        </Button>
      </div>

      {/* 3 Core Interactive Charts Grid */}
      <div className="space-y-6">
        {/* Chart 1: Time Domain Waveform */}
        <WaveformChart showAnomalies={true} />

        {/* Chart 2 & 3: Side-by-side or stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FrequencySpectrum
            centerFrequency={signal.centerFrequency}
            bandwidth={signal.bandwidth}
          />
          <Spectrogram />
        </div>
      </div>
    </div>
  );
};
