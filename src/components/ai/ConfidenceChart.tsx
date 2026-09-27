import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
} from 'recharts';
import { ClassificationClass } from '../../types/signal';
import { classificationClasses } from '../../services/api';
import { BarChart3 } from 'lucide-react';

interface ConfidenceChartProps {
  distribution?: ClassificationClass[];
}

export const ConfidenceChart: React.FC<ConfidenceChartProps> = ({
  distribution = classificationClasses,
}) => {
  return (
    <div className="bg-gradient-to-b from-[#131B2D] to-[#0F1523] border border-[rgba(255,107,0,0.2)] rounded-xl p-5 tactical-brackets shadow-[0_8px_32px_-4px_rgba(0,0,0,0.7)]">
      <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,107,0,0.15)] mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#FF6B00]" />
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-100">
            CLASS PROBABILITY DISTRIBUTION
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-400">SOFTMAX OUTPUT</span>
      </div>

      {/* Probability Bars */}
      <div className="space-y-3 font-mono text-xs mb-4">
        {distribution.map((item, index) => {
          const isWinner = index === 0;
          return (
            <div key={item.name} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className={`font-bold ${isWinner ? 'text-[#FF6B00]' : 'text-slate-300'}`}>
                  {item.name}
                  <span className="text-[10px] text-slate-400 font-normal ml-2 hidden sm:inline">
                    ({item.description})
                  </span>
                </span>
                <span className={`font-bold ${isWinner ? 'text-[#FF6B00]' : 'text-slate-400'}`}>
                  {item.confidence}%
                </span>
              </div>
              <div className="w-full bg-[#06080F] h-2.5 rounded-full overflow-hidden border border-[rgba(255,107,0,0.2)] p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isWinner
                      ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] shadow-[0_0_12px_rgba(255,107,0,0.7)]'
                      : 'bg-[#161F33]'
                  }`}
                  style={{ width: `${item.confidence}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Mini Bar Chart */}
      <div className="h-[120px] w-full bg-[#06080F] rounded-lg p-1 border border-[rgba(255,107,0,0.18)]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={distribution} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,107,0,0.08)" />
            <XAxis
              dataKey="name"
              stroke="#64748B"
              fontSize={10}
              fontFamily="JetBrains Mono, monospace"
              tickLine={{ stroke: 'rgba(255,107,0,0.2)' }}
            />
            <YAxis
              stroke="#64748B"
              fontSize={9}
              fontFamily="JetBrains Mono, monospace"
              domain={[0, 100]}
              tickLine={{ stroke: 'rgba(255,107,0,0.2)' }}
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
              formatter={(val: any) => [`${val}%`, 'Confidence']}
            />
            <Bar dataKey="confidence" radius={[3, 3, 0, 0]}>
              {distribution.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? '#FF6B00' : '#161F33'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
