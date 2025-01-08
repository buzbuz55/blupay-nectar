import { useState, useMemo, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';

export type TransferMethod = 'standard' | 'zelle';
export type SearchMode = 'email' | 'phone';

interface UsePaymentFormProps {
  onSuccess?: () => void;
}

export const usePaymentForm = ({ onSuccess }: UsePaymentFormProps = {}) => {
  const [amount, setAmount] = useState('0');
  const [recipient, setRecipient] = useState('');
  const [searchMode, setSearchMode] = useState<SearchMode>('email');
  const [transferMethod, setTransferMethod] = useState<TransferMethod>('standard');
  const [bankName, setBankName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleNumberClick = useCallback((num: string) => {
    if (amount === '0' && num !== '.') {
      setAmount(num);
    } else if (amount.includes('.') && num === '.') {
      return;
    } else if (amount.split('.')[1]?.length >= 2 && amount.includes('.')) {
      return;
    } else {
      setAmount(prev => prev + num);
    }
  }, [amount]);

  const handleDelete = useCallback(() => {
    setAmount(prev => {
      if (prev.length === 1) return '0';
      return prev.slice(0, -1);
    });
  }, []);

  const handleClear = useCallback(() => {
    setAmount('0');
  }, []);

  const toggleSearchMode = useCallback(() => {
    setSearchMode(prev => prev === 'email' ? 'phone' : 'email');
    setRecipient('');
  }, []);

  const validationError = useMemo(() => {
    if (!recipient) {
      return "Please enter recipient's email or phone number";
    }
    if (searchMode === 'email' && !recipient.includes('@')) {
      return "Please enter a valid email address";
    }
    if (searchMode === 'phone' && !/^\d{10}$/.test(recipient.replace(/\D/g, ''))) {
      return "Please enter a valid 10-digit phone number";
    }
    if (parseFloat(amount) <= 0) {
      return "Please enter a valid amount";
    }
    if (transferMethod === 'zelle' && !bankName.trim()) {
      return "Please enter the recipient's bank name for Zelle transfers";
    }
    return null;
  }, [recipient, searchMode, amount, transferMethod, bankName]);

  const handlePayment = async () => {
    if (validationError) {
      toast({
        title: "Invalid Input",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
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
          transfer_method: transferMethod,
          recipient_bank_info: transferMethod === 'zelle' ? { bank_name: bankName } : null,
        });

      if (error) throw error;

      toast({
        title: "Payment sent!",
        description: `$${amount} sent to ${recipient} via ${transferMethod === 'zelle' ? 'Zelle' : 'standard transfer'}`,
      });

      onSuccess?.();
      navigate('/');
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    amount,
    recipient,
    searchMode,
    transferMethod,
    bankName,
    isProcessing,
    validationError,
    setRecipient,
    setBankName,
    setTransferMethod,
    handleNumberClick,
    handleDelete,
    handleClear,
    toggleSearchMode,
    handlePayment,
  };
};