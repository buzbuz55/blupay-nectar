import { Skeleton } from "@/components/ui/skeleton";

export const LoadingFallback = () => {
  return (
    <div className="p-4 w-full h-screen flex items-center justify-center">
      <div className="space-y-4 w-full max-w-md">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-8 w-1/2" />
      </div>
    </div>
  );
};