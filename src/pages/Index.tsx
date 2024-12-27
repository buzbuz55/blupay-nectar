import { Balance } from "@/components/home/Balance";
import { QuickActions } from "@/components/home/QuickActions";
import { Header } from "@/components/home/Header";
import { TransactionList } from "@/components/home/TransactionList";
import { Button } from "@/components/ui/button";
import { SplitPayment } from "@/components/home/SplitPayment";
import { useState, useMemo, Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { TransactionFilter } from "@/components/transaction/TransactionFilter";

// Lazy load components that aren't immediately visible
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
    <div className="h-24 bg-gray-200 rounded-lg"></div>
    <div className="h-40 bg-gray-200 rounded-lg"></div>
  </div>
);

const Index = () => {
  const [activeTab, setActiveTab] = useState<'wallet' | 'transactions'>('wallet');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [amountFilter, setAmountFilter] = useState("");
  
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(t => activeTab === 'wallet' ? t.amount < 0 : true)
      .filter(t => {
        const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesAmount = !amountFilter || Math.abs(t.amount) === parseFloat(amountFilter);
        const matchesCategory = selectedCategory === "all" || true; // Add categories to transactions to make this work
        return matchesSearch && matchesAmount && matchesCategory;
      });
  }, [activeTab, searchTerm, selectedCategory, amountFilter]);

  const handleFilterChange = (search: string, category: string, amount: string) => {
    setSearchTerm(search);
    setSelectedCategory(category);
    setAmountFilter(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="p-4 pb-20">
        <Suspense fallback={<LoadingSkeleton />}>
          <LazyQuickActions />
          <LazyBalance />
        </Suspense>
        
        <SplitPayment />
        
        <div className="flex justify-between mb-4 mt-6">
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
          <TransactionFilter 
            onSearchChange={setSearchTerm}
            onCategoryChange={setSelectedCategory}
            onAmountChange={setAmountFilter}
          />
          <div className="mt-4">
            <Suspense fallback={<div className="h-60 animate-pulse bg-gray-100 rounded-lg"></div>}>
              <TransactionList transactions={filteredTransactions} />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;