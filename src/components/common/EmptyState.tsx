import React from 'react';
import { SearchX, Radio, AlertCircle } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: 'search' | 'radio' | 'alert';
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'NO SIGNALS DETECTED',
  description = 'No matching signal records or telemetry traces found in the database.',
  actionText,
  onAction,
  icon = 'search',
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl bg-[#0F1523]/80 border border-dashed border-[rgba(255,107,0,0.25)]">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#161F33] border border-[rgba(255,107,0,0.35)] text-[#FF6B00] mb-4 shadow-[0_0_20px_rgba(255,107,0,0.2)]">
        {icon === 'search' && <SearchX className="w-8 h-8 opacity-80" />}
        {icon === 'radio' && <Radio className="w-8 h-8 opacity-80" />}
        {icon === 'alert' && <AlertCircle className="w-8 h-8 text-[#F59E0B] opacity-90" />}
      </div>

      <h3 className="font-mono text-sm font-bold text-slate-100 tracking-wider uppercase mb-1">
        {title}
      </h3>
      <p className="text-xs font-mono text-slate-400 max-w-sm mb-6">
        {description}
      </p>

      {actionText && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
