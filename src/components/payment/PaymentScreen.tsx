import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { NumberPad } from "@/components/payment/NumberPad";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import { Search, Mail, Phone } from 'lucide-react';

const PayPage = () => {
  const [amount, setAmount] = useState('0');
  const [recipient, setRecipient] = useState('');
  const [searchMode, setSearchMode] = useState<'email' | 'phone'>('email');
  const { toast } = useToast();
  const navigate = useNavigate();

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

  const toggleSearchMode = () => {
    setSearchMode(prev => prev === 'email' ? 'phone' : 'email');
    setRecipient('');
  };

  const handlePay = async () => {
    if (!recipient) {
      toast({
        title: "Recipient required",
        description: "Please enter an email or phone number",
        variant: "destructive",
      });
      return;
    }

    if (parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to make payments",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('transactions')
        .insert({
          sender_id: user.id,
          recipient_identifier: recipient,
          amount: parseFloat(amount),
          type: 'payment',
          status: 'completed',
        });

      if (error) throw error;

      toast({
        title: "Payment sent!",
        description: `$${amount} sent to ${recipient}`,
      });

      navigate('/');
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50 to-white/80 p-4 flex flex-col">
      <Card className="flex-1 p-6 flex flex-col gap-6">
        <div className="text-center space-y-4">
          <Avatar className="h-16 w-16 mx-auto">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>TO</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Pay To</h2>
            <p className="text-sm text-gray-500">Enter recipient details</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center">
              {searchMode === 'email' ? (
                <Mail className="h-5 w-5 text-gray-400" />
              ) : (
                <Phone className="h-5 w-5 text-gray-400" />
              )}
            </div>
            <Input
              type={searchMode === 'email' ? 'email' : 'tel'}
              placeholder={searchMode === 'email' ? 'Enter email address' : 'Enter phone number'}
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="pl-10 pr-24"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSearchMode}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              Switch to {searchMode === 'email' ? 'Phone' : 'Email'}
            </Button>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="text-5xl font-semibold flex items-center">
              <span className="text-3xl mr-2">$</span>
              <span>{amount}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <NumberPad 
            onNumberClick={handleNumberClick} 
            onDelete={handleDelete}
            onClear={handleClear}
          />
          
          <Button 
            size="lg"
            onClick={handlePay}
            className="w-full text-lg"
          >
            Pay
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PayPage;