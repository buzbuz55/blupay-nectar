import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, DollarSign } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface Participant {
  id: string;
  identifier: string;
  share: number;
}

export const SplitPayment = () => {
  const [step, setStep] = useState<'participants' | 'amount' | 'confirm'>('participants');
  const [amount, setAmount] = useState('');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [newParticipant, setNewParticipant] = useState('');
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

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
  };

  const handleRemoveParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  const handleNext = () => {
    if (step === 'participants' && participants.length > 0) {
      setStep('amount');
    } else if (step === 'amount' && amount) {
      setStep('confirm');
      recalculateShares();
    }
  };

  const handleBack = () => {
    if (step === 'amount') {
      setStep('participants');
    } else if (step === 'confirm') {
      setStep('amount');
    }
  };

  const recalculateShares = () => {
    if (participants.length === 0 || !amount) return;
    
    const totalAmount = parseFloat(amount);
    const sharePerPerson = totalAmount / participants.length;
    
    setParticipants(participants.map(p => ({
      ...p,
      share: Number(sharePerPerson.toFixed(2))
    })));
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
    setIsOpen(false);
    setStep('participants');
    setAmount('');
    setParticipants([]);
  };

  return (
    <div className="space-y-4">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full h-[120px] rounded-2xl border-2 border-dashed hover:border-solid"
          >
            <div className="flex flex-col items-center gap-2">
              <Plus className="w-6 h-6" />
              <span className="text-lg font-medium">Split Payment</span>
            </div>
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[90vh]">
          <SheetHeader>
            <SheetTitle>Split Payment</SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-6">
            <div className={cn(
              "transition-all duration-300",
              step !== 'participants' && "hidden"
            )}>
              <div className="space-y-4">
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
                      <button
                        onClick={() => handleRemoveParticipant(participant.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={cn(
              "transition-all duration-300",
              step !== 'amount' && "hidden"
            )}>
              <div className="space-y-4">
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className={cn(
              "transition-all duration-300",
              step !== 'confirm' && "hidden"
            )}>
              <div className="space-y-4">
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
                    <span className="font-medium">${participant.share}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              {step !== 'participants' && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1"
                >
                  Back
                </Button>
              )}
              {step !== 'confirm' ? (
                <Button
                  onClick={handleNext}
                  className="flex-1"
                  disabled={
                    (step === 'participants' && participants.length === 0) ||
                    (step === 'amount' && !amount)
                  }
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSplitBill}
                  className="flex-1"
                >
                  Split Bill
                </Button>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};