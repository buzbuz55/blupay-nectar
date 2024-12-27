import { Balance } from "@/components/home/Balance";
import { QuickActions } from "@/components/home/QuickActions";
import { Header } from "@/components/home/Header";
import { TransactionList } from "@/components/home/TransactionList";
import { Button } from "@/components/ui/button";
import { useState, useMemo, Suspense, lazy } from "react";

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
    <div className="h-24 bg-white/10 rounded-2xl"></div>
    <div className="h-40 bg-white/10 rounded-2xl"></div>
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
    <div className="min-h-screen bg-gradient-to-b from-blupay-primary to-blupay-dark font-archivo">
      <Header />
      
      <main className="p-4 pb-20">
        <Suspense fallback={<LoadingSkeleton />}>
          <LazyQuickActions />
          <LazyBalance />
        </Suspense>
        
        <div className="flex justify-between mb-4 p-2 bg-white/10 rounded-2xl backdrop-blur-lg">
          <Button
            variant={activeTab === 'wallet' ? 'default' : 'outline'}
            onClick={() => setActiveTab('wallet')}
            className={`px-6 py-2 rounded-xl transition-all duration-200 ${
              activeTab === 'wallet' 
                ? 'bg-white text-blupay-dark hover:bg-white/90 font-medium' 
                : 'text-white border-white/20 hover:bg-white/10'
            }`}
          >
            Wallet
          </Button>
          <Button
            variant={activeTab === 'transactions' ? 'default' : 'outline'}
            onClick={() => setActiveTab('transactions')}
            className={`px-6 py-2 rounded-xl transition-all duration-200 ${
              activeTab === 'transactions' 
                ? 'bg-white text-blupay-dark hover:bg-white/90 font-medium' 
                : 'text-white border-white/20 hover:bg-white/10'
            }`}
          >
            Transactions
          </Button>
        </div>
        
        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-lg">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Completed
          </h2>
          <Suspense fallback={<div className="h-60 animate-pulse bg-white/5 rounded-xl"></div>}>
            <TransactionList transactions={filteredTransactions} />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default Index;