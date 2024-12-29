import { Card } from "@/components/ui/card";
import { useState } from "react";
import { WalletBalance } from "./WalletBalance";
import { CryptoBalance } from "./CryptoBalance";
import { BanksList } from "./BanksList";
import { TransactionHistory } from "./TransactionHistory";

export const Balance = () => {
  const [activeTab, setActiveTab] = useState<'wallet' | 'transactions'>('wallet');

  return (
    <Card className="p-6 space-y-6">
      <div className="flex gap-2 mb-6">
        <button
          className={`flex-1 py-2 px-4 rounded-full text-center ${
            activeTab === 'wallet' 
              ? 'bg-gray-900 text-white' 
              : 'bg-gray-100 text-gray-600'
          }`}
          onClick={() => setActiveTab('wallet')}
        >
          Wallet
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-full text-center ${
            activeTab === 'transactions' 
              ? 'bg-gray-900 text-white' 
              : 'bg-gray-100 text-gray-600'
          }`}
          onClick={() => setActiveTab('transactions')}
        >
          Transactions
        </button>
      </div>

      {activeTab === 'wallet' ? (
        <div className="space-y-6">
          <WalletBalance />
          <CryptoBalance />
          <BanksList />
        </div>
      ) : (
        <TransactionHistory />
      )}
    </Card>
  );
};