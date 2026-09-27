import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignalAnalysis } from '../../types/signal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { ChevronRight, FileCode2, ExternalLink } from 'lucide-react';

interface RecentAnalysisTableProps {
  signals: SignalAnalysis[];
  onViewDetails?: (signal: SignalAnalysis) => void;
}

export const RecentAnalysisTable: React.FC<RecentAnalysisTableProps> = ({
  signals,
  onViewDetails,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-[#131B2D] to-[#0F1523] border border-[rgba(255,107,0,0.2)] rounded-xl overflow-hidden tactical-brackets shadow-[0_8px_32px_-4px_rgba(0,0,0,0.7)]">
      <div className="px-6 py-4 bg-[#0B0F19] border-b border-[rgba(255,107,0,0.18)] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <FileCode2 className="w-4 h-4 text-[#FF6B00]" />
          <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-slate-100">
            RECENT SIGNAL INGESTION &amp; TELEMETRY LOG
          </h3>
        </div>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => navigate('/history')}
          rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
        >
          VIEW ALL ARCHIVES
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#080B12]/80 text-slate-400 uppercase tracking-wider border-b border-[rgba(255,107,0,0.15)]">
            <tr>
              <th className="px-5 py-3">FILE</th>
              <th className="px-4 py-3">TYPE</th>
              <th className="px-4 py-3">DURATION</th>
              <th className="px-4 py-3">SAMPLING RATE</th>
              <th className="px-4 py-3">SNR</th>
              <th className="px-4 py-3">CLASSIFICATION</th>
              <th className="px-4 py-3">CONFIDENCE</th>
              <th className="px-4 py-3">STATUS</th>
              <th className="px-4 py-3 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(255,107,0,0.1)] text-slate-200">
            {signals.map((sig) => (
              <tr
                key={sig.id}
                onClick={() => {
                  if (onViewDetails) onViewDetails(sig);
                  else navigate(`/workspace/${sig.id}`);
                }}
                className="hover:bg-[#161F33]/60 transition-colors cursor-pointer group"
              >
                <td className="px-5 py-3.5">
                  <div className="font-bold text-slate-100 group-hover:text-[#FF6B00] transition-colors flex items-center gap-2">
                    <span>{sig.fileName}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{sig.fileSize} // {sig.timestamp}</span>
                </td>
                <td className="px-4 py-3.5">
                  <Badge variant={sig.fileType === 'IQ' ? 'iq' : 'wav'} size="xs">
                    .{sig.fileType}
                  </Badge>
                </td>
                <td className="px-4 py-3.5 text-slate-300">
                  {sig.duration.toFixed(1)} s
                </td>
                <td className="px-4 py-3.5 text-slate-300">
                  {sig.samplingRate}
                </td>
                <td className="px-4 py-3.5">
                  <span className={sig.snr >= 15 ? 'text-[#FF8A00] font-bold' : 'text-[#F59E0B] font-bold'}>
                    {sig.snr.toFixed(1)} dB
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="font-medium text-slate-200">{sig.classification}</div>
                  {sig.modulationType && (
                    <div className="text-[10px] text-slate-400">{sig.modulationType}</div>
                  )}
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-14 bg-[#04060A] h-1.5 rounded-full overflow-hidden border border-[rgba(255,107,0,0.25)]">
                      <div
                        className="bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] h-full rounded-full"
                        style={{ width: `${sig.confidence}%` }}
                      />
                    </div>
                    <span className="font-bold text-[#FF6B00]">{sig.confidence}%</span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <Badge status={sig.status} showDot size="xs">
                    {sig.status}
                  </Badge>
                </td>
                <td className="px-4 py-3.5 text-right">
                  <span className="inline-flex items-center gap-1 text-[#FF6B00] group-hover:text-[#FF8A00] group-hover:underline">
                    INSPECT <ExternalLink className="w-3 h-3" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
