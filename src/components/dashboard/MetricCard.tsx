import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  isWarning?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtext,
  change,
  isPositive = true,
  icon: Icon,
  isWarning = false,
}) => {
  return (
    <div
      className={`p-5 rounded-xl border transition-all duration-200 ${
        isWarning
          ? 'bg-gradient-to-b from-[#161A26] to-[#0F1523] border-[#F59E0B]/40 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.7)] warning-brackets hover:border-[#F59E0B]/80 hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:-translate-y-0.5'
          : 'bg-gradient-to-b from-[#131B2D] to-[#0F1523] border-[rgba(255,107,0,0.2)] shadow-[0_8px_32px_-4px_rgba(0,0,0,0.7)] tactical-brackets hover:border-[#FF6B00]/70 hover:shadow-[0_0_20px_rgba(255,107,0,0.25)] hover:-translate-y-0.5'
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-mono font-medium tracking-wider text-slate-400 uppercase">
            {label}
          </span>
          <div className={`mt-2 text-3xl font-mono font-bold tracking-tight ${
            isWarning ? 'text-[#F59E0B] glow-text-warning' : 'text-white'
          }`}>
            {value}
          </div>
        </div>

        <div className={`p-2.5 rounded-lg border ${
          isWarning
            ? 'bg-[#1C1A22] border-[#F59E0B]/40 text-[#F59E0B] shadow-[0_0_10px_rgba(245,158,11,0.2)]'
            : 'bg-[#161F33] border-[#FF6B00]/40 text-[#FF6B00] shadow-[0_0_10px_rgba(255,107,0,0.25)]'
        }`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {(subtext || change) && (
        <div className="mt-4 pt-3 border-t border-[rgba(255,107,0,0.12)] flex items-center justify-between text-xs font-mono">
          {subtext && <span className="text-slate-400">{subtext}</span>}
          {change && (
            <span className={`font-semibold ${isPositive ? 'text-[#FF8A00]' : 'text-[#FF4D4D]'}`}>
              {change}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
