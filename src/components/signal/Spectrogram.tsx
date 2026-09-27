import React, { useState } from 'react';
import { mockSpectrogramData } from '../../data/mockSpectrum';
import { Layers } from 'lucide-react';

interface SpectrogramProps {
  timeSteps?: number;
  freqBins?: number;
}

export const Spectrogram: React.FC<SpectrogramProps> = () => {
  const { timeLabels, freqLabels, matrix } = mockSpectrogramData;
  const [hoveredCell, setHoveredCell] = useState<{
    time: string;
    freq: string;
    intensity: number;
  } | null>(null);

  // Map intensity 0.0 -> 1.0 into premium bright orange/amber heat spectrum
  // 0.0 - 0.15: Deep space navy background
  // 0.15 - 0.35: Dark plum / muted burnt ember
  // 0.35 - 0.60: Coral red / warm crimson
  // 0.60 - 0.82: Radiant bright orange (#FF6B00)
  // 0.82 - 1.00: Golden amber / yellow peak energy (#FFB000)
  const getColor = (val: number) => {
    if (val < 0.15) return 'rgba(11, 16, 28, 0.7)';
    if (val < 0.35) return 'rgba(92, 32, 28, 0.85)';
    if (val < 0.6) return 'rgba(235, 68, 50, 0.9)';
    if (val < 0.82) return 'rgba(255, 107, 0, 0.95)';
    return 'rgba(255, 184, 0, 1.0)';
  };

  return (
    <div className="bg-gradient-to-b from-[#131B2D] to-[#0F1523] border border-[rgba(255,107,0,0.2)] rounded-xl p-5 tactical-brackets shadow-[0_8px_32px_-4px_rgba(0,0,0,0.7)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[rgba(255,107,0,0.15)] gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#FF6B00]" />
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-100">
              TIME-FREQUENCY WATERFALL (SPECTROGRAM)
            </h3>
            <p className="text-[10px] font-mono text-slate-400">
              STFT WINDOW: 512 | OVERLAP: 75% | COLOR SCALE: RF POWER DENSITY
            </p>
          </div>
        </div>

        {/* Color Legend Bar */}
        <div className="flex items-center gap-2 font-mono text-[10px] text-slate-300">
          <span>-90 dBm</span>
          <div className="w-28 h-2.5 rounded overflow-hidden flex border border-[rgba(255,107,0,0.35)] shadow-[0_0_10px_rgba(255,107,0,0.2)]">
            <div className="flex-1 bg-[#0B101C]" />
            <div className="flex-1 bg-[#5C201C]" />
            <div className="flex-1 bg-[#EB4432]" />
            <div className="flex-1 bg-[#FF6B00]" />
            <div className="flex-1 bg-[#FFB800]" />
          </div>
          <span className="text-[#FFB000] font-bold">0 dBm</span>
        </div>
      </div>

      {/* 2D Waterfall Grid */}
      <div className="bg-[#06080F] p-3 rounded-lg border border-[rgba(255,107,0,0.18)] relative">
        <div className="flex gap-2">
          {/* Y Axis Labels (Frequency) */}
          <div className="flex flex-col justify-between text-[9px] font-mono text-slate-400 py-1 select-none pr-1">
            <span>2.51M</span>
            <span>2.46M</span>
            <span>2.41M</span>
            <span>2.36M</span>
            <span>2.31M</span>
          </div>

          {/* Matrix canvas */}
          <div className="flex-1 flex flex-col gap-[1.5px] h-[220px]">
            {/* Render rows (frequencies from top to bottom) */}
            {Array.from({ length: 24 }).map((_, fIndex) => {
              const invF = 23 - fIndex;
              return (
                <div key={fIndex} className="flex-1 flex gap-[1.5px]">
                  {matrix.map((row, tIndex) => {
                    const intensity = row[invF] ?? 0.1;
                    return (
                      <div
                        key={tIndex}
                        className="flex-1 h-full rounded-[1px] transition-colors hover:ring-1 hover:ring-white cursor-crosshair"
                        style={{ backgroundColor: getColor(intensity) }}
                        onMouseEnter={() =>
                          setHoveredCell({
                            time: timeLabels[tIndex] || `${tIndex}s`,
                            freq: freqLabels[invF] || `${invF}`,
                            intensity,
                          })
                        }
                        onMouseLeave={() => setHoveredCell(null)}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* X Axis Labels (Time) */}
        <div className="flex justify-between text-[9px] font-mono text-slate-400 pt-2 pl-8 pr-1 select-none">
          <span>00.0s</span>
          <span>08.0s</span>
          <span>16.0s (Anomaly)</span>
          <span>24.0s (Burst)</span>
          <span>32.4s</span>
        </div>

        {/* Overlay Tooltip if hovered */}
        {hoveredCell && (
          <div className="absolute top-4 right-4 bg-[#0F1523] border border-[#FF6B00] px-3 py-1.5 rounded-lg text-xs font-mono text-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.9),0_0_15px_rgba(255,107,0,0.3)] z-10">
            <div>TIME: <span className="text-[#FF6B00] font-bold">{hoveredCell.time}</span></div>
            <div>FREQ: <span className="text-white">{hoveredCell.freq}</span></div>
            <div>ENERGY: <span className="text-[#FFB000] font-bold">{(hoveredCell.intensity * 100).toFixed(1)}%</span></div>
          </div>
        )}
      </div>

      {/* Footer Readout */}
      <div className="mt-3 flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-400 gap-2">
        <div className="flex items-center gap-2 text-[#FFB000]">
          <span className="w-2 h-2 rounded-full bg-[#FF4D4D] animate-ping" />
          <span>ANOMALY SIGNATURES VISIBLE AT T=17.8s (LO SHIFT) &amp; T=28.9s (NULL)</span>
        </div>
        <div>
          <span>TEMPORAL RESOLUTION: </span>
          <span className="text-slate-200">1.01 s/column</span>
        </div>
      </div>
    </div>
  );
};
