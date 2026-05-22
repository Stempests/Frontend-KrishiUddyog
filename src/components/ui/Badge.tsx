'use client';

type BadgeVariant = 'green' | 'yellow' | 'red' | 'blue' | 'purple';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantMap: Record<BadgeVariant, string> = {
  green: 'badge-green',
  yellow: 'badge-yellow',
  red: 'badge-red',
  blue: 'badge-blue',
  purple: 'bg-violet-500/20 text-violet-400 border border-violet-500/30',
};

export const Badge = ({ variant = 'green', children, className = '' }: BadgeProps) => {
  return (
    <span className={`badge ${variantMap[variant]} ${className}`}>
      {children}
    </span>
  );
};
