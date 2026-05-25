'use client';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'glass';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, variant = 'default', className = '', id, ...props }, ref) => {
    const baseClass = variant === 'glass'
      ? 'w-full px-4 py-3 bg-[rgba(11,31,26,0.85)] border border-[rgba(63,163,77,0.22)] rounded-[var(--radius-md)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm outline-none backdrop-blur-sm transition-all duration-200 focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(63,163,77,0.18),0_0_16px_rgba(63,163,77,0.12)] focus:bg-[rgba(11,31,26,0.95)]'
      : 'input-field';

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-semibold mb-2"
            style={{ color: 'var(--text-secondary)' }}
          >
            {label}
          </label>
        )}
        <div className="relative group">
          {leftIcon && (
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--color-primary)] transition-colors pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            className={`
              ${baseClass}
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}
              ${error ? '!border-red-500/60 focus:!border-red-500 focus:!shadow-[0_0_0_3px_rgba(239,68,68,0.15)]' : ''}
              ${className}
            `}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none">
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-xs mt-1.5" style={{ color: 'var(--text-muted)' }}>
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
