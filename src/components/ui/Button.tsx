'use client';
import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'rain' | 'gold';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  glow?: boolean;
}

const sizeStyles: Record<Size, string> = {
  sm: 'py-2 px-3.5 text-xs gap-1.5',
  md: 'py-3 px-5 text-sm gap-2',
  lg: 'py-4 px-8 text-base gap-2.5',
};

const variantStyles: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: [
    'inline-flex items-center justify-center',
    'bg-transparent text-[var(--text-secondary)] font-medium',
    'border border-transparent rounded-[var(--radius-md)]',
    'hover:bg-[rgba(63,163,77,0.08)] hover:text-[var(--text-primary)]',
    'hover:border-[rgba(63,163,77,0.15)]',
    'transition-all duration-200',
  ].join(' '),
  danger: [
    'inline-flex items-center justify-center',
    'bg-[rgba(239,68,68,0.08)] text-red-400 font-semibold',
    'border border-[rgba(239,68,68,0.28)] rounded-[var(--radius-md)]',
    'hover:bg-[rgba(239,68,68,0.14)] hover:border-[rgba(239,68,68,0.45)]',
    'hover:shadow-[0_0_18px_rgba(239,68,68,0.20)]',
    'transition-all duration-200',
  ].join(' '),
  rain: [
    'inline-flex items-center justify-center',
    'bg-[rgba(77,168,218,0.12)] text-[#7ec8e8] font-semibold',
    'border border-[rgba(77,168,218,0.28)] rounded-[var(--radius-md)]',
    'hover:bg-[rgba(77,168,218,0.20)] hover:border-[rgba(77,168,218,0.50)]',
    'hover:shadow-[0_0_20px_rgba(77,168,218,0.25)]',
    'transition-all duration-200',
  ].join(' '),
  gold: [
    'inline-flex items-center justify-center',
    'bg-[rgba(212,160,23,0.12)] text-[#f0c040] font-semibold',
    'border border-[rgba(212,160,23,0.28)] rounded-[var(--radius-md)]',
    'hover:bg-[rgba(212,160,23,0.20)] hover:border-[rgba(212,160,23,0.50)]',
    'hover:shadow-[0_0_20px_rgba(212,160,23,0.25)]',
    'transition-all duration-200',
  ].join(' '),
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, fullWidth, glow, children, className = '', disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={!disabled && !loading ? { scale: 0.96 } : {}}
        whileHover={!disabled && !loading ? { scale: variant === 'primary' ? 1.02 : 1 } : {}}
        disabled={disabled || loading}
        className={`
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? 'w-full justify-center' : ''}
          ${loading || disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${glow && variant === 'primary' ? 'glow-breathe' : ''}
          ${className}
        `}
        {...props}
      >
        {loading && <Loader2 size={16} className="animate-spin flex-shrink-0" />}
        {children as React.ReactNode}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
