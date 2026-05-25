'use client';

type BadgeVariant = 'green' | 'yellow' | 'red' | 'blue' | 'purple' | 'gold' | 'rain';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
  pulse?: boolean;
}

const variantMap: Record<BadgeVariant, string> = {
  green:  'badge badge-green',
  yellow: 'badge badge-yellow',
  red:    'badge badge-red',
  blue:   'badge badge-blue',
  purple: 'badge bg-[rgba(167,139,250,0.15)] text-violet-300 border border-[rgba(167,139,250,0.30)]',
  gold:   'badge bg-[rgba(212,160,23,0.15)] text-[#f0c040] border border-[rgba(212,160,23,0.35)]',
  rain:   'badge bg-[rgba(77,168,218,0.15)] text-[#7ec8e8] border border-[rgba(77,168,218,0.30)]',
};

const dotColorMap: Record<BadgeVariant, string> = {
  green:  'bg-[#7DFF8A]',
  yellow: 'bg-yellow-400',
  red:    'bg-red-400',
  blue:   'bg-blue-400',
  purple: 'bg-violet-400',
  gold:   'bg-[#D4A017]',
  rain:   'bg-[#4DA8DA]',
};

export const Badge = ({ variant = 'green', children, className = '', dot, pulse }: BadgeProps) => {
  return (
    <span className={`${variantMap[variant]} ${className}`}>
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColorMap[variant]} ${pulse ? 'animate-pulse' : ''}`} />
      )}
      {children}
    </span>
  );
};
