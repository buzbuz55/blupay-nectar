import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export const PointsInfoDialog = () => {
  return (
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

          <a 
            href="https://blupay.com/prizes" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block text-sm text-blue-600 hover:text-blue-800 text-center pt-4 border-t"
          >
            Visit BluPay.com/prizes for the full list of this month's prizes
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};