import React, { useState } from 'react';
import { ChevronLeft, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export const PaymentScreen = () => {
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  const [includeFee, setIncludeFee] = useState(true);
  const fee = 0.50;
  const availableBalance = 14879.84;

  const handleNumberClick = (num: string) => {
    if (amount.length < 8) {  // Limit to 8 digits
      setAmount(prev => {
        if (prev === '0') return num;
        return prev + num;
      });
    }
  };

  const handleDelete = () => {
    setAmount(prev => prev.slice(0, -1) || '');
  };

  const handleSendMoney = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to send",
        variant: "destructive",
      });
      return;
    }

    if (parseFloat(amount) > availableBalance) {
      toast({
        title: "Insufficient funds",
        description: "You don't have enough balance for this transfer",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Money sent successfully",
      description: `$${amount} has been sent to Gabriella Ingrid`,
    });
    navigate('/pay');
  };

  const formattedAmount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(parseFloat(amount) || 0);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white">
        <div className="flex items-center gap-4">
          <Link to="/pay" className="p-2">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-semibold">Send money to</h1>
        </div>
        <button className="p-2">
          <Info className="h-6 w-6" />
        </button>
      </div>

      {/* Recipient Info */}
      <div className="flex flex-col items-center gap-2 p-6">
        <Avatar className="h-16 w-16 bg-purple-500">
          <AvatarFallback>GI</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold">Gabriella Ingrid</h2>
        <p className="text-gray-500 text-sm">Linkae • 8393 7322 8383</p>
      </div>

      {/* Amount Input */}
      <div className="flex flex-col items-center gap-4 px-6">
        <div className="flex items-center gap-2">
          <span className="text-4xl font-semibold">$</span>
          <span className="text-4xl font-semibold">{formattedAmount}</span>
        </div>
        <button className="flex items-center gap-1 px-4 py-2 rounded-full bg-gray-100">
          <span>USD</span>
        </button>
      </div>

      {/* Fee and Balance Info */}
      <div className="px-6 mt-4 space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Include Fee:</span>
          <span>${fee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Available Balance</span>
          <span>${availableBalance.toFixed(2)}</span>
        </div>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-4 p-6 mt-auto">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num.toString())}
            className="h-14 text-2xl font-medium rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleNumberClick('.')}
          className="h-14 text-2xl font-medium rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          .
        </button>
        <button
          onClick={() => handleNumberClick('0')}
          className="h-14 text-2xl font-medium rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          0
        </button>
        <button
          onClick={handleDelete}
          className="h-14 text-2xl font-medium rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          ←
        </button>
      </div>

      {/* Send Button */}
      <div className="p-6">
        <Button 
          onClick={handleSendMoney}
          className="w-full h-14 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
        >
          Send Money
        </Button>
      </div>
    </div>
  );
};