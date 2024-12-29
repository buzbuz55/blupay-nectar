import React from 'react';
import { Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

interface RecipientSectionProps {
  selectedContact: Contact | null;
  onOpenContacts: () => void;
}

export const RecipientSection = ({ selectedContact, onOpenContacts }: RecipientSectionProps) => {
  return (
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
          onClick={onOpenContacts}
        >
          <Users className="h-5 w-5" />
          Select Contact
        </Button>
      )}
    </div>
  );
};