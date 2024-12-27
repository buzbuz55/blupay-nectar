import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState, useCallback, memo } from "react";
import { PaymentAmountStep } from "./PaymentAmountStep";
import { PaymentMethodStep } from "./PaymentMethodStep";
import { PaymentReceipt } from "./PaymentReceipt";
import { CreditCard } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ErrorBoundary } from "./ErrorBoundary";

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

type PaymentStep = "amount" | "method" | "receipt";

const PaymentModal = memo(({ isOpen, onClose, recipient }: PaymentModalProps) => {
  const [amount, setAmount] = useState("0");
  const [note, setNote] = useState("");
  const [step, setStep] = useState<PaymentStep>("amount");
  const [purchaseProtection, setPurchaseProtection] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState<any>(null);
  const [transactionId, setTransactionId] = useState("");
  const { toast } = useToast();

  const handleContinue = useCallback(() => {
    setStep("method");
  }, []);

  const handleBack = useCallback(() => {
    setStep("amount");
  }, []);

  const handleSelectMethod = useCallback((method: any) => {
    setSelectedMethod(method);
    const randomId = Math.random().toString(36).substring(2, 15) + 
                    Math.random().toString(36).substring(2, 15);
    setTransactionId(randomId);
    
    toast({
      title: "Processing payment...",
      description: "Please wait while we process your payment.",
    });

    // Simulate payment processing with minimal delay
    requestAnimationFrame(() => {
      setStep("receipt");
      toast({
        title: "Payment successful!",
        description: `You've sent $${amount} to ${recipient.name}`,
      });
    });
  }, [amount, recipient.name, toast]);

  const handleAmountChange = useCallback((newAmount: string) => {
    setAmount(newAmount);
  }, []);

  const handleNoteChange = useCallback((newNote: string) => {
    setNote(newNote);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto p-0 rounded-t-[2rem] h-[90vh] mt-[10vh]">
        <ErrorBoundary>
          {step === "amount" && (
            <PaymentAmountStep
              recipient={recipient}
              amount={amount}
              note={note}
              onAmountChange={handleAmountChange}
              onNoteChange={handleNoteChange}
              onContinue={handleContinue}
            />
          )}
          
          {step === "method" && (
            <PaymentMethodStep
              amount={amount}
              onBack={handleBack}
              onSelectMethod={handleSelectMethod}
              purchaseProtection={purchaseProtection}
              onPurchaseProtectionChange={setPurchaseProtection}
            />
          )}

          {step === "receipt" && selectedMethod && (
            <PaymentReceipt
              recipient={recipient}
              amount={Number(amount)}
              transactionId={transactionId}
              paymentMethod={{
                type: selectedMethod.title,
                lastFour: selectedMethod.id === "card" ? "4880" : undefined,
                icon: selectedMethod.icon || <CreditCard className="h-6 w-6" />
              }}
              fee={selectedMethod.id === "card" ? Number(amount) * 0.03 : 0}
              timestamp={new Date()}
            />
          )}
        </ErrorBoundary>
      </DialogContent>
    </Dialog>
  );
});

PaymentModal.displayName = "PaymentModal";

export { PaymentModal };