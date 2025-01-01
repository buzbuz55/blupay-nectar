import { Button } from "@/components/ui/button";
import { Building2, CreditCard, DollarSign } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export const ConnectMethods = () => {
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
  );
};