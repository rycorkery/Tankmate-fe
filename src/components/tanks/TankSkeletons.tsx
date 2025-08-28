import { Skeleton } from "@/components/ui/LoadingState";
import { TankmateCard, TankmateCardContent, TankmateCardHeader } from "@/components/custom";

export function TankCardSkeleton() {
  return (
    <TankmateCard className="h-full">
      <TankmateCardHeader>
        <div className="flex items-center justify-between">
          <Skeleton variant="text" width="60%" height={24} />
          <Skeleton variant="rounded" width={60} height={24} />
        </div>
      </TankmateCardHeader>
      <TankmateCardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton variant="text" width="40%" height={16} />
            <Skeleton variant="text" width="100%" height={20} />
          </div>
          <div className="space-y-2">
            <Skeleton variant="text" width="30%" height={16} />
            <Skeleton variant="text" width="80%" height={20} />
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <Skeleton variant="text" width="50%" height={14} />
              <Skeleton variant="text" width="70%" height={18} />
            </div>
            <div className="space-y-1">
              <Skeleton variant="text" width="50%" height={14} />
              <Skeleton variant="text" width="70%" height={18} />
            </div>
          </div>
        </div>
      </TankmateCardContent>
    </TankmateCard>
  );
}

export function TankGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <TankCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function TankListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2 flex-1">
              <Skeleton variant="text" width="30%" height={20} />
              <Skeleton variant="text" width="50%" height={16} />
            </div>
            <Skeleton variant="rounded" width={80} height={32} />
          </div>
        </div>
      ))}
    </div>
  );
}