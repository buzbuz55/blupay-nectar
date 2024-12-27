import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { RedPacketFeed } from "./RedPacketFeed";

export const RedPacket = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSendRedPacket = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Red packet sent!",
      description: "Your friends will be notified of your lucky gift!",
    });

    // Reset form
    setAmount("");
    setMessage("");
  };

  return (
    <div className="space-y-6">
      <Card className="bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-600">Send Red Packet</CardTitle>
          <CardDescription>
            Send a lucky red envelope to your friends
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Amount</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Lucky Message</label>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a lucky message"
              className="mt-1"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleSendRedPacket}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            Send Red Packet
          </Button>
        </CardFooter>
      </Card>

      <RedPacketFeed />
    </div>
  );
};