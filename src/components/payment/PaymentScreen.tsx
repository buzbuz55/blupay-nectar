import React, { useState } from 'react';
import { ChevronLeft, Info, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { NumberPad } from './NumberPad';
import currency from 'currency.js';

const currencies = [
  { code: 'USD', symbol: '$', rate: 1 },
  { code: 'EUR', symbol: '€', rate: 0.91 },
  { code: 'GBP', symbol: '£', rate: 0.79 },
  { code: 'JPY', symbol: '¥', rate: 151.67 },
];

export const PaymentScreen = () => {
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [showCurrencies, setShowCurrencies] = useState(false);
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

  const handleCurrencySelect = (currency: typeof currencies[0]) => {
    setSelectedCurrency(currency);
    setShowCurrencies(false);
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
      description: `${selectedCurrency.symbol}${amount} has been sent to Gabriella Ingrid`,
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
            <AvatarImage src="" />
            <AvatarFallback>GI</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold">Gabriella Ingrid</h2>
          <p className="text-gray-500 text-sm">Linkae • 8393 7322 8383</p>
        </div>

        <div className="flex flex-col items-center gap-2 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-4xl font-semibold">{selectedCurrency.symbol}</span>
            <span className="text-4xl font-semibold">{formattedAmount}</span>
          </div>
          <div className="relative">
            <button 
              className="flex items-center gap-1 px-4 py-2 rounded-full bg-gray-100"
              onClick={() => setShowCurrencies(!showCurrencies)}
            >
              <span>{selectedCurrency.code}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {showCurrencies && (
              <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-lg overflow-hidden z-10">
                {currencies.map((curr) => (
                  <button
                    key={curr.code}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50"
                    onClick={() => handleCurrencySelect(curr)}
                  >
                    {curr.symbol} {curr.code}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center p-4 gap-4">
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