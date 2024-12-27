import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, DollarSign } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Participant {
  id: string;
  identifier: string; // email, username, or phone
  share: number;
}

export const SplitPayment = () => {
  const [amount, setAmount] = useState('');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [newParticipant, setNewParticipant] = useState('');
  const { toast } = useToast();

  const handleAddParticipant = () => {
    if (!newParticipant.trim()) {
      toast({
        title: "Invalid input",
        description: "Please enter a valid email, username, or phone number",
        variant: "destructive",
      });
      return;
    }

    const newId = Math.random().toString(36).substr(2, 9);
    setParticipants([
      ...participants,
      { id: newId, identifier: newParticipant.trim(), share: 0 }
    ]);
    setNewParticipant('');
    recalculateShares([...participants, { id: newId, identifier: newParticipant.trim(), share: 0 }]);
  };

  const handleRemoveParticipant = (id: string) => {
    const updatedParticipants = participants.filter(p => p.id !== id);
    setParticipants(updatedParticipants);
    recalculateShares(updatedParticipants);
  };

  const recalculateShares = (currentParticipants: Participant[]) => {
    if (currentParticipants.length === 0 || !amount) return;
    
    const totalAmount = parseFloat(amount);
    const sharePerPerson = totalAmount / currentParticipants.length;
    
    const updatedParticipants = currentParticipants.map(p => ({
      ...p,
      share: Number(sharePerPerson.toFixed(2))
    }));
    
    setParticipants(updatedParticipants);
  };

  const handleSplitBill = () => {
    if (!amount || participants.length === 0) {
      toast({
        title: "Cannot split bill",
        description: "Please enter an amount and add at least one participant",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Bill split successfully",
      description: `Split $${amount} between ${participants.length} people`,
    });
  };

  return (
    <div className="space-y-4 bg-white p-4 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold">Split Payment</h2>
      
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              recalculateShares(participants);
            }}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Add email, username, or phone"
          value={newParticipant}
          onChange={(e) => setNewParticipant(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleAddParticipant();
            }
          }}
        />
        <Button onClick={handleAddParticipant} size="icon">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                {participant.identifier[0].toUpperCase()}
              </div>
              <span>{participant.identifier}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">${participant.share}</span>
              <button
                onClick={() => handleRemoveParticipant(participant.id)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {participants.length > 0 && (
        <Button 
          onClick={handleSplitBill}
          className="w-full bg-blupay-primary hover:bg-blupay-primary/90"
        >
          Split ${amount || '0'} ({participants.length} people)
        </Button>
      )}
    </div>
  );
};