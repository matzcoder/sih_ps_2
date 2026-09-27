import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { AnomalyEvent, SignalAnalysis } from '../types/signal';
import { SignalTimeline } from '../components/signal/SignalTimeline';
import { AnomalyCard } from '../components/anomaly/AnomalyCard';
import { AnomalyModal } from '../components/anomaly/AnomalyModal';
import { LoadingState } from '../components/common/LoadingState';
import { Button } from '../components/common/Button';
import { Toast } from '../components/common/Toast';
import { AlertTriangle, ArrowLeft, ShieldAlert, Download } from 'lucide-react';

export const AnomaliesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [signal, setSignal] = useState<SignalAnalysis | null>(null);
  const [anomalies, setAnomalies] = useState<AnomalyEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAnomaly, setSelectedAnomaly] = useState<AnomalyEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<{ type: 'success' | 'warning' | 'info'; title: string; message: string } | null>(null);

  const signalId = id || 'signal_042';

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [sig, anoms] = await Promise.all([
          api.getAnalysis(signalId),
          api.getAnomalies(signalId),
        ]);
        setSignal(sig);
        setAnomalies(anoms);
      } catch (err) {
        console.error('Failed to load anomalies', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [signalId]);

  if (loading || !signal) {
    return <LoadingState title="SCANNING FOR TRANSIENT ANOMALIES &amp; RF OUTLIERS" />;
  }

  const handleOpenEventModal = (anom: AnomalyEvent) => {
    setSelectedAnomaly(anom);
    setIsModalOpen(true);
  };

  const handleExportAllAnomalies = () => {
    const payload = JSON.stringify({ signalId: signal.id, anomalies }, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ANOMALIES_${signal.fileName}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setToast({
      type: 'success',
      title: 'ANOMALY LOG EXPORTED',
      message: `Exported ${anomalies.length} anomaly event signatures for ${signal.fileName}.`,
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
              <div className="w-7 h-7 rounded-lg bg-[#FFB000]/10 border border-[#FFB000]/30 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-[#FFB000] animate-bounce" />
              </div>
              <h1 className="font-mono text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
                ANOMALY EVENT LOG // {signal.fileName}
              </h1>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-0.5">
              Temporal localization of carrier shifts, spectral regrowth bursts, and signal dropouts.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportAllAnomalies}
            leftIcon={<Download className="w-4 h-4" />}
          >
            EXPORT ANOMALY LOG
          </Button>
        </div>
      </div>

      {/* Interactive Timeline with exact markers */}
      <SignalTimeline
        duration={signal.duration}
        anomalies={anomalies}
        onSelectAnomaly={handleOpenEventModal}
        selectedAnomalyId={selectedAnomaly?.id}
      />

      {/* Anomaly Cards Grid */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#FFB000]" />
            FLAGGED INCIDENTS ({anomalies.length} TOTAL)
          </span>
          <span className="text-slate-400 text-[11px]">CLICK "VIEW EVENT" FOR DETAILED TELEMETRY</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {anomalies.map((anom) => (
            <AnomalyCard
              key={anom.id}
              anomaly={anom}
              onViewEvent={handleOpenEventModal}
            />
          ))}
        </div>
      </div>

      {/* Modal Dialog for View Event */}
      <AnomalyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        anomaly={selectedAnomaly}
        onActionFeedback={(msg) =>
          setToast({
            type: 'info',
            title: 'OPERATOR ACTION',
            message: msg,
          })
        }
      />
    </div>
  );
};
