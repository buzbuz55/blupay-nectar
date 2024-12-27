import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gift, Calendar, CreditCard, Building2, Bitcoin, Wallet } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: {
    name: string;
    username: string;
    avatarUrl?: string;
    initials: string;
  };
}

export const PaymentModal = ({ isOpen, onClose, recipient }: PaymentModalProps) => {
  const [amount, setAmount] = useState("0");
  const [note, setNote] = useState("");
  const [step, setStep] = useState<"amount" | "method">("amount");
  const [purchaseProtection, setPurchaseProtection] = useState(true);

  const handleNumberClick = (num: string) => {
    if (amount === "0") {
      setAmount(num);
    } else {
      setAmount(prev => prev + num);
    }
  };

  const handleClear = () => {
    setAmount("0");
  };

  const handleBackspace = () => {
    setAmount(prev => prev.length > 1 ? prev.slice(0, -1) : "0");
  };

  const handleContinue = () => {
    setStep("method");
  };

  const handleBack = () => {
    setStep("amount");
  };

  const paymentMethods = [
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
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto p-0 rounded-t-[2rem] h-[90vh] mt-[10vh]">
        <div className="flex flex-col h-full">
          {step === "amount" ? (
            <>
              {/* Header */}
              <div className="p-6 space-y-6 flex-shrink-0">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>8:45</span>
                  <div className="flex items-center gap-2">
                    <span>📱</span>
                    <span>🔋</span>
                  </div>
                </div>

                {/* Recipient Info */}
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={recipient.avatarUrl} />
                    <AvatarFallback>{recipient.initials}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold">{recipient.name}</h2>
                    <p className="text-gray-600">{recipient.username}</p>
                  </div>
                </div>

                {/* Amount Display */}
                <div className="text-center">
                  <div className="text-5xl font-light flex justify-center items-center gap-2">
                    <span>$</span>
                    <span>{amount}</span>
                  </div>
                </div>

                {/* Note Input */}
                <Input
                  placeholder="What's this for?"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full bg-gray-100 border-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 px-4 mb-4">
                <Button 
                  variant="outline"
                  className="py-6 text-lg font-semibold rounded-full bg-gray-100 border-none hover:bg-gray-200"
                >
                  Request
                </Button>
                <Button 
                  className="py-6 text-lg font-semibold rounded-full bg-blue-500 hover:bg-blue-600"
                  onClick={handleContinue}
                >
                  Continue
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="flex justify-end gap-4 px-4 mb-4">
                <Button variant="outline" className="rounded-full gap-2">
                  <Gift className="h-5 w-5" />
                  Gift
                </Button>
                <Button variant="outline" className="rounded-full gap-2">
                  <Calendar className="h-5 w-5" />
                  Schedule
                </Button>
              </div>

              {/* Number Pad */}
              <div className="grid grid-cols-4 gap-1 p-2 bg-gray-100 mt-auto">
                {[1, 2, 3, '÷', 4, 5, 6, '×', 7, 8, 9, '-', '.', 0, '⌫', '+'].map((key, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className={`h-16 text-xl font-light ${
                      typeof key === 'number' || key === '.'
                        ? 'bg-white hover:bg-gray-50'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                    onClick={() => {
                      if (typeof key === 'number') handleNumberClick(key.toString());
                      else if (key === '⌫') handleBackspace();
                    }}
                  >
                    {key}
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Payment Method Selection Screen */}
              <div className="p-6 space-y-6">
                <Button 
                  variant="ghost" 
                  onClick={handleBack}
                  className="mb-4"
                >
                  Back
                </Button>
                
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Payment Method</h2>
                  <p className="text-gray-600">Choose how you'd like to pay</p>
                </div>

                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      className="w-full p-4 rounded-xl border border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        // Handle payment method selection
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
                  ))}
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
                      onCheckedChange={setPurchaseProtection}
                    />
                  </div>
                </div>

                <Button 
                  className="w-full py-6 text-lg font-semibold rounded-full bg-green-500 hover:bg-green-600 text-white mt-6"
                >
                  Pay ${amount}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};