import { Balance } from "@/components/home/Balance";
import { QuickActions } from "@/components/home/QuickActions";
import { Header } from "@/components/home/Header";
import { TransactionList } from "@/components/home/TransactionList";
import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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
    <div className="h-24 bg-gray-100 rounded-2xl"></div>
    <div className="h-40 bg-gray-100 rounded-2xl"></div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="px-4 pb-20 max-w-2xl mx-auto">
        <div className="space-y-6 mt-4">
          <Suspense fallback={<LoadingSkeleton />}>
            <Balance />
            <QuickActions />
          </Suspense>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Recent Activity</h2>
            <Suspense fallback={<div className="h-60 animate-pulse bg-gray-100 rounded-2xl"></div>}>
              <TransactionList transactions={transactions} />
            </Suspense>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;