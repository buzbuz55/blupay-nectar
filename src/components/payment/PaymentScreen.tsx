import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { NumberPad } from './NumberPad';
import { ContactsDirectory } from './ContactsDirectory';
import { PaymentHeader } from './PaymentHeader';
import { RecipientSection } from './RecipientSection';
import { AmountSection } from './AmountSection';

interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

export const PaymentScreen = () => {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const { toast } = useToast();

  const handleNumberClick = (num: string) => {
    if (amount.length < 8) {
      setAmount(prev => {
        if (prev === '0') return num;
        return prev + num;
      });
    }
  };

  const handleDelete = () => {
    setAmount(prev => prev.slice(0, -1) || '');
  };

  const handleClear = () => {
    setAmount('');
  };

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    setIsContactsOpen(false);
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

    if (!selectedContact) {
      toast({
        title: "Select recipient",
        description: "Please select a recipient from your contacts",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Money sent successfully",
      description: `$${amount} has been sent to ${selectedContact.name}`,
    });
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      <PaymentHeader />

      <main className="flex-1 flex flex-col items-center px-4 pt-4">
        <RecipientSection
          selectedContact={selectedContact}
          onOpenContacts={() => setIsContactsOpen(true)}
        />

        <AmountSection
          amount={amount}
          note={note}
          onNoteChange={setNote}
        />

        <div className="w-full mt-auto mb-4">
          <NumberPad 
            onNumberClick={handleNumberClick} 
            onDelete={handleDelete}
            onClear={handleClear}
          />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Button 
              variant="outline"
              className="w-full h-12 text-lg"
              onClick={() => setAmount('')}
            >
              Request
            </Button>
            <Button 
              className="w-full h-12 text-lg bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600"
              onClick={handleSendMoney}
            >
              Pay
            </Button>
          </div>
        </div>
      </main>

      <ContactsDirectory
        isOpen={isContactsOpen}
        onClose={() => setIsContactsOpen(false)}
        onSelectContact={handleSelectContact}
      />
    </div>
  );
};