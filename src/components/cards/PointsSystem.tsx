import { Card } from "@/components/ui/card";
import { Gift, Star, Users, Wallet, Crown, Gem } from "lucide-react";
import { PointsHeader } from "./points/PointsHeader";
import { PointsActivitiesList } from "./points/PointsActivitiesList";
import { LuxuryItemsDialog } from "./points/LuxuryItemsDialog";
import { PointsInfoDialog } from "./points/PointsInfoDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const PointsSystem = () => {
  // Mock data - in a real app this would come from your backend
  const currentPoints = 65000;
  const nextRewardThreshold = 70000;
  const progress = (currentPoints / nextRewardThreshold) * 100;

  const pointsActivities = [
    { 
      icon: Wallet, 
      name: "Opening Account", 
      points: 50000,
      milestones: [
        { threshold: 1, points: 50000, description: "First account creation" },
        { threshold: 30, points: 10000, description: "Active for 30 days" },
        { threshold: 90, points: 25000, description: "Active for 90 days" }
      ]
    },
    { 
      icon: Users, 
      name: "Adding Friends", 
      points: 2000,
      milestones: [
        { threshold: 1, points: 2000, description: "First friend added" },
        { threshold: 5, points: 5000, description: "5 friends milestone" },
        { threshold: 10, points: 10000, description: "10 friends milestone" }
      ]
    },
    { 
      icon: Star, 
      name: "5-Star Review", 
      points: 10000,
      milestones: [
        { threshold: 1, points: 10000, description: "First review" },
        { threshold: 5, points: 15000, description: "5 reviews milestone" }
      ]
    },
    { 
      icon: Gift, 
      name: "Sharing App", 
      points: 5000,
      milestones: [
        { threshold: 1, points: 5000, description: "First share" },
        { threshold: 5, points: 7500, description: "5 shares milestone" },
        { threshold: 10, points: 15000, description: "10 shares milestone" }
      ]
    },
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
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-purple-600">
                  <Gem className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>THE BLUCLUB - Exclusive Access</DialogTitle>
                </DialogHeader>
                <div className="space-y-8 py-4">
                  <p className="text-sm text-gray-600">
                    Welcome to THE BLUCLUB - where luxury meets exclusivity. As a BLUCLUB member, you gain access to an extraordinary world of privileges and experiences.
                  </p>

                  <section>
                    <h4 className="font-semibold mb-4">Premium Destinations</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h5 className="font-medium text-purple-800">Private Lounges</h5>
                        <p className="text-sm text-purple-600">Access to exclusive airport lounges worldwide</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h5 className="font-medium text-purple-800">Luxury Resorts</h5>
                        <p className="text-sm text-purple-600">Special rates at 5-star resorts and spas</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h5 className="font-medium text-purple-800">VIP Events</h5>
                        <p className="text-sm text-purple-600">Priority access to exclusive events and concerts</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h5 className="font-medium text-purple-800">Fine Dining</h5>
                        <p className="text-sm text-purple-600">Reserved tables at Michelin-starred restaurants</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-4">Exclusive Perks</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <div className="mt-1 p-1 bg-purple-100 rounded">
                          <Crown className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">24/7 Concierge Service</p>
                          <p className="text-sm text-gray-600">Personal assistance anytime, anywhere</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 p-1 bg-purple-100 rounded">
                          <Crown className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">Priority Booking</p>
                          <p className="text-sm text-gray-600">First access to limited events and experiences</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 p-1 bg-purple-100 rounded">
                          <Crown className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">Enhanced Points Earning</p>
                          <p className="text-sm text-gray-600">2x points on all transactions</p>
                        </div>
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-4">Club Access</h4>
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-purple-100 to-blue-50 rounded-lg">
                        <h5 className="font-medium mb-2">Private Members Clubs</h5>
                        <p className="text-sm text-gray-600">Access to an exclusive network of private members clubs in major cities worldwide.</p>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-purple-100 to-blue-50 rounded-lg">
                        <h5 className="font-medium mb-2">Luxury Fitness Centers</h5>
                        <p className="text-sm text-gray-600">Complimentary access to premium fitness clubs and wellness centers.</p>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-purple-100 to-blue-50 rounded-lg">
                        <h5 className="font-medium mb-2">Golf Clubs</h5>
                        <p className="text-sm text-gray-600">Access to prestigious golf clubs and preferred tee times.</p>
                      </div>
                    </div>
                  </section>

                  <div className="text-center pt-4">
                    <a href="https://blupay.com/bluclub" className="text-sm text-purple-600 hover:text-purple-700">
                      Visit BluPay.com/bluclub for complete membership details →
                    </a>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <LuxuryItemsDialog categories={luxuryCategories} />
            <PointsInfoDialog />
          </div>
        </div>
        <PointsActivitiesList activities={pointsActivities} />
      </Card>
    </div>
  );
};