import React from 'react';
import { AnomalyEvent } from '../../types/signal';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { AlertTriangle, Cpu, Wrench, CheckCircle2, Download } from 'lucide-react';

interface AnomalyModalProps {
  isOpen: boolean;
  onClose: () => void;
  anomaly: AnomalyEvent | null;
  onActionFeedback?: (msg: string) => void;
}

export const AnomalyModal: React.FC<AnomalyModalProps> = ({
  isOpen,
  onClose,
  anomaly,
  onActionFeedback,
}) => {
  if (!anomaly) return null;

  const handleVerify = () => {
    if (onActionFeedback) {
      onActionFeedback(`Anomaly event [${anomaly.id}] marked as verified by operator.`);
    }
    onClose();
  };

  const handleExport = () => {
    if (onActionFeedback) {
      onActionFeedback(`Anomaly event telemetry slice [${anomaly.id}.bin] exported successfully.`);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`ANOMALY EVENT INSPECTION // ${anomaly.id.toUpperCase()}`}
      subtitle={`DETECTED AT T=${anomaly.timestampFormatted} (${anomaly.durationMs}ms EVENT DURATION)`}
      maxWidth="2xl"
      isWarning={true}
      footer={
        <div className="flex items-center justify-between w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            EXPORT SLICE
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>
              DISMISS
            </Button>
            <Button
              variant="warning"
              size="sm"
              onClick={handleVerify}
              leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
            >
              MARK AS VERIFIED
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-4 font-mono text-xs">
        {/* Severity Banner */}
        <div className="p-4 rounded-xl bg-[#06080F] border border-[#F59E0B]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 warning-brackets">
          <div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#F59E0B] animate-bounce" />
              <h4 className="text-base font-bold text-white uppercase">{anomaly.title}</h4>
            </div>
            <p className="text-xs text-slate-300 mt-1">{anomaly.type}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge severity={anomaly.severity} size="md" showDot>
              {anomaly.severity} SEVERITY
            </Badge>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="bg-[#0B0F19] p-4 rounded-xl border border-[rgba(255,107,0,0.18)]">
          <div className="text-[10px] text-slate-400 uppercase font-bold mb-1">
            ANOMALY EVENT DESCRIPTION
          </div>
          <p className="text-slate-200 leading-relaxed text-xs">
            {anomaly.description}
          </p>
        </div>

        {/* Statistical Metric Deviations */}
        <div className="bg-[#0B0F19] p-4 rounded-xl border border-[rgba(255,107,0,0.18)]">
          <div className="text-[10px] text-slate-400 uppercase font-bold mb-3 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#FF6B00]" />
            STATISTICAL PARAMETER COMPARISON
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-[#06080F] p-3 rounded-lg border border-[rgba(255,107,0,0.15)]">
              <span className="text-[10px] text-slate-400 uppercase block">EXPECTED BASELINE</span>
              <div className="text-xs font-bold text-slate-200 mt-1">{anomaly.metrics.expected}</div>
            </div>

            <div className="bg-[#06080F] p-3 rounded-lg border border-[#F59E0B]/40">
              <span className="text-[10px] text-slate-400 uppercase block">OBSERVED VALUE</span>
              <div className="text-xs font-bold text-[#FF8A00] mt-1">{anomaly.metrics.observed}</div>
            </div>

            <div className="bg-[#06080F] p-3 rounded-lg border border-[#FF4D4D]/40">
              <span className="text-[10px] text-slate-400 uppercase block">STATISTICAL DEVIATION</span>
              <div className="text-xs font-bold text-[#FF4D4D] mt-1">{anomaly.metrics.deviation}</div>
            </div>
          </div>
        </div>

        {/* Channel Offsets */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#0B0F19] p-3 rounded-lg border border-[rgba(255,107,0,0.18)]">
            <span className="text-[10px] text-slate-400 uppercase block">FREQ OFFSET</span>
            <span className="text-sm font-bold text-[#FF8A00] mt-0.5 block">{anomaly.frequencyOffset || 'N/A'}</span>
          </div>

          <div className="bg-[#0B0F19] p-3 rounded-lg border border-[rgba(255,107,0,0.18)]">
            <span className="text-[10px] text-slate-400 uppercase block">AMPLITUDE DELTA</span>
            <span className="text-sm font-bold text-slate-200 mt-0.5 block">{anomaly.amplitudeDrop || 'N/A'}</span>
          </div>

          <div className="bg-[#0B0F19] p-3 rounded-lg border border-[rgba(255,107,0,0.18)]">
            <span className="text-[10px] text-slate-400 uppercase block">SNR DEGRADATION</span>
            <span className="text-sm font-bold text-[#FF4D4D] mt-0.5 block">{anomaly.snrDegradation || 'N/A'}</span>
          </div>
        </div>

        {/* Action Recommendation */}
        <div className="bg-[#06080F] p-3.5 rounded-xl border border-[rgba(255,107,0,0.25)] flex items-start gap-3">
          <Wrench className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] text-[#FF6B00] uppercase font-bold block mb-0.5">
              RECOMMENDED REMEDIATION ACTION
            </span>
            <p className="text-slate-300 text-xs">
              {anomaly.recommendedAction}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
