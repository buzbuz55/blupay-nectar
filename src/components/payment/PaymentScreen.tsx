import React, { memo } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Mail, Phone, Building2 } from 'lucide-react';
import { NumberPad } from "@/components/payment/NumberPad";
import { PaymentConfirmationDialog } from './PaymentConfirmationDialog';
import { PaymentLoadingOverlay } from './PaymentLoadingOverlay';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePaymentForm } from './hooks/usePaymentForm';
import { TransferMethod } from './hooks/usePaymentForm';

const RecipientInput = memo(({ 
  searchMode, 
  recipient, 
  onRecipientChange, 
  onToggleMode 
}: { 
  searchMode: 'email' | 'phone';
  recipient: string;
  onRecipientChange: (value: string) => void;
  onToggleMode: () => void;
}) => (
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
      onChange={(e) => onRecipientChange(e.target.value)}
      className="pl-10 pr-24"
    />
    <Button
      variant="ghost"
      size="sm"
      onClick={onToggleMode}
      className="absolute right-2 top-1/2 -translate-y-1/2"
    >
      Switch to {searchMode === 'email' ? 'Phone' : 'Email'}
    </Button>
  </div>
));

RecipientInput.displayName = 'RecipientInput';

const AmountDisplay = memo(({ amount }: { amount: string }) => (
  <div className="flex-1 flex items-center justify-center">
    <div className="text-5xl font-semibold flex items-center">
      <span className="text-3xl mr-2">$</span>
      <span>{amount}</span>
    </div>
  </div>
));

AmountDisplay.displayName = 'AmountDisplay';

const PaymentScreen = () => {
  const {
    amount,
    recipient,
    searchMode,
    transferMethod,
    bankName,
    isProcessing,
    setRecipient,
    setBankName,
    setTransferMethod,
    handleNumberClick,
    handleDelete,
    handleClear,
    toggleSearchMode,
    handlePayment,
  } = usePaymentForm();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50 to-white/80 p-4 flex flex-col">
      <Card className="flex-1 p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 max-w-md mx-auto w-full">
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
          <Select
            value={transferMethod}
            onValueChange={(value: TransferMethod) => setTransferMethod(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select transfer method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard Transfer</SelectItem>
              <SelectItem value="zelle">Zelle</SelectItem>
            </SelectContent>
          </Select>

          <RecipientInput
            searchMode={searchMode}
            recipient={recipient}
            onRecipientChange={setRecipient}
            onToggleMode={toggleSearchMode}
          />

          {transferMethod === 'zelle' && (
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center">
                <Building2 className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Enter recipient's bank name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="pl-10"
              />
            </div>
          )}

          <AmountDisplay amount={amount} />
        </div>

        <div className="space-y-4 mt-auto">
          <NumberPad 
            onNumberClick={handleNumberClick} 
            onDelete={handleDelete}
            onClear={handleClear}
          />
          
          <Button 
            size="lg"
            onClick={handlePayment}
            className="w-full text-lg"
          >
            {transferMethod === 'zelle' ? 'Send via Zelle' : 'Pay'}
          </Button>
        </div>
      </Card>

      <PaymentLoadingOverlay
        isVisible={isProcessing}
        message="Processing your payment..."
      />
    </div>
  );
};

export default PaymentScreen;