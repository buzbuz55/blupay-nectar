import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Star, Users, Wallet, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Ways to Earn Points</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Info className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>BluPay Points System</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <section>
                  <h4 className="font-semibold mb-2">Points System Overview</h4>
                  <p className="text-sm text-gray-600">
                    Our points system encourages user engagement and interaction within the app. Points earned can be redeemed for prizes or converted into monetary value, providing tangible rewards for loyalty and app usage.
                  </p>
                </section>

                <section>
                  <h4 className="font-semibold mb-2">Points Earning Breakdown</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Opening an Account: 50,000 points</li>
                    <li>• Sending Money: 10 points per transaction</li>
                    <li>• Adding Contacts: 10 points per contact</li>
                    <li>• Sharing the App: 5,000 points (once per user)</li>
                    <li>• Regular App Usage: 5,000 points</li>
                    <li>• Adding Friends: 2,000 points per friend</li>
                    <li>• 5-Star Review: 10,000 points</li>
                  </ul>
                </section>

                <section>
                  <h4 className="font-semibold mb-2">Monetary Redemption</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    10,000 points = $200.00
                  </p>
                  <p className="text-sm text-gray-600">
                    For every 10,000 points, users can receive $200 in gift cards, cash back, or other monetary forms.
                  </p>
                </section>

                <section>
                  <h4 className="font-semibold mb-2">Redemption Options</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Gift Cards: Various retailers (Amazon, Walmart, Starbucks)</li>
                    <li>• Cashback: Direct deposit or statement credit</li>
                    <li>• Other Prizes: Electronic gadgets, exclusive features, event tickets</li>
                  </ul>
                </section>

                <section>
                  <h4 className="font-semibold mb-2">Bonus Multipliers & Special Offers</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Referral Program:</strong> When you refer a friend who opens an account and uses the app, both of you receive an additional 5,000 points.</p>
                    <p><strong>Limited-Time Promotions:</strong> Special events or challenges that offer bonus points for completing specific tasks.</p>
                  </div>
                </section>

                <section>
                  <h4 className="font-semibold mb-2">Important Notes</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Points expire after 12 months of inactivity</li>
                    <li>• Regular app usage extends point expiration</li>
                    <li>• Higher conversion rate compared to other reward programs</li>
                  </ul>
                </section>
              </div>
            </DialogContent>
          </Dialog>
        </div>
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