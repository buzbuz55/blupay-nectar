import { Balance } from "@/components/home/Balance";
import { QuickActions } from "@/components/home/QuickActions";
import { Header } from "@/components/home/Header";
import { TransactionList } from "@/components/home/TransactionList";
import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const transactions = [
  {
    id: 1,
    name: "Sarah Johnson",
    date: "Today",
    amount: -53.56,
    isPrivate: true,
    avatar: "/lovable-uploads/photo-1581091226825-a6a2a5aee158.jpg"
  },
  {
    id: 2,
    name: "David Chen",
    date: "Today",
    amount: 204.03,
    isPrivate: false,
    avatar: "/lovable-uploads/photo-1581092795360-fd1ca04f0952.jpg"
  },
  {
    id: 3,
    name: "Maria Garcia",
    date: "Yesterday",
    amount: -24.99,
    isPrivate: false,
    avatar: "/lovable-uploads/photo-1649972904349-6e44c42644a7.jpg"
  },
  {
    id: 4,
    name: "James Wilson",
    date: "Yesterday",
    amount: 150.00,
    isPrivate: true,
    avatar: "/lovable-uploads/photo-1486312338219-ce68d2c6f44d.jpg"
  },
  {
    id: 5,
    name: "Emma Thompson",
    date: "Dec 22",
    amount: -45.50,
    isPrivate: false,
    avatar: "/lovable-uploads/photo-1501286353178-1ec881214838.jpg"
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