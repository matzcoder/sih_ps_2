import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { SignalAnalysis, SystemMetrics } from '../types/signal';
import { MetricCard } from '../components/dashboard/MetricCard';
import { RecentAnalysisTable } from '../components/dashboard/RecentAnalysisTable';
import { SystemStatus } from '../components/dashboard/SystemStatus';
import { Button } from '../components/common/Button';
import { LoadingState } from '../components/common/LoadingState';
import {
  Radio,
  AlertTriangle,
  BrainCircuit,
  Activity,
  PlusCircle,
  History,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [signals, setSignals] = useState<SignalAnalysis[]>([]);
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [recent, sysMetrics] = await Promise.all([
          api.getHistory(),
          api.getSystemMetrics(),
        ]);
        setSignals(recent);
        setMetrics(sysMetrics);
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !metrics) {
    return <LoadingState title="INITIALIZING COMMAND CENTER TELEMETRY" />;
  }

  return (
    <div className="space-y-6">
      {/* Page Title & Mission Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(255,107,0,0.18)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] animate-pulse shadow-[0_0_8px_#FF6B00]" />
            <h1 className="font-mono text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
              SIGNAL INTELLIGENCE DASHBOARD
            </h1>
          </div>
          <p className="text-xs font-mono text-slate-300 mt-1">
            Real-time telemetry ingestion, feature extraction, and neural classification monitor.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/history')}
            leftIcon={<History className="w-4 h-4" />}
          >
            HISTORY
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/analyze')}
            leftIcon={<PlusCircle className="w-4 h-4 text-[#080B12]" />}
            className="shadow-[0_0_20px_rgba(255,107,0,0.45)]"
          >
            ANALYZE SIGNAL
          </Button>
        </div>
      </div>

      {/* Primary Metrics 4-Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Signals Analyzed */}
        <MetricCard
          label="SIGNALS ANALYZED"
          value="1,284"
          subtext="Total IQ / WAV Ingested"
          change="+14.2% this week"
          isPositive={true}
          icon={Radio}
        />

        {/* Metric 2: Anomalies Detected */}
        <MetricCard
          label="ANOMALIES DETECTED"
          value="87"
          subtext="6.8% Detection Rate"
          change="3 critical flags"
          isPositive={false}
          icon={AlertTriangle}
          isWarning={true}
        />

        {/* Metric 3: Classification Confidence */}
        <MetricCard
          label="CLASSIFICATION CONFIDENCE"
          value="94.7%"
          subtext="Softmax Fusion Mean"
          change="High Conviction"
          isPositive={true}
          icon={BrainCircuit}
        />

        {/* Metric 4: Average SNR */}
        <MetricCard
          label="AVERAGE SNR"
          value="18.6 dB"
          subtext="Noise Floor -78 dBm"
          change="Optimal Demodulation"
          isPositive={true}
          icon={Activity}
        />
      </div>

      {/* DSP and Hardware Telemetry Strip */}
      <SystemStatus metrics={metrics} />

      {/* Recent Signals Ingestion Table */}
      <RecentAnalysisTable signals={signals} />
    </div>
  );
};
