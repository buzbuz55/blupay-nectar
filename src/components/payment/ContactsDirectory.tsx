import { useState } from "react";
import { Search, UserPlus, Phone, Mail, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

interface ContactsDirectoryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectContact: (contact: Contact) => void;
}

export const ContactsDirectory = ({ isOpen, onClose, onSelectContact }: ContactsDirectoryProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [newContactMode, setNewContactMode] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", email: "", phone: "" });
  const { toast } = useToast();

  // Mock contacts data - in a real app, this would come from an API
  const contacts: Contact[] = [
    { id: "1", name: "John Doe", email: "john@example.com", phone: "+1234567890" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", phone: "+1987654321" },
    // Add more mock contacts as needed
  ];

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone?.includes(searchQuery)
  );

  const handleAddNewContact = () => {
    if (!newContact.name || (!newContact.email && !newContact.phone)) {
      toast({
        title: "Invalid Contact",
        description: "Please provide a name and either an email or phone number",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would make an API call to save the contact
    toast({
      title: "Contact Added",
      description: "New contact has been added successfully",
    });
    setNewContactMode(false);
    setNewContact({ name: "", email: "", phone: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send Money</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {!newContactMode ? (
            <>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search contacts, email, or phone"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => setNewContactMode(true)}
              >
                <UserPlus className="h-4 w-4" />
                Add New Contact
              </Button>

              <div className="max-h-[300px] overflow-y-auto space-y-2">
                {filteredContacts.map((contact) => (
                  <button
                    key={contact.id}
                    className="w-full p-3 flex items-center gap-3 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => onSelectContact(contact)}
                  >
                    <Avatar>
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback>{contact.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm text-gray-500">
                        {contact.email || contact.phone}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <Input
                placeholder="Name"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              />
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Email"
                  type="email"
                  value={newContact.email}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Phone Number"
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setNewContactMode(false)}
                >
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleAddNewContact}>
                  Add Contact
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};