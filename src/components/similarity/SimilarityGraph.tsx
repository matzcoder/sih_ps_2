import React, { useState } from 'react';
import { SimilarSignal } from '../../types/signal';
import { Network, Sparkles } from 'lucide-react';

interface SimilarityGraphProps {
  currentSignalName?: string;
  similarSignals: SimilarSignal[];
  onSelectSignal: (signal: SimilarSignal) => void;
  selectedSignalId?: string;
}

export const SimilarityGraph: React.FC<SimilarityGraphProps> = ({
  currentSignalName = 'signal_042.iq',
  similarSignals,
  onSelectSignal,
  selectedSignalId,
}) => {
  const [hoveredNode, setHoveredNode] = useState<SimilarSignal | null>(null);

  // SVG network nodes positions in radial coordinates around center (250, 200)
  const centerX = 250;
  const centerY = 200;

  // Calculate positions for orbiting nodes
  const nodePositions = similarSignals.slice(0, 5).map((sig, idx) => {
    // Distance inversely proportional to similarity (higher similarity -> closer to center)
    const radius = 90 + (100 - sig.similarityScore) * 2.8;
    const angle = (idx * (360 / Math.min(5, similarSignals.length)) - 60) * (Math.PI / 180);
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { ...sig, x, y, radius };
  });

  return (
    <div className="bg-gradient-to-b from-[#131B2D] to-[#0F1523] border border-[rgba(255,107,0,0.2)] rounded-xl p-5 tactical-brackets shadow-[0_8px_32px_-4px_rgba(0,0,0,0.7)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[rgba(255,107,0,0.15)] gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Network className="w-5 h-5 text-[#FF6B00]" />
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-100">
              VECTOR EMBEDDING TOPOLOGY &amp; AFFINITY GRAPH
            </h3>
            <p className="text-[10px] font-mono text-slate-400">
              COSINE DISTANCE MANIFOLD // HIGH-DIMENSIONAL NEAREST NEIGHBORS
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono text-[#FF8A00] bg-[#161F33] px-2.5 py-1 rounded-full border border-[#FF6B00]/40">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
          <span>KNN K=5 EMBEDDING SPACE</span>
        </div>
      </div>

      {/* Interactive SVG Network Graph */}
      <div className="relative w-full h-[380px] bg-[#06080F] rounded-lg border border-[rgba(255,107,0,0.18)] overflow-hidden flex items-center justify-center">
        {/* Radar Rings Background */}
        <svg
          viewBox="0 0 500 400"
          className="w-full h-full select-none"
        >
          {/* Concentric distance rings */}
          <circle cx={centerX} cy={centerY} r={60} stroke="rgba(255,107,0,0.15)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
          <circle cx={centerX} cy={centerY} r={110} stroke="rgba(255,107,0,0.15)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
          <circle cx={centerX} cy={centerY} r={160} stroke="rgba(255,107,0,0.15)" strokeWidth="1" strokeDasharray="3 3" fill="none" />

          {/* Radial axis lines */}
          <line x1="50" y1="200" x2="450" y2="200" stroke="rgba(255,107,0,0.1)" strokeWidth="0.5" />
          <line x1="250" y1="30" x2="250" y2="370" stroke="rgba(255,107,0,0.1)" strokeWidth="0.5" />

          {/* Connection Lines from Center to Orbiting Nodes */}
          {nodePositions.map((node) => {
            const isHovered = hoveredNode?.id === node.id;
            const isSelected = selectedSignalId === node.signalId;
            const strokeColor = node.similarityScore > 90 ? '#FF6B00' : 'rgba(255,107,0,0.3)';

            return (
              <g key={`line-${node.id}`}>
                <line
                  x1={centerX}
                  y1={centerY}
                  x2={node.x}
                  y2={node.y}
                  stroke={isSelected ? '#FFB000' : isHovered ? '#FF6B00' : strokeColor}
                  strokeWidth={isHovered || isSelected ? 2.5 : 1.2}
                  strokeDasharray={isSelected ? 'none' : '4 4'}
                  opacity={0.85}
                />
                {/* Score label on line */}
                <text
                  x={(centerX + node.x) / 2}
                  y={(centerY + node.y) / 2 - 6}
                  fill={isSelected ? '#FFB000' : '#FF8A00'}
                  fontSize="9"
                  fontFamily="JetBrains Mono, monospace"
                  textAnchor="middle"
                  className="font-bold pointer-events-none"
                >
                  {node.similarityScore}%
                </text>
              </g>
            );
          })}

          {/* Center Target Node */}
          <g>
            <circle
              cx={centerX}
              cy={centerY}
              r={24}
              fill="#161F33"
              stroke="#FF6B00"
              strokeWidth="2.5"
              className="filter drop-shadow-[0_0_15px_rgba(255,107,0,0.8)]"
            />
            <circle cx={centerX} cy={centerY} r={32} stroke="#FF8A00" strokeWidth="1" strokeDasharray="2 4" fill="none" className="animate-spin origin-[250px_200px]" style={{ animationDuration: '8s' }} />
            <text
              x={centerX}
              y={centerY - 3}
              fill="#FFFFFF"
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="bold"
              textAnchor="middle"
            >
              QUERY
            </text>
            <text
              x={centerX}
              y={centerY + 9}
              fill="#FF6B00"
              fontSize="8"
              fontFamily="JetBrains Mono, monospace"
              textAnchor="middle"
              fontWeight="bold"
            >
              TARGET
            </text>
          </g>

          {/* Neighbor Orbit Nodes */}
          {nodePositions.map((node) => {
            const isHovered = hoveredNode?.id === node.id;
            const isSelected = selectedSignalId === node.signalId;

            return (
              <g
                key={`node-${node.id}`}
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => onSelectSignal(node)}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Glow ring */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={18}
                  fill="#0B0F19"
                  stroke={isSelected ? '#FFB000' : isHovered ? '#FF6B00' : 'rgba(255,107,0,0.35)'}
                  strokeWidth={isSelected || isHovered ? 2.5 : 1.5}
                  className="transition-all"
                />

                <text
                  x={node.x}
                  y={node.y + 4}
                  fill={isSelected ? '#FFB000' : '#FFFFFF'}
                  fontSize="8"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="pointer-events-none"
                >
                  #{node.signalId.replace('signal_', '')}
                </text>

                {/* Text tag below node */}
                <text
                  x={node.x}
                  y={node.y + 26}
                  fill={isHovered ? '#FF6B00' : '#94A3B8'}
                  fontSize="8"
                  fontFamily="JetBrains Mono, monospace"
                  textAnchor="middle"
                  className="pointer-events-none"
                >
                  {node.similarityScore}% SIM
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Readout Tooltip */}
        {hoveredNode && (
          <div className="absolute bottom-3 left-3 bg-[#0F1523] border border-[#FF6B00] p-2.5 rounded-lg text-xs font-mono text-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.9),0_0_15px_rgba(255,107,0,0.3)] pointer-events-none">
            <div className="font-bold text-[#FF6B00]">{hoveredNode.name}</div>
            <div className="text-[10px] text-slate-300">
              SIMILARITY: <span className="text-white font-bold">{hoveredNode.similarityScore}%</span> // CLASSIFICATION: {hoveredNode.classification}
            </div>
          </div>
        )}
      </div>

      {/* Graph Readout Footer */}
      <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FF6B00]" /> &gt;90% HIGH SIMILARITY
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FF8A00]" /> 60-90% MODERATE
          </span>
        </div>
        <div>
          <span>DISTANCE METRIC: </span>
          <span className="text-slate-200">EUCLIDEAN + COSINE (NORM)</span>
        </div>
      </div>
    </div>
  );
};
