import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { AddParticipant } from "../split/AddParticipant";
import { ParticipantsList } from "../split/ParticipantsList";
import { AmountInput } from "../split/AmountInput";
import { Participant, SplitStep } from "../split/types";

export const SplitPayment = () => {
  const [step, setStep] = useState<SplitStep>('participants');
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
      { 
        id: newId, 
        identifier: newParticipant.trim(), 
        share: 0,
        percentage: participants.length === 0 ? 100 : 0 
      }
    ]);
    setNewParticipant('');
  };

  const handleRemoveParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  const handlePercentageChange = (id: string, percentage: number) => {
    setParticipants(participants.map(p => 
      p.id === id ? { ...p, percentage } : p
    ));
  };

  const handleNext = () => {
    if (step === 'participants' && participants.length > 0) {
      setStep('amount');
    } else if (step === 'amount' && amount) {
      setStep('percentages');
    } else if (step === 'percentages') {
      const totalPercentage = participants.reduce((sum, p) => sum + (p.percentage || 0), 0);
      if (Math.abs(totalPercentage - 100) > 0.01) {
        toast({
          title: "Invalid percentages",
          description: "Percentages must add up to 100%",
          variant: "destructive",
        });
        return;
      }
      setStep('confirm');
      recalculateShares();
    }
  };

  const handleBack = () => {
    if (step === 'amount') {
      setStep('participants');
    } else if (step === 'percentages') {
      setStep('amount');
    } else if (step === 'confirm') {
      setStep('percentages');
    }
  };

  const recalculateShares = () => {
    if (participants.length === 0 || !amount) return;
    
    const totalAmount = parseFloat(amount);
    setParticipants(participants.map(p => ({
      ...p,
      share: Number(((p.percentage || 0) / 100 * totalAmount).toFixed(2))
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
                <AddParticipant
                  value={newParticipant}
                  onChange={setNewParticipant}
                  onAdd={handleAddParticipant}
                />
                <ParticipantsList
                  participants={participants}
                  onRemove={handleRemoveParticipant}
                />
              </div>
            </div>

            <div className={cn(
              "transition-all duration-300",
              step !== 'amount' && "hidden"
            )}>
              <AmountInput
                value={amount}
                onChange={setAmount}
              />
            </div>

            <div className={cn(
              "transition-all duration-300",
              step !== 'percentages' && "hidden"
            )}>
              <div className="space-y-4">
                <ParticipantsList
                  participants={participants}
                  onRemove={handleRemoveParticipant}
                  showPercentages
                  onPercentageChange={handlePercentageChange}
                />
              </div>
            </div>

            <div className={cn(
              "transition-all duration-300",
              step !== 'confirm' && "hidden"
            )}>
              <div className="space-y-4">
                <ParticipantsList
                  participants={participants}
                  onRemove={handleRemoveParticipant}
                />
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