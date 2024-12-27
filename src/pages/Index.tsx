import { Balance } from "@/components/home/Balance";
import { QuickActions } from "@/components/home/QuickActions";
import { Header } from "@/components/home/Header";
import { TransactionList } from "@/components/home/TransactionList";
import { Button } from "@/components/ui/button";
import { useState, useMemo, Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LazyBalance = lazy(() => import("@/components/home/Balance").then(module => ({ default: module.Balance })));
const LazyQuickActions = lazy(() => import("@/components/home/QuickActions").then(module => ({ default: module.QuickActions })));

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

const LoadingSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-24 bg-app-card rounded-2xl"></div>
    <div className="h-40 bg-app-card rounded-2xl"></div>
  </div>
);

const Index = () => {
  const [activeTab, setActiveTab] = useState<'wallet' | 'transactions'>('wallet');
  
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => 
      activeTab === 'wallet' ? t.amount < 0 : true
    );
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-app-dark text-white">
      <Header />
      
      <main className="p-4 pb-20">
        <Suspense fallback={<LoadingSkeleton />}>
          <LazyQuickActions />
          <LazyBalance />
        </Suspense>
        
        <div className="flex justify-between mb-4 p-2 bg-app-card rounded-2xl backdrop-blur-lg">
          <Button
            variant={activeTab === 'wallet' ? 'default' : 'outline'}
            onClick={() => setActiveTab('wallet')}
            className={`px-6 py-2 rounded-xl transition-all duration-200 ${
              activeTab === 'wallet' 
                ? 'bg-neon-green text-black hover:bg-neon-green/90' 
                : 'text-neon-green border-neon-green/20 hover:bg-neon-green/10'
            }`}
          >
            Wallet
          </Button>
          <Button
            variant={activeTab === 'transactions' ? 'default' : 'outline'}
            onClick={() => setActiveTab('transactions')}
            className={`px-6 py-2 rounded-xl transition-all duration-200 ${
              activeTab === 'transactions' 
                ? 'bg-neon-green text-black hover:bg-neon-green/90' 
                : 'text-neon-green border-neon-green/20 hover:bg-neon-green/10'
            }`}
          >
            Transactions
          </Button>
        </div>
        
        <div className="bg-app-card rounded-2xl p-4 backdrop-blur-lg">
          <h2 className="text-xl font-semibold mb-4 bg-gradient-neon text-transparent bg-clip-text">
            Completed
          </h2>
          <Suspense fallback={<div className="h-60 animate-pulse bg-app-card rounded-xl"></div>}>
            <TransactionList transactions={filteredTransactions} />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default Index;