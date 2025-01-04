import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";

interface LuxuryItem {
  name: string;
  points: number;
  value: number;
}

interface LuxuryCategory {
  title: string;
  items: LuxuryItem[];
}

interface LuxuryItemsDialogProps {
  categories: LuxuryCategory[];
}

export const LuxuryItemsDialog = ({ categories }: LuxuryItemsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-amber-600">
          <Crown className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>BluPay 2025 Points System – Top 50 Luxury Goods</DialogTitle>
        </DialogHeader>
        <div className="space-y-8 py-4">
          <p className="text-sm text-gray-600">
            In addition to our premium prizes, BluPay users can redeem their points for a wide range of luxury goods. 
            These high-end items appeal to those looking to upgrade their lifestyle, treat themselves to exceptional products, 
            or enjoy exclusive experiences.
          </p>

          {categories.map((category, index) => (
            <section key={index}>
              <h4 className="font-semibold mb-4 text-lg">{category.title}</h4>
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h5 className="font-medium">{item.name}</h5>
                      <p className="text-sm text-gray-600">Value: ${item.value.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-blue-600">{item.points.toLocaleString()} points</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <section>
            <h4 className="font-semibold mb-4">How to Redeem</h4>
            <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
              <li>Browse the BluPay Prize Catalog</li>
              <li>Select Your Prize</li>
              <li>Redeem Your Points</li>
              <li>Receive Your Reward</li>
            </ol>
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