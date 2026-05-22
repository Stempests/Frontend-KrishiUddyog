'use client';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, className = '', id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            className={`input-field ${leftIcon ? 'pl-10' : ''} ${error ? 'border-red-500 focus:border-red-500' : ''} ${className}`}
            {...props}
          />
        </div>
        {error && <p className="text-red-400 text-xs mt-1">⚠️ {error}</p>}
        {hint && !error && <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{hint}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
