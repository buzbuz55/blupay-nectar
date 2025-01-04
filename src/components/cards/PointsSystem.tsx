import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Star, Users, Wallet } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const PointsSystem = () => {
  // Mock data - in a real app this would come from your backend
  const currentPoints = 65000;
  const nextRewardThreshold = 70000;
  const progress = (currentPoints / nextRewardThreshold) * 100;

  const pointsActivities = [
    { icon: Wallet, name: "Opening Account", points: 50000 },
    { icon: Users, name: "Adding Friends", points: 2000 },
    { icon: Star, name: "5-Star Review", points: 10000 },
    { icon: Gift, name: "Sharing App", points: 5000 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">BluPay Points</h2>
      
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

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Ways to Earn Points</h3>
        <div className="grid gap-4">
          {pointsActivities.map((activity, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <activity.icon className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{activity.name}</p>
                <p className="text-sm text-gray-500">{activity.points.toLocaleString()} points</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};