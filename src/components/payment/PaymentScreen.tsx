import React, { useState } from 'react';
import { ChevronLeft, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { NumberPad } from './NumberPad';

export const PaymentScreen = () => {
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

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
      <div className="flex-none">
        <div className="flex justify-between items-center p-4">
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

        <div className="flex flex-col items-center gap-2 p-4">
          <Avatar className="h-16 w-16 bg-purple-500">
            <AvatarFallback>GI</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold">Gabriella Ingrid</h2>
          <p className="text-gray-500 text-sm">Linkae • 8393 7322 8383</p>
        </div>

        <div className="flex flex-col items-center gap-2 p-4">
          <div className="flex items-center gap-2">
            <span className="text-4xl font-semibold">$</span>
            <span className="text-4xl font-semibold">{formattedAmount}</span>
          </div>
          <button className="flex items-center gap-1 px-4 py-2 rounded-full bg-gray-100">
            <span>USD</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end p-4 gap-4">
        <NumberPad onNumberClick={handleNumberClick} onDelete={handleDelete} />
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