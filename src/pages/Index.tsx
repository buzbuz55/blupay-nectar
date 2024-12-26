import { Balance } from "@/components/home/Balance";
import { QuickActions } from "@/components/home/QuickActions";
import { BottomNav } from "@/components/layout/BottomNav";
import { Settings, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const transactions = [
  {
    id: 1,
    name: "Kollel Kotel",
    date: "Dec 26",
    amount: -53.56,
    isPrivate: true,
    avatar: "KK"
  },
  {
    id: 2,
    name: "Kollel Chatzos",
    date: "Dec 24",
    amount: -104.03,
    isPrivate: true,
    avatar: "KC"
  },
  {
    id: 3,
    name: "Lillian Mbazbaz",
    date: "Dec 22",
    amount: -104.03,
    isPrivate: true,
    avatar: "LM"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blupay-primary text-white p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">H Baz ▼</h1>
            <p className="text-sm opacity-90">@bazbaz</p>
          </div>
          <div className="flex gap-4">
            <Link to="/notifications">
              <Bell className="w-6 h-6" />
            </Link>
            <Link to="/settings">
              <Settings className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </header>
      
      <main className="p-4 pb-20">
        <QuickActions />
        <Balance />
        
        <div className="flex justify-between mb-4">
          <button className="px-6 py-2 bg-white rounded-full shadow-sm border border-gray-100 text-gray-700 font-medium">
            Wallet
          </button>
          <button className="px-6 py-2 bg-white rounded-full shadow-sm border border-gray-100 text-gray-700 font-medium">
            Transactions
          </button>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Completed</h2>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-medium">
                    {transaction.avatar}
                  </div>
                  <div>
                    <h3 className="font-medium">{transaction.name}</h3>
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
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Index;