import React, { useState } from 'react';
import { ChevronLeft, X, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { NumberPad } from './NumberPad';
import { ContactsDirectory } from './ContactsDirectory';

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

  const formattedAmount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(parseFloat(amount) || 0);

  return (
    <div className="h-screen bg-white flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <Link to="/pay" className="p-2">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <Link to="/pay" className="p-2">
          <X className="h-6 w-6" />
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 pt-8 pb-6 gap-8">
        <div className="text-center space-y-2">
          {selectedContact ? (
            <>
              <Avatar className="h-20 w-20 mx-auto">
                <AvatarImage src={selectedContact.avatar} />
                <AvatarFallback>{selectedContact.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold mt-4">{selectedContact.name}</h2>
              <p className="text-sm text-gray-500">{selectedContact.email || selectedContact.phone}</p>
            </>
          ) : (
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              onClick={() => setIsContactsOpen(true)}
            >
              <Users className="h-5 w-5" />
              Select Contact
            </Button>
          )}
        </div>

        <div className="text-center space-y-4 flex-1 flex flex-col justify-center">
          <div className="flex items-center justify-center text-5xl font-semibold">
            <span>$</span>
            <span>{formattedAmount}</span>
          </div>
          <input
            type="text"
            placeholder="What's this for?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-4 text-center bg-gray-50 rounded-xl text-gray-600 placeholder:text-gray-400"
          />
        </div>

        <div className="w-full space-y-4">
          <NumberPad 
            onNumberClick={handleNumberClick} 
            onDelete={handleDelete}
            onClear={handleClear}
          />
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline"
              className="w-full h-12 text-lg"
              onClick={() => setAmount('')}
            >
              Request
            </Button>
            <Button 
              className="w-full h-12 text-lg"
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