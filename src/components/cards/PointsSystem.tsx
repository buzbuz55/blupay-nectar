import { Card } from "@/components/ui/card";
import { Gift, Star, Users, Wallet } from "lucide-react";
import { PointsHeader } from "./points/PointsHeader";
import { PointsActivitiesList } from "./points/PointsActivitiesList";
import { LuxuryItemsDialog } from "./points/LuxuryItemsDialog";
import { PointsInfoDialog } from "./points/PointsInfoDialog";

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

  const luxuryCategories = [
    {
      title: "High-End Electronics and Gadgets",
      items: [
        { name: 'Apple MacBook Pro 16" (2025)', points: 250000, value: 2500 },
        { name: 'Samsung QN90B Neo QLED 65"', points: 200000, value: 2000 },
        { name: "Sony WH-1000XM5 Wireless Headphones", points: 75000, value: 750 },
      ]
    },
    {
      title: "Fashion & Accessories",
      items: [
        { name: "Louis Vuitton Keepall 55 Bandoulière", points: 150000, value: 1500 },
        { name: "Gucci GG Marmont Quilted Leather Bag", points: 200000, value: 2000 },
        { name: "Rolex Submariner Date Watch", points: 500000, value: 5000 },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">BluPay Points</h2>
      
      <PointsHeader 
        currentPoints={currentPoints}
        nextRewardThreshold={nextRewardThreshold}
        progress={progress}
      />

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Ways to Earn Points</h3>
          <div className="flex gap-2">
            <LuxuryItemsDialog categories={luxuryCategories} />
            <PointsInfoDialog />
          </div>
        </div>
        <PointsActivitiesList activities={pointsActivities} />
      </Card>
    </div>
  );
};