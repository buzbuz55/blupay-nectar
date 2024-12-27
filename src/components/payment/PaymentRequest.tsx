import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const PaymentRequest = () => {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [recipient, setRecipient] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !recipient) {
      toast({
        title: "Missing information",
        description: "Please enter an amount and recipient",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Payment request sent",
      description: `Request for $${amount} sent to ${recipient}`,
    });

    // Reset form
    setAmount("");
    setNote("");
    setRecipient("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white/80 p-6">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900">Request Payment</h1>
          <p className="text-gray-500">Send a payment request with a custom message</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">From</label>
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
              <Avatar className="h-10 w-10">
                <AvatarImage src="" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">Me</div>
                <div className="text-sm text-gray-500">@myusername</div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">To</label>
            <Input
              placeholder="Enter username or email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="bg-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Amount ($)</label>
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-white text-2xl font-semibold"
              min="0"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Add a note
              <span className="text-gray-400 ml-1">(optional)</span>
            </label>
            <Textarea
              placeholder="What's it for?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="bg-white min-h-[100px]"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-blue-500 hover:bg-blue-600"
          >
            <Send className="w-4 h-4 mr-2" />
            Send Request
          </Button>
        </form>
      </div>
    </div>
  );
};