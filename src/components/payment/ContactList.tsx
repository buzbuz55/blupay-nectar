import { Contact } from "./types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ContactListProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
}

export const ContactList = ({ contacts, onSelectContact }: ContactListProps) => {
  return (
    <div className="max-h-[300px] overflow-y-auto space-y-2">
      {contacts.map((contact) => (
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
  );
};