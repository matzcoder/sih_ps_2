import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'warning' | 'outline' | 'ghost' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-mono font-semibold tracking-wider uppercase transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080B12] disabled:opacity-50 disabled:cursor-not-allowed select-none rounded cursor-pointer';

  const sizeStyles = {
    xs: 'text-xs px-2.5 py-1 gap-1.5',
    sm: 'text-xs px-3.5 py-1.5 gap-2',
    md: 'text-sm px-4 py-2 gap-2.5',
    lg: 'text-base px-6 py-3 gap-3',
  };

  const variantStyles = {
    primary:
      'bg-[#FF6B00] text-[#080B12] font-bold hover:bg-[#FF8A00] hover:shadow-[0_0_20px_rgba(255,107,0,0.5)] active:scale-[0.98] focus-visible:ring-[#FF6B00] border border-[#FF6B00]',
    secondary:
      'bg-[#161F33] text-[#F8FAFC] hover:bg-[#1C273F] hover:border-[#FF6B00] border border-[rgba(255,107,0,0.3)] hover:shadow-[0_0_15px_rgba(255,107,0,0.25)] active:scale-[0.98] focus-visible:ring-[#FF6B00]',
    warning:
      'bg-[#F59E0B] text-[#080B12] font-bold hover:bg-[#D97706] hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] active:scale-[0.98] focus-visible:ring-[#F59E0B] border border-[#F59E0B]',
    outline:
      'bg-transparent text-[#FF6B00] border border-[#FF6B00] hover:bg-[#FF6B00]/10 hover:shadow-[0_0_15px_rgba(255,107,0,0.3)] focus-visible:ring-[#FF6B00]',
    ghost:
      'bg-transparent text-slate-300 hover:text-[#FF6B00] hover:bg-[#FF6B00]/10 focus-visible:ring-[#FF6B00]',
    danger:
      'bg-[#1F1215] text-[#FF4D4D] border border-[#FF4D4D]/50 hover:bg-[#2D161B] hover:shadow-[0_0_18px_rgba(255,77,77,0.4)] focus-visible:ring-[#FF4D4D]',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
      {!isLoading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </button>
  );
};
