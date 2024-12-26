import { Balance } from "@/components/home/Balance";
import { QuickActions } from "@/components/home/QuickActions";
import { BottomNav } from "@/components/layout/BottomNav";
import { Header } from "@/components/home/Header";
import { TransactionList } from "@/components/home/TransactionList";
import { Button } from "@/components/ui/button";
import { useState, useMemo, Suspense } from "react";

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
  const [activeTab, setActiveTab] = useState<'wallet' | 'transactions'>('wallet');
  
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => 
      activeTab === 'wallet' ? t.amount < 0 : true
    );
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div className="p-4">Loading header...</div>}>
        <Header />
      </Suspense>
      
      <main className="p-4 pb-20">
        <Suspense fallback={<div className="h-24 animate-pulse bg-gray-100 rounded-lg"></div>}>
          <QuickActions />
        </Suspense>
        
        <Suspense fallback={<div className="h-40 animate-pulse bg-gray-100 rounded-lg mt-4"></div>}>
          <Balance />
        </Suspense>
        
        <div className="flex justify-between mb-4">
          <Button
            variant={activeTab === 'wallet' ? 'default' : 'outline'}
            onClick={() => setActiveTab('wallet')}
            className="px-6 py-2 rounded-full transition-colors"
          >
            Wallet
          </Button>
          <Button
            variant={activeTab === 'transactions' ? 'default' : 'outline'}
            onClick={() => setActiveTab('transactions')}
            className="px-6 py-2 rounded-full transition-colors"
          >
            Transactions
          </Button>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Completed</h2>
          <Suspense fallback={<div className="h-60 animate-pulse bg-gray-100 rounded-lg"></div>}>
            <TransactionList transactions={filteredTransactions} />
          </Suspense>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Index;