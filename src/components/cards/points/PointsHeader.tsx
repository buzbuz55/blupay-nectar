import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface PointsHeaderProps {
  currentPoints: number;
  nextRewardThreshold: number;
  progress: number;
}

export const PointsHeader = ({ currentPoints, nextRewardThreshold, progress }: PointsHeaderProps) => {
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