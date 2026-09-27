import React from 'react';
import { AnomalySeverity, SignalStatus } from '../../types/signal';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'accent' | 'warning' | 'danger' | 'panel' | 'neutral' | 'outline' | 'iq' | 'wav';
  severity?: AnomalySeverity;
  status?: SignalStatus;
  size?: 'xs' | 'sm' | 'md';
  showDot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant,
  severity,
  status,
  size = 'sm',
  showDot = false,
  className = '',
}) => {
  const sizeClasses = {
    xs: 'text-[10px] px-1.5 py-0.5 tracking-wider',
    sm: 'text-xs px-2.5 py-0.5 tracking-wide',
    md: 'text-sm px-3 py-1 tracking-normal',
  };

  // Determine styling based on severity or status if passed
  let resolvedVariant = variant || 'panel';
  let dotColor = 'bg-[#FF6B00]';

  if (severity) {
    if (severity === 'CRITICAL' || severity === 'HIGH') {
      resolvedVariant = 'danger';
      dotColor = 'bg-[#FF4D4D] animate-ping';
    } else if (severity === 'MEDIUM') {
      resolvedVariant = 'warning';
      dotColor = 'bg-[#F59E0B]';
    } else {
      resolvedVariant = 'accent';
      dotColor = 'bg-[#FF6B00]';
    }
  } else if (status) {
    if (status === 'COMPLETED') {
      resolvedVariant = 'accent';
      dotColor = 'bg-[#FF6B00]';
    } else if (status === 'FLAGGED' || status === 'FAILED') {
      resolvedVariant = 'danger';
      dotColor = 'bg-[#FF4D4D] animate-ping';
    } else {
      resolvedVariant = 'panel';
      dotColor = 'bg-slate-400 animate-pulse';
    }
  }

  const variantClasses = {
    accent: 'bg-[#FF6B00]/15 text-[#FF6B00] border border-[#FF6B00]/40 shadow-[0_0_10px_rgba(255,107,0,0.2)]',
    warning: 'bg-[#F59E0B]/18 text-[#F59E0B] border border-[#F59E0B]/50 shadow-[0_0_10px_rgba(245,158,11,0.25)]',
    danger: 'bg-[#FF4D4D]/18 text-[#FF4D4D] border border-[#FF4D4D]/50 shadow-[0_0_10px_rgba(255,77,77,0.25)]',
    panel: 'bg-[#161F33] text-slate-200 border border-[rgba(255,107,0,0.2)]',
    neutral: 'bg-[#0B0F19] text-slate-300 border border-slate-700/60',
    outline: 'bg-transparent text-[#FF6B00] border border-[#FF6B00]',
    iq: 'bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00] font-bold shadow-[0_0_8px_rgba(255,107,0,0.25)]',
    wav: 'bg-[#F59E0B]/20 text-[#FFB000] border border-[#FFB000]/70 font-bold shadow-[0_0_8px_rgba(245,158,11,0.25)]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono font-medium rounded uppercase select-none ${sizeClasses[size]} ${variantClasses[resolvedVariant]} ${className}`}
    >
      {showDot && (
        <span className="relative flex h-2 w-2">
          <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColor}`} />
        </span>
      )}
      {children}
    </span>
  );
};
