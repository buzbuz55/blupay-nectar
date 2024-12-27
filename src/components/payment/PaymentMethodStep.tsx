import { memo, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CreditCard, Building2, Bitcoin, Wallet } from "lucide-react";

interface PaymentMethod {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  fee: string;
  feeAmount: string;
}

interface PaymentMethodStepProps {
  amount: string;
  onBack: () => void;
  onSelectMethod: (method: PaymentMethod) => void;
  purchaseProtection: boolean;
  onPurchaseProtectionChange: (enabled: boolean) => void;
}

export const PaymentMethodStep = memo(({
  amount,
  onBack,
  onSelectMethod,
  purchaseProtection,
  onPurchaseProtectionChange
}: PaymentMethodStepProps) => {
  // Memoize payment methods to prevent unnecessary re-renders
  const paymentMethods = useMemo(() => [
    {
      id: "card",
      title: "Bank of America - 4880",
      subtitle: "Credit •••• 4880",
      icon: <CreditCard className="h-8 w-8" />,
      fee: "3% Fee",
      feeAmount: "$0.45"
    },
    {
      id: "bank",
      title: "Direct Bank Transfer",
      subtitle: "Connect your bank",
      icon: <Building2 className="h-8 w-8" />,
      fee: "No Fee",
      feeAmount: "$0.00"
    },
    {
      id: "crypto",
      title: "Crypto",
      subtitle: "BTC, ETH, and more",
      icon: <Bitcoin className="h-8 w-8" />,
      fee: "Network Fee",
      feeAmount: "varies"
    },
    {
      id: "balance",
      title: "BluPay Balance",
      subtitle: "$245.50 available",
      icon: <Wallet className="h-8 w-8" />,
      fee: "No Fee",
      feeAmount: "$0.00"
    }
  ], []);

  // Memoize payment method buttons
  const paymentMethodButtons = useMemo(() => (
    paymentMethods.map((method) => (
      <button
        key={method.id}
        className="w-full p-4 rounded-xl border border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors"
        onClick={() => {
          requestAnimationFrame(() => onSelectMethod(method));
        }}
      >
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-full bg-gray-100">
            {method.icon}
          </div>
          <div className="text-left">
            <div className="font-semibold">{method.title}</div>
            <div className="text-sm text-gray-600">{method.subtitle}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium">{method.fee}</div>
          <div className="text-sm text-gray-600">{method.feeAmount}</div>
        </div>
      </button>
    ))
  ), [paymentMethods, onSelectMethod]);

  return (
    <div className="p-6 space-y-6">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-4"
      >
        Back
      </Button>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Payment Method</h2>
        <p className="text-gray-600">Choose how you'd like to pay</p>
      </div>

      <div className="space-y-4">
        {paymentMethodButtons}
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200">
          <div>
            <h3 className="font-semibold">Turn on for purchases</h3>
            <p className="text-sm text-gray-600">
              Get a full refund if an eligible purchase isn't what you paid for.
            </p>
          </div>
          <Switch
            checked={purchaseProtection}
            onCheckedChange={(checked) => {
              requestAnimationFrame(() => onPurchaseProtectionChange(checked));
            }}
          />
        </div>
      </div>

      <Button 
        className="w-full py-6 text-lg font-semibold rounded-full bg-green-500 hover:bg-green-600 text-white mt-6"
      >
        Pay ${amount}
      </Button>
    </div>
  );
});

PaymentMethodStep.displayName = "PaymentMethodStep";