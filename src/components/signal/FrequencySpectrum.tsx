import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { SpectrumDataPoint } from '../../types/signal';
import { mockSpectrumData } from '../../data/mockSpectrum';
import { Radio } from 'lucide-react';

interface FrequencySpectrumProps {
  data?: SpectrumDataPoint[];
  centerFrequency?: string;
  bandwidth?: string;
}

export const FrequencySpectrum: React.FC<FrequencySpectrumProps> = ({
  data = mockSpectrumData,
  centerFrequency = '2.410 GHz',
  bandwidth = '2.04 MHz',
}) => {
  const [peakHold, setPeakHold] = useState<boolean>(true);

  return (
    <div className="bg-gradient-to-b from-[#131B2D] to-[#0F1523] border border-[rgba(255,107,0,0.2)] rounded-xl p-5 tactical-brackets shadow-[0_8px_32px_-4px_rgba(0,0,0,0.7)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[rgba(255,107,0,0.15)] gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-[#FF6B00]" />
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-100">
              FREQUENCY SPECTRUM (FFT / WELCH POWER DENSITY)
            </h3>
            <p className="text-[10px] font-mono text-slate-400">
              FC: {centerFrequency} // OBW: {bandwidth} // FFT SIZE: 2048
            </p>
          </div>
        </div>

        {/* FFT Controls */}
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <button
            onClick={() => setPeakHold(!peakHold)}
            className={`px-2.5 py-1 rounded border transition-all cursor-pointer ${
              peakHold
                ? 'bg-[#161F33] border-[#FF6B00] text-[#FF6B00] font-bold shadow-[0_0_10px_rgba(255,107,0,0.35)]'
                : 'bg-black/30 border-slate-700/60 text-slate-500'
            }`}
          >
            PEAK HOLD
          </button>
          <div className="px-2.5 py-1 rounded bg-[#04060A] border border-[rgba(255,107,0,0.2)] text-slate-300 text-[10px]">
            RBW: 10 kHz
          </div>
        </div>
      </div>

      {/* Spectrum Chart */}
      <div className="h-[280px] w-full bg-[#06080F] rounded-lg border border-[rgba(255,107,0,0.18)] p-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 15, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="spectrumGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6B00" stopOpacity={0.85} />
                <stop offset="60%" stopColor="#FF8A00" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#FFB000" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="2 4"
              stroke="rgba(255, 107, 0, 0.08)"
            />
            <XAxis
              dataKey="frequency"
              stroke="#64748B"
              fontSize={10}
              fontFamily="JetBrains Mono, monospace"
              tickFormatter={(val) => `${val}M`}
              tickLine={{ stroke: 'rgba(255, 107, 0, 0.2)' }}
            />
            <YAxis
              stroke="#64748B"
              fontSize={10}
              fontFamily="JetBrains Mono, monospace"
              domain={[-90, 0]}
              tickLine={{ stroke: 'rgba(255, 107, 0, 0.2)' }}
              tickFormatter={(val) => `${val} dBm`}
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
              labelFormatter={(label) => `Frequency: ${label} MHz`}
              formatter={(value: any) => [`${value} dBm`, 'Power Level']}
            />

            {/* Noise Floor Reference */}
            <ReferenceLine
              y={-78}
              stroke="#64748B"
              strokeDasharray="4 4"
              label={{
                value: 'NOISE FLOOR (-78 dBm)',
                position: 'right',
                fill: '#94A3B8',
                fontSize: 9,
                fontFamily: 'monospace',
              }}
            />

            {/* Center Frequency Marker */}
            <ReferenceLine
              x={2.41}
              stroke="#FFB000"
              strokeDasharray="2 2"
              label={{
                value: 'CARRIER 2.410M',
                position: 'top',
                fill: '#FFB000',
                fontSize: 9,
                fontFamily: 'monospace',
              }}
            />

            <Area
              type="monotone"
              dataKey="amplitude"
              stroke="#FF6B00"
              strokeWidth={1.8}
              fillOpacity={1}
              fill="url(#spectrumGradient)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Readout */}
      <div className="mt-3 flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-400 gap-2">
        <div className="flex items-center gap-3">
          <span>PEAK POWER: <strong className="text-[#FF6B00] font-bold">-14.8 dBm</strong></span>
          <span className="text-slate-600">•</span>
          <span>DYNAMIC RANGE: <strong className="text-white">63.2 dB</strong></span>
        </div>
        <div className="text-slate-400">
          CENTROID: <span className="text-[#FF8A00] font-semibold">2.412 GHz</span> // 99% OBW: <span className="text-slate-200">{bandwidth}</span>
        </div>
      </div>
    </div>
  );
};
