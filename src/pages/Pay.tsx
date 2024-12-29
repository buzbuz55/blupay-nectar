import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { NumberPad } from "@/components/payment/NumberPad";

const PayPage = () => {
  const [amount, setAmount] = useState('0');
  const { toast } = useToast();

  const handleNumberClick = (num: string) => {
    if (amount === '0' && num !== '.') {
      setAmount(num);
    } else if (amount.includes('.') && num === '.') {
      return;
    } else if (amount.split('.')[1]?.length >= 2 && amount.includes('.')) {
      return;
    } else {
      setAmount(prev => prev + num);
    }
  };

  const handleDelete = () => {
    setAmount(prev => {
      if (prev.length === 1) return '0';
      return prev.slice(0, -1);
    });
  };

  const handleClear = () => {
    setAmount('0');
  };

  const handlePay = () => {
    toast({
      title: "Payment initiated",
      description: `Amount: $${amount}`,
    });
  };

  const handleRequest = () => {
    toast({
      title: "Payment request created",
      description: `Amount: $${amount}`,
    });
  };

  return (
    <div className="h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50 to-white/80 p-4 flex flex-col">
      <Card className="flex-1 p-6 flex flex-col gap-6">
        <div className="text-center space-y-4">
          <Avatar className="h-16 w-16 mx-auto">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>KC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Payment</h2>
            <p className="text-sm text-gray-500">Enter amount to pay or request</p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-5xl font-semibold flex items-center">
            <span className="text-3xl mr-2">$</span>
            <span>{amount}</span>
          </div>
        </div>

        <div className="space-y-4">
          <NumberPad 
            onNumberClick={handleNumberClick} 
            onDelete={handleDelete}
            onClear={handleClear}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline"
              size="lg"
              onClick={handleRequest}
              className="text-lg"
            >
              Request
            </Button>
            <Button 
              size="lg"
              onClick={handlePay}
              className="text-lg"
            >
              Pay
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PayPage;