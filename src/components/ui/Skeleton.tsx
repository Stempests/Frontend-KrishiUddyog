'use client';
import { motion } from 'framer-motion';

export const Shimmer = ({ className = '' }: { className?: string }) => (
  <motion.div
    animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
    transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
    className={`bg-gradient-to-r from-transparent via-white/10 to-transparent bg-[length:200%_100%] absolute inset-0 ${className}`}
  />
);

export const Skeleton = ({
  className = '',
  height = 'h-4',
  width = 'w-full',
  rounded = 'rounded-lg',
  count = 1,
}: {
  className?: string;
  height?: string;
  width?: string;
  rounded?: string;
  count?: number;
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`relative overflow-hidden bg-white/5 ${height} ${width} ${rounded} ${className}`}
        >
          <Shimmer />
        </div>
      ))}
    </>
  );
};

export const CardSkeleton = () => (
  <div className="glass-card p-6 space-y-4 relative overflow-hidden border border-white/5">
    <div className="flex justify-between items-start mb-2">
      <Skeleton height="h-4" width="w-1/3" />
      <Skeleton height="h-8" width="w-8" rounded="rounded-full" />
    </div>
    <Skeleton height="h-8" width="w-1/2" />
    <Skeleton height="h-3" width="w-2/3" />
  </div>
);

export const TableRowSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-4 p-3 bg-white/5 rounded-xl relative overflow-hidden">
        <Shimmer />
        <Skeleton height="h-6" width="w-1/4" className="bg-white/10" />
        <Skeleton height="h-6" width="w-1/4" className="bg-white/10" />
        <Skeleton height="h-6" width="w-1/4" className="bg-white/10" />
        <Skeleton height="h-6" width="w-1/4" className="bg-white/10" />
      </div>
    ))}
  </div>
);

export const PulseDots = () => (
  <div className="flex gap-1.5 items-center justify-center py-2 px-1">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        animate={{ y: [0, -4, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15, ease: 'easeInOut' }}
        className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_5px_rgba(74,222,128,0.5)]"
      />
    ))}
  </div>
);

export const ScannerLine = () => (
  <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none z-10">
    <motion.div
      animate={{ y: ['-10%', '110%'] }}
      transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
      className="w-full h-[2px] bg-green-500 shadow-[0_0_20px_rgba(34,197,94,1)] relative"
    >
      <div className="absolute -top-4 inset-x-0 h-4 bg-gradient-to-t from-green-500/30 to-transparent" />
    </motion.div>
  </div>
);
