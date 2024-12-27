import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

export const LoadingFallback = memo(() => {
  return (
    <div className="p-4 w-full min-h-screen bg-background animate-in fade-in-0">
      <div className="space-y-4 w-full max-w-md mx-auto">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-8 w-1/2" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </div>
  );
});

LoadingFallback.displayName = "LoadingFallback";