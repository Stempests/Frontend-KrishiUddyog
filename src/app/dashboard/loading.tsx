import { CardSkeleton, Skeleton } from '@/components/ui/Skeleton';

export default function DashboardLoading() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Skeleton height="h-8" width="w-48" className="mb-2" />
          <Skeleton height="h-4" width="w-64" />
        </div>
        <Skeleton height="h-10" width="w-32" rounded="rounded-full" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        
        <div className="xl:col-span-2 glass-card p-6 h-[280px] relative overflow-hidden">
          <Skeleton height="h-6" width="w-1/4" className="mb-6" />
          <Skeleton height="h-[200px]" width="w-full" rounded="rounded-xl" />
        </div>
        
        <div className="glass-card p-6 h-[280px] relative overflow-hidden">
          <Skeleton height="h-6" width="w-1/3" className="mb-6" />
          <Skeleton height="h-[200px]" width="w-full" rounded="rounded-xl" />
        </div>
      </div>
    </div>
  );
}
