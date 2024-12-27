import { Card } from "@/components/ui/card";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

interface Transaction {
  id: number;
  name: string;
  date: string;
  amount: number;
  isPrivate: boolean;
  avatar: string;
}

export const TransactionList = memo(({ transactions }: { transactions: Transaction[] }) => {
  const navigate = useNavigate();

  const handleProfileClick = (id: number) => {
    navigate(`/profile/${id}`);
  };

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <Card key={transaction.id} className="flex items-center justify-between bg-white p-4 rounded-2xl border-0 shadow-sm hover:shadow-md transition-shadow">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleProfileClick(transaction.id)}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img 
                src={transaction.avatar} 
                alt={transaction.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{transaction.name}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                {transaction.date}
                {transaction.isPrivate && (
                  <span className="w-4 h-4">🔒</span>
                )}
              </p>
            </div>
          </div>
          <span className={`font-medium ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
            {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
          </span>
        </Card>
      ))}
    </div>
  );
});

TransactionList.displayName = "TransactionList";