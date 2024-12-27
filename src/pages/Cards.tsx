import { Routes, Route } from "react-router-dom";
import { CardSignupIntro } from "@/components/cards/CardSignupIntro";
import { useState } from "react";
import { Settings, Plus, CreditCard, Building2, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const CardsOverview = () => {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = (method: string) => {
    setIsConnecting(true);
    toast({
      title: "Plaid Integration Required",
      description: "Backend integration with Plaid API is needed to connect payment methods securely.",
    });
    setTimeout(() => setIsConnecting(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white p-4 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">Payment Methods</h1>
          <Link to="/settings" className="text-gray-600">
            <Settings className="w-6 h-6" />
          </Link>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Developer Note */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <h2 className="font-semibold text-blue-800 mb-2">Developer Note</h2>
          <p className="text-sm text-blue-700 mb-4">
            This page requires Plaid API integration for secure bank connections. 
            Implementation steps:
          </p>
          <ol className="list-decimal list-inside text-sm text-blue-700 space-y-2">
            <li>Set up a Plaid account and obtain API keys</li>
            <li>Implement Plaid Link token creation on the backend</li>
            <li>Integrate Plaid Link SDK for secure authentication</li>
            <li>Handle token exchange and account verification</li>
          </ol>
        </Card>

        {/* Connect Methods */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Add a payment method</h2>
          
          <Button
            variant="outline"
            className="w-full justify-start h-auto p-4 bg-white"
            onClick={() => handleConnect("bank")}
            disabled={isConnecting}
          >
            <Building2 className="w-6 h-6 mr-3" />
            <div className="text-left">
              <div className="font-semibold">Connect a bank account</div>
              <div className="text-sm text-gray-500">Direct deposit, buy, and cash out</div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start h-auto p-4 bg-white"
            onClick={() => handleConnect("card")}
            disabled={isConnecting}
          >
            <CreditCard className="w-6 h-6 mr-3" />
            <div className="text-left">
              <div className="font-semibold">Add a debit or credit card</div>
              <div className="text-sm text-gray-500">Buy crypto instantly</div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start h-auto p-4 bg-white"
            onClick={() => handleConnect("paypal")}
            disabled={isConnecting}
          >
            <DollarSign className="w-6 h-6 mr-3" />
            <div className="text-left">
              <div className="font-semibold">Connect PayPal</div>
              <div className="text-sm text-gray-500">Buy and cash out with PayPal</div>
            </div>
          </Button>
        </div>

        {/* Saved Payment Methods */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your payment methods</h2>
          <Card className="p-6 text-center text-gray-500">
            <Plus className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p>No payment methods connected yet</p>
            <p className="text-sm">Add a bank account or card to get started</p>
          </Card>
        </div>
      </main>
    </div>
  );
};

const Cards = () => {
  return (
    <Routes>
      <Route index element={<CardSignupIntro />} />
      <Route path="overview" element={<CardsOverview />} />
      <Route path="credit" element={<div className="p-4">Credit Card Application Form (Coming Soon)</div>} />
      <Route path="debit" element={<div className="p-4">Debit Card Application Form (Coming Soon)</div>} />
      <Route path="crypto" element={<div className="p-4">Crypto Card Application Form (Coming Soon)</div>} />
    </Routes>
  );
};

export default Cards;