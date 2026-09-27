import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export interface ToastProps {
  id?: string;
  type?: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message?: string;
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  type = 'success',
  title,
  message,
  duration = 4000,
  onClose,
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const typeConfig = {
    success: {
      border: 'border-[#FF6B00]/70',
      bg: 'bg-[#0F1523]',
      text: 'text-[#FF6B00]',
      icon: <CheckCircle2 className="w-5 h-5 text-[#FF6B00] shrink-0" />,
      shadow: 'shadow-[0_10px_30px_-5px_rgba(0,0,0,0.8),0_0_20px_rgba(255,107,0,0.3)]',
    },
    warning: {
      border: 'border-[#F59E0B]/70',
      bg: 'bg-[#0F1523]',
      text: 'text-[#F59E0B]',
      icon: <AlertTriangle className="w-5 h-5 text-[#F59E0B] shrink-0" />,
      shadow: 'shadow-[0_10px_30px_-5px_rgba(0,0,0,0.8),0_0_20px_rgba(245,158,11,0.3)]',
    },
    error: {
      border: 'border-[#FF4D4D]/70',
      bg: 'bg-[#150B0D]',
      text: 'text-[#FF4D4D]',
      icon: <AlertCircle className="w-5 h-5 text-[#FF4D4D] shrink-0" />,
      shadow: 'shadow-[0_10px_30px_-5px_rgba(0,0,0,0.8),0_0_20px_rgba(255,77,77,0.3)]',
    },
    info: {
      border: 'border-[rgba(255,107,0,0.3)]',
      bg: 'bg-[#0F1523]',
      text: 'text-[#FF8A00]',
      icon: <Info className="w-5 h-5 text-[#FF8A00] shrink-0" />,
      shadow: 'shadow-[0_10px_30px_-5px_rgba(0,0,0,0.8),0_0_15px_rgba(255,107,0,0.2)]',
    },
  };

  const config = typeConfig[type];

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 flex items-start gap-3 p-4 min-w-[320px] max-w-md ${config.bg} border ${config.border} ${config.shadow} rounded-xl backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300`}
      role="alert"
    >
      {config.icon}
      <div className="flex-1">
        <h4 className={`font-mono text-sm font-bold uppercase tracking-wider ${config.text}`}>
          {title}
        </h4>
        {message && <p className="text-xs text-slate-300 mt-1">{message}</p>}
      </div>
      <button
        onClick={onClose}
        className="p-1 text-slate-400 hover:text-white rounded hover:bg-[#FF6B00]/15 transition-colors cursor-pointer"
        aria-label="Dismiss toast"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
