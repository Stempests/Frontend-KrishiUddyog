'use client';

interface SkeletonProps {
  className?: string;
  height?: string;
  width?: string;
  rounded?: string;
  count?: number;
}

export const Skeleton = ({
  className = '',
  height = 'h-4',
  width = 'w-full',
  rounded = 'rounded-lg',
  count = 1,
}: SkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`skeleton ${height} ${width} ${rounded} ${className}`}
        />
      ))}
    </>
  );
};

// Card-level skeleton for dashboard widgets
export const CardSkeleton = () => (
  <div className="glass-card p-6 space-y-3">
    <Skeleton height="h-4" width="w-1/3" />
    <Skeleton height="h-8" width="w-1/2" />
    <Skeleton height="h-3" width="w-2/3" />
  </div>
);

// Table row skeleton
export const TableRowSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="space-y-2">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-4">
        <Skeleton height="h-10" width="w-1/4" />
        <Skeleton height="h-10" width="w-1/4" />
        <Skeleton height="h-10" width="w-1/4" />
        <Skeleton height="h-10" width="w-1/4" />
      </div>
    ))}
  </div>
);
