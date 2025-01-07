import { Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ContactsDirectory } from "@/components/payment/ContactsDirectory";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

// Example contacts data
const exampleContacts = [
  { id: '1', name: 'John Smith', email: 'john@example.com', avatar: '' },
  { id: '2', name: 'Sarah Wilson', email: 'sarah@example.com', avatar: '' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', avatar: '' },
];

export const QuickActions = () => {
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSendMoney = (contact: { id: string; email: string; name: string }) => {
    navigate('/pay', { 
      state: { 
        recipient: contact.email,
        recipientName: contact.name
      } 
    });
  };

  return (
    <>
      <div className="space-y-4 mb-6">
        {/* Search and View All Contacts Button */}
        <Button
          variant="outline"
          className="w-full flex items-center justify-between gap-2 p-4 h-auto"
          onClick={() => setIsContactsOpen(true)}
        >
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-blupay-primary" />
            <span className="text-blupay-primary font-medium">Search Contacts</span>
          </div>
          <span className="text-sm text-gray-500">View All</span>
        </Button>

        {/* Quick Access Friends */}
        <div className="grid grid-cols-2 gap-4">
          {exampleContacts.slice(0, 2).map((contact) => (
            <Button
              key={contact.id}
              variant="outline"
              className="flex items-center justify-start gap-2 p-4 h-auto"
              onClick={() => handleSendMoney(contact)}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={contact.avatar} />
                <AvatarFallback>
                  {contact.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <div className="font-medium text-sm">{contact.name}</div>
                <div className="text-xs text-gray-500">Send Money</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <ContactsDirectory
        isOpen={isContactsOpen}
        onClose={() => setIsContactsOpen(false)}
        onSelectContact={(contact) => {
          handleSendMoney(contact);
          setIsContactsOpen(false);
        }}
      />
    </>
  );
};