import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

interface PointsHeaderProps {
  currentPoints: number;
  nextRewardThreshold: number;
  progress: number;
  isLoading: boolean;
}

export const PointsHeader = ({ 
  currentPoints, 
  nextRewardThreshold, 
  progress,
  isLoading 
}: PointsHeaderProps) => {
  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="space-y-6">
          <div className="text-center">
            <Skeleton className="h-8 w-32 mx-auto mb-2" />
            <Skeleton className="h-4 w-24 mx-auto" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-2 w-full" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-blue-600">{currentPoints.toLocaleString()}</h3>
          <p className="text-gray-500">Available Points</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress to next reward</span>
            <span className="font-medium">{nextRewardThreshold.toLocaleString()} points</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button className="w-full">
            Redeem Points
          </Button>
          <Button variant="outline" className="w-full">
            View History
          </Button>
        </div>
      </div>
    </Card>
  );
};