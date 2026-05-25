'use client';
import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  glass?: boolean;
  hover?: boolean;
  glow?: 'green' | 'blue' | 'gold' | 'none';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'elevated' | 'feature-blue' | 'feature-green' | 'feature-gold' | 'feature-teal';
}

const paddingStyles = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
};

const variantStyles = {
  default:        'glass-card',
  elevated:       'glass-card-elevated',
  'feature-blue': 'feature-card feature-card-blue',
  'feature-green':'feature-card feature-card-green',
  'feature-gold': 'feature-card feature-card-gold',
  'feature-teal': 'feature-card feature-card-teal',
};

const glowHoverClass = {
  green: 'hover:shadow-[0_8px_40px_rgba(0,0,0,0.55),0_0_28px_rgba(63,163,77,0.35)] hover:border-[rgba(125,255,138,0.45)]',
  blue:  'hover:shadow-[0_8px_40px_rgba(0,0,0,0.55),0_0_28px_rgba(77,168,218,0.35)] hover:border-[rgba(77,168,218,0.50)]',
  gold:  'hover:shadow-[0_8px_40px_rgba(0,0,0,0.55),0_0_28px_rgba(212,160,23,0.35)] hover:border-[rgba(212,160,23,0.50)]',
  none:  '',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hover = true, glow = 'green', padding = 'md', variant = 'default', children, className = '', ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hover ? { y: -4, transition: { duration: 0.2, ease: 'easeOut' } } : {}}
        className={`
          ${variantStyles[variant]}
          ${glow !== 'none' && variant === 'default' ? glowHoverClass[glow] : ''}
          ${paddingStyles[padding]}
          ${className}
        `}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
