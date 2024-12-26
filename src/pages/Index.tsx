import { Balance } from "@/components/home/Balance";
import { QuickActions } from "@/components/home/QuickActions";
import { BottomNav } from "@/components/layout/BottomNav";
import { Settings, Bell } from "lucide-react";

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
            <Bell className="w-6 h-6" />
            <Settings className="w-6 h-6" />
          </div>
        </div>
      </header>
      
      <main className="p-4 pb-20">
        <QuickActions />
        <Balance />
        
        <div className="flex justify-between mb-4">
          <button className="px-6 py-2 bg-gray-100 rounded-full">Wallet</button>
          <button className="px-6 py-2 bg-gray-100 rounded-full">Transactions</button>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Completed</h2>
          <div className="space-y-4">
            {/* Transaction items would go here */}
          </div>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Index;