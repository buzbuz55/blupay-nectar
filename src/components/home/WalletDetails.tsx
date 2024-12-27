import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Wallet } from "lucide-react";

interface CardDetail {
  type: string;
  lastFour: string;
  balance: number;
  usage: number;
}

const cards: CardDetail[] = [
  { type: "Credit", lastFour: "4582", balance: 2500.00, usage: 65 },
  { type: "Debit", lastFour: "8923", balance: 12379.84, usage: 30 }
];

export const WalletDetails = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">My Cards</h2>
        <Button variant="ghost" size="sm" className="text-blue-600">
          View All
        </Button>
      </div>
      
      <div className="grid gap-4">
        {cards.map((card) => (
          <Card key={card.lastFour} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {card.type === "Credit" ? (
                    <CreditCard className="w-5 h-5 text-gray-600" />
                  ) : (
                    <Wallet className="w-5 h-5 text-gray-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{card.type} Card</p>
                  <p className="text-sm text-gray-500">****{card.lastFour}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">${card.balance.toLocaleString()}</p>
                <div className="text-sm text-gray-500">
                  {card.usage}% used
                </div>
              </div>
            </div>
            <div className="mt-3 bg-gray-200 h-1.5 rounded-full">
              <div 
                className="bg-blue-600 h-full rounded-full"
                style={{ width: `${card.usage}%` }}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};