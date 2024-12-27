import { memo, useCallback, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gift, Calendar } from "lucide-react";

interface PaymentAmountStepProps {
  recipient: {
    name: string;
    username: string;
    avatarUrl?: string;
    initials: string;
  };
  amount: string;
  note: string;
  onAmountChange: (amount: string) => void;
  onNoteChange: (note: string) => void;
  onContinue: () => void;
}

export const PaymentAmountStep = memo(({
  recipient,
  amount,
  note,
  onAmountChange,
  onNoteChange,
  onContinue
}: PaymentAmountStepProps) => {
  // Memoize handlers to prevent unnecessary re-renders
  const handleNumberClick = useCallback((num: string) => {
    requestAnimationFrame(() => {
      if (amount === "0") {
        onAmountChange(num);
      } else {
        onAmountChange(amount + num);
      }
    });
  }, [amount, onAmountChange]);

  const handleBackspace = useCallback(() => {
    requestAnimationFrame(() => {
      onAmountChange(amount.length > 1 ? amount.slice(0, -1) : "0");
    });
  }, [amount, onAmountChange]);

  const handleNoteChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    requestAnimationFrame(() => {
      onNoteChange(e.target.value);
    });
  }, [onNoteChange]);

  // Memoize recipient info to prevent re-renders
  const recipientInfo = useMemo(() => (
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
  ), [recipient]);

  // Memoize number pad buttons
  const numberPadButtons = useMemo(() => {
    const buttons = [1, 2, 3, '÷', 4, 5, 6, '×', 7, 8, 9, '-', '.', 0, '⌫', '+'];
    return buttons.map((key, index) => (
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
    ));
  }, [handleNumberClick, handleBackspace]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 space-y-6 flex-shrink-0">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>8:45</span>
          <div className="flex items-center gap-2">
            <span>📱</span>
            <span>🔋</span>
          </div>
        </div>

        {recipientInfo}

        <div className="text-center">
          <div className="text-5xl font-light flex justify-center items-center gap-2">
            <span>$</span>
            <span>{amount}</span>
          </div>
        </div>

        <Input
          placeholder="What's this for?"
          value={note}
          onChange={handleNoteChange}
          className="w-full bg-gray-100 border-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 px-4 mb-4">
        <Button 
          variant="outline"
          className="py-6 text-lg font-semibold rounded-full bg-gray-100 border-none hover:bg-gray-200"
        >
          Request
        </Button>
        <Button 
          className="py-6 text-lg font-semibold rounded-full bg-blue-500 hover:bg-blue-600"
          onClick={onContinue}
        >
          Continue
        </Button>
      </div>

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

      <div className="grid grid-cols-4 gap-1 p-2 bg-gray-100 mt-auto">
        {numberPadButtons}
      </div>
    </div>
  );
});

PaymentAmountStep.displayName = "PaymentAmountStep";