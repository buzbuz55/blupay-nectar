import React, { useState } from 'react';
import { X, ChevronLeft, Plus, Gift, CalendarClock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const PaymentScreen = () => {
  const [amount, setAmount] = useState('0');
  const navigate = useNavigate();

  const handleNumberClick = (num: string) => {
    if (amount === '0') {
      setAmount(num);
    } else {
      setAmount(amount + num);
    }
  };

  const handleDelete = () => {
    if (amount.length > 1) {
      setAmount(amount.slice(0, -1));
    } else {
      setAmount('0');
    }
  };

  const handleDecimal = () => {
    if (!amount.includes('.')) {
      setAmount(amount + '.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <Link to="/pay" className="p-2">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <button onClick={() => navigate('/pay')} className="p-2">
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Organization Details */}
      <div className="flex flex-col items-center gap-4 p-6">
        <div className="relative">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/lovable-uploads/223a1454-fa94-4477-a9c7-62432d05a73a.png" />
            <AvatarFallback>KC</AvatarFallback>
          </Avatar>
          <button className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
            <Plus className="h-4 w-4 text-white" />
          </button>
        </div>
        <h2 className="text-2xl font-semibold">Kollel Chatzos</h2>
      </div>

      {/* Amount Input */}
      <div className="flex items-center justify-center text-5xl font-bold my-8">
        <span>$</span>
        <span>{amount}</span>
      </div>

      {/* Note Input */}
      <div className="px-4 mb-4">
        <Input 
          placeholder="What's this for?"
          className="w-full bg-gray-50 border-none text-lg"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 px-4 mb-6">
        <Button variant="outline" className="flex-1 py-6 gap-2">
          Request
        </Button>
        <Button className="flex-1 py-6 gap-2 bg-blue-500 hover:bg-blue-600">
          Pay
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="flex justify-end px-4 mb-4 gap-4">
        <button className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
          <Gift className="h-5 w-5" />
          <span>Gift</span>
        </button>
        <button className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
          <CalendarClock className="h-5 w-5" />
          <span>Schedule</span>
        </button>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-4 gap-1 p-2 mt-auto bg-gray-50">
        {[1, 2, 3, '÷', 4, 5, 6, '×', 7, 8, 9, '-', '.', 0, '⌫', '+'].map((key, index) => (
          <button
            key={index}
            onClick={() => {
              if (typeof key === 'number') handleNumberClick(key.toString());
              else if (key === '⌫') handleDelete();
              else if (key === '.') handleDecimal();
            }}
            className={`p-4 text-xl font-medium ${
              typeof key === 'number' || key === '.'
                ? 'bg-white'
                : 'bg-gray-200'
            } rounded-lg active:bg-gray-100 h-16 flex items-center justify-center`}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
};