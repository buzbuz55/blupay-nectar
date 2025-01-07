import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";

interface NewContactFormProps {
  onCancel: () => void;
  onSubmit: (contact: { name: string; email: string; phone: string }) => void;
}

export const NewContactForm = ({ onCancel, onSubmit }: NewContactFormProps) => {
  const [newContact, setNewContact] = useState({ name: "", email: "", phone: "" });

  return (
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
        <Button variant="outline" className="flex-1" onClick={onCancel}>
          Cancel
        </Button>
        <Button className="flex-1" onClick={() => onSubmit(newContact)}>
          Add Contact
        </Button>
      </div>
    </div>
  );
};