import { Card } from "@/components/ui/card";
import { useState } from "react";
import { WalletBalance } from "./WalletBalance";
import { CryptoBalance } from "./CryptoBalance";
import { BanksList } from "./BanksList";
import { TransactionHistory } from "./TransactionHistory";

export const Balance = () => {
  const [activeTab, setActiveTab] = useState<'wallet' | 'transactions'>('wallet');

  return (
    <Card className="space-y-4">
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