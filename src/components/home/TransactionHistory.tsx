import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDownLeft, ArrowUpRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TransactionMessage } from "@/components/messaging/TransactionMessage";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Transaction {
  id: string;
  type: "incoming" | "outgoing";
  name: string;
  amount: number;
  date: string;
  category: string;
}

const transactions: Transaction[] = [
  {
    id: "1",
    type: "incoming",
    name: "Sarah Johnson",
    amount: 850.00,
    date: "Today",
    category: "Transfer"
  },
  {
    id: "2",
    type: "outgoing",
    name: "Netflix",
    amount: 15.99,
    date: "Yesterday",
    category: "Entertainment"
  },
  {
    id: "3",
    type: "outgoing",
    name: "Whole Foods",
    amount: 89.32,
    date: "Yesterday",
    category: "Groceries"
  }
];

export const TransactionHistory = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <Button variant="ghost" size="sm" className="text-blue-600">
          See All
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input 
          placeholder="Search transactions" 
          className="pl-9"
        />
      </div>

      <div className="space-y-3">
        {transactions.map((transaction) => (
          <Collapsible key={transaction.id}>
            <CollapsibleTrigger className="w-full">
              <Card className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      transaction.type === "incoming" 
                        ? "bg-green-100" 
                        : "bg-red-100"
                    }`}>
                      {transaction.type === "incoming" ? (
                        <ArrowDownLeft className={`w-4 h-4 ${
                          transaction.type === "incoming"
                            ? "text-green-600"
                            : "text-red-600"
                        }`} />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.name}</p>
                      <p className="text-sm text-gray-500">{transaction.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === "incoming"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}>
                      {transaction.type === "incoming" ? "+" : "-"}
                      ${transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
              </Card>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <TransactionMessage 
                transactionId={transaction.id}
                messages={[]}
                reactions={[]}
              />
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};