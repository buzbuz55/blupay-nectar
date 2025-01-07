import { useState } from "react";
import { Search, UserPlus, Phone, Mail, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
  const [contacts, setContacts] = useState<Contact[]>([]);

  const handleSyncContacts = async () => {
    if ('contacts' in navigator && 'ContactsManager' in window) {
      try {
        const props = ['name', 'email', 'tel'];
        const opts = { multiple: true };
        // @ts-ignore - Contacts API is not fully typed
        const contacts = await navigator.contacts.select(props, opts);
        
        // Save contacts to Supabase
        for (const contact of contacts) {
          const { error } = await supabase.from('contacts').insert({
            name: contact.name?.[0] || 'Unknown',
            email: contact.email?.[0],
            phone: contact.tel?.[0],
            is_synced: true,
            user_id: (await supabase.auth.getUser()).data.user?.id
          });

          if (error) {
            console.error('Error saving contact:', error);
          }
        }

        toast({
          title: "Contacts Synced",
          description: `Successfully synced ${contacts.length} contacts`,
        });

        fetchContacts();
      } catch (err) {
        toast({
          title: "Sync Failed",
          description: "Could not sync contacts. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Not Supported",
        description: "Contact sync is not supported on this device.",
        variant: "destructive",
      });
    }
  };

  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('name');

    if (error) {
      toast({
        title: "Error",
        description: "Could not fetch contacts",
        variant: "destructive",
      });
      return;
    }

    setContacts(data);
  };

  const handleAddNewContact = async () => {
    if (!newContact.name || (!newContact.email && !newContact.phone)) {
      toast({
        title: "Invalid Contact",
        description: "Please provide a name and either an email or phone number",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.from('contacts').insert({
      name: newContact.name,
      email: newContact.email,
      phone: newContact.phone,
      user_id: (await supabase.auth.getUser()).data.user?.id
    });

    if (error) {
      toast({
        title: "Error",
        description: "Could not add contact",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Contact Added",
      description: "New contact has been added successfully",
    });
    
    setNewContactMode(false);
    setNewContact({ name: "", email: "", phone: "" });
    fetchContacts();
  };

  // Fetch contacts when component mounts
  useEffect(() => {
    if (isOpen) {
      fetchContacts();
    }
  }, [isOpen]);

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone?.includes(searchQuery)
  );

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contacts</DialogTitle>
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

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 justify-center gap-2"
                  onClick={() => setNewContactMode(true)}
                >
                  <UserPlus className="h-4 w-4" />
                  Add Contact
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 justify-center gap-2"
                  onClick={handleSyncContacts}
                >
                  <Phone className="h-4 w-4" />
                  Sync Device
                </Button>
              </div>

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