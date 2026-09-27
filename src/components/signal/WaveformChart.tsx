import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { WaveformDataPoint } from '../../types/signal';
import { mockWaveformData } from '../../data/mockWaveform';
import { Activity } from 'lucide-react';

interface WaveformChartProps {
  data?: WaveformDataPoint[];
  title?: string;
  showAnomalies?: boolean;
}

export const WaveformChart: React.FC<WaveformChartProps> = ({
  data = mockWaveformData,
  title = 'TIME DOMAIN I/Q WAVEFORM (OSCILLOSCOPE)',
  showAnomalies = true,
}) => {
  const [activeChannels, setActiveChannels] = useState<{
    inPhase: boolean;
    quadrature: boolean;
    magnitude: boolean;
  }>({
    inPhase: true,
    quadrature: true,
    magnitude: false,
  });

  const toggleChannel = (channel: 'inPhase' | 'quadrature' | 'magnitude') => {
    setActiveChannels((prev) => ({
      ...prev,
      [channel]: !prev[channel],
    }));
  };

  return (
    <div className="bg-gradient-to-b from-[#131B2D] to-[#0F1523] border border-[rgba(255,107,0,0.2)] rounded-xl p-5 tactical-brackets shadow-[0_8px_32px_-4px_rgba(0,0,0,0.7)]">
      {/* Header with channel controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[rgba(255,107,0,0.15)] gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#FF6B00]" />
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-100">
              {title}
            </h3>
            <p className="text-[10px] font-mono text-slate-400">
              SAMPLING RATE: 20 MSPS // TIME FRAME: 0.00s - 32.40s
            </p>
          </div>
        </div>

        {/* Channel Selectors */}
        <div className="flex items-center gap-1.5 font-mono text-[11px]">
          <button
            onClick={() => toggleChannel('inPhase')}
            className={`px-2.5 py-1 rounded border transition-all cursor-pointer ${
              activeChannels.inPhase
                ? 'bg-[#161F33] border-[#FF6B00] text-[#FF6B00] font-bold shadow-[0_0_10px_rgba(255,107,0,0.35)]'
                : 'bg-black/30 border-slate-700/60 text-slate-500'
            }`}
          >
            I (IN-PHASE)
          </button>
          <button
            onClick={() => toggleChannel('quadrature')}
            className={`px-2.5 py-1 rounded border transition-all cursor-pointer ${
              activeChannels.quadrature
                ? 'bg-[#161F33] border-[#FFB000] text-[#FFB000] font-bold shadow-[0_0_10px_rgba(255,176,0,0.35)]'
                : 'bg-black/30 border-slate-700/60 text-slate-500'
            }`}
          >
            Q (QUADRATURE)
          </button>
          <button
            onClick={() => toggleChannel('magnitude')}
            className={`px-2.5 py-1 rounded border transition-all cursor-pointer ${
              activeChannels.magnitude
                ? 'bg-[#161F33] border-[#FF4D4D] text-[#FF4D4D] font-bold shadow-[0_0_10px_rgba(255,77,77,0.35)]'
                : 'bg-black/30 border-slate-700/60 text-slate-500'
            }`}
          >
            |MAG|
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-[280px] w-full bg-[#06080F] rounded-lg border border-[rgba(255,107,0,0.18)] p-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 15, left: -15, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="2 4"
              stroke="rgba(255, 107, 0, 0.08)"
            />
            <XAxis
              dataKey="time"
              stroke="#64748B"
              fontSize={10}
              fontFamily="JetBrains Mono, monospace"
              tickFormatter={(val) => `${val}s`}
              tickLine={{ stroke: 'rgba(255, 107, 0, 0.2)' }}
            />
            <YAxis
              stroke="#64748B"
              fontSize={10}
              fontFamily="JetBrains Mono, monospace"
              domain={[-1.2, 1.2]}
              tickLine={{ stroke: 'rgba(255, 107, 0, 0.2)' }}
              tickFormatter={(val) => val.toFixed(1)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F1523',
                borderColor: '#FF6B00',
                borderRadius: '8px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '11px',
                color: '#F8FAFC',
                boxShadow: '0 8px 30px rgba(0,0,0,0.8), 0 0 15px rgba(255,107,0,0.25)',
              }}
              labelFormatter={(label) => `Time: ${label}s`}
            />

            {/* Anomaly markers on waveform */}
            {showAnomalies && (
              <>
                <ReferenceLine
                  x={17.82}
                  stroke="#F59E0B"
                  strokeDasharray="3 3"
                  label={{
                    value: 'FREQ SHIFT',
                    position: 'top',
                    fill: '#F59E0B',
                    fontSize: 9,
                    fontFamily: 'monospace',
                  }}
                />
                <ReferenceLine
                  x={24.17}
                  stroke="#FF8A00"
                  strokeDasharray="3 3"
                  label={{
                    value: 'EXPANSION',
                    position: 'top',
                    fill: '#FF8A00',
                    fontSize: 9,
                    fontFamily: 'monospace',
                  }}
                />
                <ReferenceLine
                  x={28.93}
                  stroke="#FF4D4D"
                  strokeDasharray="3 3"
                  label={{
                    value: 'DROPOUT',
                    position: 'top',
                    fill: '#FF4D4D',
                    fontSize: 9,
                    fontFamily: 'monospace',
                  }}
                />
              </>
            )}

            {activeChannels.inPhase && (
              <Line
                type="monotone"
                dataKey="inPhase"
                name="I (In-Phase)"
                stroke="#FF6B00"
                strokeWidth={1.8}
                dot={false}
                isAnimationActive={false}
              />
            )}

            {activeChannels.quadrature && (
              <Line
                type="monotone"
                dataKey="quadrature"
                name="Q (Quadrature)"
                stroke="#FFB000"
                strokeWidth={1.4}
                dot={false}
                isAnimationActive={false}
              />
            )}

            {activeChannels.magnitude && (
              <Line
                type="monotone"
                dataKey="magnitude"
                name="|Magnitude|"
                stroke="#FF4D4D"
                strokeWidth={1.6}
                dot={false}
                isAnimationActive={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer with status readouts */}
      <div className="mt-3 flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-400 gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FF6B00]" /> I-CHANNEL: ACTIVE
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FFB000]" /> Q-CHANNEL: ACTIVE
          </span>
        </div>
        <div className="text-slate-400">
          RMS VOLTAGE: <span className="text-[#FF6B00] font-bold">0.418 V</span> // PEAK: <span className="text-slate-200">0.923 V</span>
        </div>
      </div>
    </div>
  );
};
