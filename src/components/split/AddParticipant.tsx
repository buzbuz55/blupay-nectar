import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddParticipantProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

export const AddParticipant = ({ value, onChange, onAdd }: AddParticipantProps) => {
  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="Add email, username, or phone"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onAdd();
          }
        }}
      />
      <Button onClick={onAdd} size="icon">
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};