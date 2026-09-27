import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { SignalAnalysis } from '../types/signal';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingState } from '../components/common/LoadingState';
import {
  History,
  Search,
  ExternalLink,
  FileCode,
  FileAudio,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [signals, setSignals] = useState<SignalAnalysis[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'IQ' | 'WAV' | 'Anomaly' | 'Complete'>('All');

  useEffect(() => {
    async function fetchHistory() {
      setLoading(true);
      try {
        const data = await api.getHistory(activeFilter, searchQuery);
        setSignals(data);
      } catch (err) {
        console.error('Failed to query signal archive', err);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, [activeFilter, searchQuery]);

  const filterButtons: Array<{ id: 'All' | 'IQ' | 'WAV' | 'Anomaly' | 'Complete'; label: string; icon?: any }> = [
    { id: 'All', label: 'ALL SIGNALS' },
    { id: 'IQ', label: '.IQ RAW', icon: FileCode },
    { id: 'WAV', label: '.WAV AUDIO', icon: FileAudio },
    { id: 'Anomaly', label: 'ANOMALY DETECTED', icon: AlertTriangle },
    { id: 'Complete', label: 'COMPLETE', icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#232F48] gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center">
              <History className="w-4 h-4 text-[#FF6B00]" />
            </div>
            <div>
              <h1 className="font-mono text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
                SIGNAL ARCHIVE &amp; TELEMETRY DATABASE
              </h1>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                Search, filter and inspect historical electromagnetic recordings and classification verdicts.
              </p>
            </div>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/analyze')}
        >
          INGEST NEW SIGNAL
        </Button>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#0F1523]/80 p-4 rounded-xl border border-[#232F48] tactical-brackets shadow-lg backdrop-blur-sm">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by file name, modulation or signal ID..."
            className="w-full bg-[#161F33] border border-[#232F48] rounded-lg pl-10 pr-14 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-mono"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          {filterButtons.map((fb) => {
            const Icon = fb.icon;
            const isActive = activeFilter === fb.id;
            return (
              <button
                key={fb.id}
                onClick={() => setActiveFilter(fb.id)}
                className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 text-xs ${
                  isActive
                    ? 'bg-[#FF6B00] text-white font-bold shadow-[0_0_12px_rgba(255,107,0,0.4)]'
                    : 'bg-[#161F33] text-slate-300 hover:text-white hover:bg-[#1E293B] border border-[#232F48]'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{fb.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Table / Empty State */}
      {loading ? (
        <LoadingState title="QUERYING TELEMETRY ARCHIVE" />
      ) : signals.length === 0 ? (
        <EmptyState
          title="NO MATCHING SIGNALS IN ARCHIVE"
          description={`No signal records found matching query "${searchQuery}" under filter [${activeFilter}].`}
          actionText="CLEAR SEARCH FILTERS"
          onAction={() => {
            setSearchQuery('');
            setActiveFilter('All');
          }}
        />
      ) : (
        <div className="bg-[#0F1523]/80 border border-[#232F48] rounded-xl overflow-hidden tactical-brackets shadow-lg backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#080B12]/80 text-slate-400 uppercase tracking-wider border-b border-[#232F48]">
                <tr>
                  <th className="px-5 py-3.5">FILE</th>
                  <th className="px-4 py-3.5">TYPE</th>
                  <th className="px-4 py-3.5">DURATION</th>
                  <th className="px-4 py-3.5">SAMPLING RATE</th>
                  <th className="px-4 py-3.5">SNR</th>
                  <th className="px-4 py-3.5">BANDWIDTH</th>
                  <th className="px-4 py-3.5">CLASSIFICATION</th>
                  <th className="px-4 py-3.5">CONFIDENCE</th>
                  <th className="px-4 py-3.5">STATUS</th>
                  <th className="px-4 py-3.5 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#232F48]/60 text-slate-200">
                {signals.map((sig) => (
                  <tr
                    key={sig.id}
                    onClick={() => navigate(`/workspace/${sig.id}`)}
                    className="hover:bg-[#161F33]/60 transition-colors cursor-pointer group"
                  >
                    <td className="px-5 py-3.5">
                      <div className="font-bold text-white group-hover:text-[#FF8A00] transition-colors">
                        {sig.fileName}
                      </div>
                      <span className="text-[10px] text-slate-500">{sig.fileSize} // {sig.timestamp}</span>
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
                      <span className={sig.snr >= 15 ? 'text-[#FF8A00] font-bold' : 'text-[#FFB000] font-bold'}>
                        {sig.snr.toFixed(1)} dB
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-300">
                      {sig.bandwidth}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-slate-200">{sig.classification}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-bold text-[#FF6B00]">{sig.confidence}%</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <Badge status={sig.status} showDot size="xs">
                        {sig.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <span className="inline-flex items-center gap-1 text-[#FF8A00] group-hover:text-[#FF6B00] group-hover:underline">
                        OPEN <ExternalLink className="w-3 h-3" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
