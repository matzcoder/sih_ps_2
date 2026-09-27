import React from 'react';
import { AnomalyEvent } from '../../types/signal';
import { AlertTriangle, Clock, Eye } from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface AnomalyCardProps {
  anomaly: AnomalyEvent;
  onViewEvent: (anomaly: AnomalyEvent) => void;
}

export const AnomalyCard: React.FC<AnomalyCardProps> = ({
  anomaly,
  onViewEvent,
}) => {
  return (
    <div className="bg-gradient-to-b from-[#161B29] to-[#0F1523] border border-[#F59E0B]/40 rounded-xl p-5 warning-brackets shadow-[0_8px_32px_-4px_rgba(0,0,0,0.7)] hover:border-[#FF6B00] transition-all flex flex-col justify-between">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-[rgba(255,107,0,0.15)] mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#1C1924] border border-[#F59E0B] text-[#F59E0B] shadow-[0_0_10px_rgba(245,158,11,0.25)]">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-mono text-sm font-bold text-white uppercase tracking-wide">
                {anomaly.title}
              </h4>
              <span className="text-[10px] font-mono text-slate-400">
                {anomaly.type}
              </span>
            </div>
          </div>
          <Badge severity={anomaly.severity} size="xs" showDot>
            {anomaly.severity}
          </Badge>
        </div>

        {/* Timestamp and Duration */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-3 bg-[#0B0F19] p-2.5 rounded-lg border border-[rgba(255,107,0,0.15)]">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>TIMESTAMP: <strong className="text-[#F59E0B]">{anomaly.timestampFormatted}</strong></span>
          </div>
          <div className="text-slate-400">
            DURATION: <span className="text-white">{anomaly.durationMs} ms</span>
          </div>
        </div>

        {/* Description snippet */}
        <p className="text-xs font-mono text-slate-300 line-clamp-2 mb-4 leading-relaxed">
          {anomaly.description}
        </p>

        {/* Observed Metric Deviation */}
        <div className="bg-[#06080F] p-2.5 rounded-lg border border-[rgba(255,107,0,0.18)] font-mono text-[11px] space-y-1 mb-4">
          <div className="flex justify-between text-slate-400">
            <span>OBSERVED:</span>
            <span className="text-[#FF8A00] font-bold">{anomaly.metrics.observed}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>DEVIATION:</span>
            <span className="text-[#FF4D4D] font-bold">{anomaly.metrics.deviation}</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Button
        variant="warning"
        size="sm"
        onClick={() => onViewEvent(anomaly)}
        leftIcon={<Eye className="w-3.5 h-3.5" />}
        className="w-full justify-center shadow-[0_0_15px_rgba(245,158,11,0.25)]"
      >
        VIEW EVENT
      </Button>
    </div>
  );
};
