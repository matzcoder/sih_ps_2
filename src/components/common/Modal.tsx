import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
  isWarning?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = 'lg',
  isWarning = false,
}) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={`relative w-full ${maxWidthClasses[maxWidth]} bg-[#0F1523] border ${
          isWarning
            ? 'border-[#F59E0B]/70 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(245,158,11,0.25)] warning-brackets'
            : 'border-[#FF6B00]/40 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(255,107,0,0.2)] tactical-brackets'
        } rounded-xl overflow-hidden flex flex-col max-h-[90vh] text-slate-100`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header with tactical scanner line */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0B0F19] border-b border-[rgba(255,107,0,0.2)]">
          <div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isWarning ? 'bg-[#F59E0B] animate-ping' : 'bg-[#FF6B00]'}`} />
              <h3 id="modal-title" className={`font-mono text-base font-bold uppercase tracking-wider ${isWarning ? 'text-[#F59E0B]' : 'text-[#FF6B00]'}`}>
                {title}
              </h3>
            </div>
            {subtitle && <p className="text-xs font-mono text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-[#FF6B00]/15 rounded transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF6B00] cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-200 bg-[#0F1523]">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-3.5 bg-[#0B0F19] border-t border-[rgba(255,107,0,0.2)] flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
