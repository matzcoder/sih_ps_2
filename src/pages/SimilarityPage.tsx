import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { SimilarSignal } from '../types/signal';
import { SimilarityGraph } from '../components/similarity/SimilarityGraph';
import { SimilarSignalCard } from '../components/similarity/SimilarSignalCard';
import { LoadingState } from '../components/common/LoadingState';
import { Button } from '../components/common/Button';
import { Network, ArrowLeft, Filter, Sparkles, Radio } from 'lucide-react';

export const SimilarityPage: React.FC = () => {
  const navigate = useNavigate();
  const [similarSignals, setSimilarSignals] = useState<SimilarSignal[]>([]);
  const [selectedSignal, setSelectedSignal] = useState<SimilarSignal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [minSimilarity, setMinSimilarity] = useState<number>(70);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await api.getSimilarSignals('signal_042');
        setSimilarSignals(data);
        if (data.length > 0) {
          setSelectedSignal(data[0]);
        }
      } catch (err) {
        console.error('Failed to load similar signals', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <LoadingState title="COMPUTING VECTOR EMBEDDING NEAREST NEIGHBORS" />;
  }

  const filteredSignals = similarSignals.filter(
    (s) => s.similarityScore >= minSimilarity
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#232F48] gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="xs"
            onClick={() => navigate('/workspace/signal_042')}
            leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
          >
            WORKSPACE
          </Button>
          <div className="h-4 w-px bg-[#232F48] hidden sm:block" />
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center">
                <Network className="w-4 h-4 text-[#FF6B00] animate-pulse" />
              </div>
              <h1 className="font-mono text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
                SIMILARITY SEARCH &amp; TOPOLOGY
              </h1>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-0.5">
              High-dimensional biometric cluster matching against reference signal database.
            </p>
          </div>
        </div>

        {/* Filter Slider for Similarity Threshold */}
        <div className="flex items-center gap-3 bg-[#0F1523]/80 px-3.5 py-2 rounded-lg border border-[#232F48] font-mono text-xs shadow-sm">
          <Filter className="w-3.5 h-3.5 text-[#FF6B00]" />
          <span className="text-slate-400 text-[11px]">MIN SCORE:</span>
          <span className="text-[#FF8A00] font-bold">{minSimilarity}%</span>
          <input
            type="range"
            min="50"
            max="95"
            step="5"
            value={minSimilarity}
            onChange={(e) => setMinSimilarity(Number(e.target.value))}
            className="w-20 accent-[#FF6B00] cursor-pointer"
          />
        </div>
      </div>

      {/* Target Signal Banner */}
      <div className="p-4 rounded-xl bg-[#0F1523]/90 border border-[#FF6B00]/40 tactical-brackets flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_4px_25px_-5px_rgba(255,107,0,0.15)]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] animate-ping" />
            <span className="text-xs font-mono text-slate-400 uppercase">QUERY ANCHOR TARGET:</span>
            <strong className="text-white font-mono text-sm tracking-wide">signal_042.iq</strong>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-1">
            2.04 MHz Bandwidth // 18.7 dB SNR // Tactical FHSS / QPSK
          </p>
        </div>

        <div className="text-xs font-mono text-[#FF8A00] bg-[#161F33] px-3.5 py-1.5 rounded-lg border border-[#232F48] shadow-inner font-semibold">
          MATCHED: {filteredSignals.length} NEIGHBORS
        </div>
      </div>

      {/* Interactive Topology Graph */}
      <SimilarityGraph
        currentSignalName="signal_042.iq"
        similarSignals={filteredSignals}
        onSelectSignal={(sig) => setSelectedSignal(sig)}
        selectedSignalId={selectedSignal?.signalId}
      />

      {/* Similar Signals Cards List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FF6B00]" />
            CORRELATED SIGNALS IN DATABASE ({filteredSignals.length} MATCHES)
          </span>
          <span className="text-slate-400 text-[11px]">SORTED BY COSINE DISTANCE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSignals.map((sig) => (
            <SimilarSignalCard
              key={sig.id}
              signal={sig}
              isSelected={selectedSignal?.id === sig.id}
              onSelect={(s) => setSelectedSignal(s)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
