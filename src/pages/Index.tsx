import { Balance } from "@/components/home/Balance";
import { QuickActions } from "@/components/home/QuickActions";
import { Header } from "@/components/home/Header";
import { WalletDetails } from "@/components/home/WalletDetails";
import { TransactionHistory } from "@/components/home/TransactionHistory";
import { Button } from "@/components/ui/button";
import { useState, Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LazyBalance = lazy(() => import("@/components/home/Balance").then(module => ({ default: module.Balance })));
const LazyQuickActions = lazy(() => import("@/components/home/QuickActions").then(module => ({ default: module.QuickActions })));

const LoadingSkeleton = () => (
  <div className="space-y-2 animate-pulse">
    <div className="h-24 bg-gray-200 rounded-lg"></div>
    <div className="h-40 bg-gray-200 rounded-lg"></div>
  </div>
);

const Index = () => {
  const [activeTab, setActiveTab] = useState<'wallet' | 'transactions'>('wallet');

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <Header />
      
      <main className="flex-1 p-2 pb-16 overflow-y-auto">
        <Suspense fallback={<LoadingSkeleton />}>
          <LazyQuickActions />
          <LazyBalance />
        </Suspense>
        
        <div className="flex justify-between mb-2 mt-4">
          <Button
            variant={activeTab === 'wallet' ? 'default' : 'outline'}
            onClick={() => setActiveTab('wallet')}
            className="flex-1 mr-1 rounded-full transition-colors"
          >
            Wallet
          </Button>
          <Button
            variant={activeTab === 'transactions' ? 'default' : 'outline'}
            onClick={() => setActiveTab('transactions')}
            className="flex-1 ml-1 rounded-full transition-colors"
          >
            Transactions
          </Button>
        </div>
        
        <div className="mt-4">
          {activeTab === 'wallet' ? (
            <WalletDetails />
          ) : (
            <TransactionHistory />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;