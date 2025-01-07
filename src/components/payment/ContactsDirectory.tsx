import { useState, useEffect } from "react";
import { UserPlus, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SearchBar } from "./SearchBar";
import { ContactList } from "./ContactList";
import { NewContactForm } from "./NewContactForm";
import type { Contact } from "./types";

interface ContactsDirectoryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectContact: (contact: Contact) => void;
}

export const ContactsDirectory = ({ isOpen, onClose, onSelectContact }: ContactsDirectoryProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [newContactMode, setNewContactMode] = useState(false);
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

  const handleAddNewContact = async (newContact: { name: string; email: string; phone: string }) => {
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
    fetchContacts();
  };

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
              <SearchBar value={searchQuery} onChange={setSearchQuery} />

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

              <ContactList contacts={filteredContacts} onSelectContact={onSelectContact} />
            </>
          ) : (
            <NewContactForm
              onCancel={() => setNewContactMode(false)}
              onSubmit={handleAddNewContact}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};