import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'interactive' | 'dark' | 'warning' | 'danger';
  brackets?: 'none' | 'tactical' | 'warning' | 'danger';
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  brackets = 'tactical',
  children,
  className = '',
  ...props
}) => {
  const variantStyles = {
    default: 'sig-card',
    elevated: 'sig-card-elevated',
    interactive: 'sig-card-interactive cursor-pointer',
    dark: 'sig-card-dark',
    warning: 'bg-[#0F1523] border border-[#F59E0B]/50 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.7),0_0_15px_rgba(245,158,11,0.2)]',
    danger: 'bg-[#150B0D] border border-[#FF4D4D]/50 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.7),0_0_15px_rgba(255,77,77,0.2)]',
  };

  const bracketStyles = {
    none: '',
    tactical: 'tactical-brackets',
    warning: 'warning-brackets',
    danger: 'danger-brackets',
  };

  return (
    <div
      className={`rounded-lg p-5 ${variantStyles[variant]} ${bracketStyles[brackets]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
