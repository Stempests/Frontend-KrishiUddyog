'use client';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
}

const sizeStyles: Record<Size, string> = {
  sm: 'py-2 px-3 text-xs',
  md: 'py-3 px-5 text-sm',
  lg: 'py-4 px-8 text-base',
};

const variantStyles: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'nav-item border border-transparent hover:border-opacity-20',
  danger: 'btn-secondary text-red-400 border-red-500/50 hover:bg-red-500/10',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, fullWidth, children, className = '', disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={!disabled && !loading ? { scale: 0.96 } : {}}
        disabled={disabled || loading}
        className={`
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? 'w-full justify-center' : ''}
          ${loading ? 'opacity-70 cursor-not-allowed' : ''}
          ${className}
        `}
        {...props}
      >
        {loading && <span className="animate-spin mr-2">⏳</span>}
        {children as React.ReactNode}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
