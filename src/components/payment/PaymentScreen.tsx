import React, { useState } from 'react';
import { ChevronLeft, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { NumberPad } from './NumberPad';

export const PaymentScreen = () => {
  const [amount, setAmount] = useState('');
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
    setAmount(prev => prev.slice(0, -1) || '0');
  };

  const handleClear = () => {
    setAmount('0');
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

    toast({
      title: "Money sent successfully",
      description: `$${amount} has been sent`,
    });
  };

  return (
    <div className="h-screen bg-[#22c55e] flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <Link to="/pay" className="p-2">
          <ChevronLeft className="h-6 w-6 text-white" />
        </Link>
        <div className="flex gap-4">
          <Search className="h-6 w-6 text-white" />
          <User className="h-6 w-6 text-white" />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 pt-8 pb-6">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-white text-7xl font-light mb-4">
            <span>$</span>
            <span>{amount || '0'}</span>
          </div>
          <div className="text-white/80 text-xl">USD</div>
        </div>

        <div className="w-full space-y-6">
          <NumberPad 
            onNumberClick={handleNumberClick} 
            onDelete={handleDelete}
            onClear={handleClear}
          />
          <div className="grid grid-cols-2 gap-4">
            <button 
              className="h-14 text-white text-xl font-light hover:bg-white/10 rounded-xl transition-colors"
              onClick={handleClear}
            >
              Request
            </button>
            <button 
              className="h-14 text-white text-xl font-light hover:bg-white/10 rounded-xl transition-colors"
              onClick={handleSendMoney}
            >
              Pay
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};