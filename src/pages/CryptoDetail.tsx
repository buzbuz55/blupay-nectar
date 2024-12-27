import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const mockData = [
  { date: "Jan", price: 42000 },
  { date: "Feb", price: 45000 },
  { date: "Mar", price: 47000 },
  { date: "Apr", price: 44000 },
  { date: "May", price: 46000 },
  { date: "Jun", price: 48000 },
  { date: "Jul", price: 50000 },
];

const CryptoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sellAmount, setSellAmount] = useState("");

  const handleSell = () => {
    if (!sellAmount || parseFloat(sellAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to sell",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Sell order placed",
      description: `Selling ${sellAmount} ${id?.toUpperCase()} at market price`,
    });
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/crypto")}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold">{id?.toUpperCase()} Price Chart</h1>
      </div>

      <div className="h-[400px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0066FF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0066FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#0066FF"
              fillOpacity={1}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-end mb-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Sell {id?.toUpperCase()}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sell {id?.toUpperCase()}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount to sell</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={sellAmount}
                  onChange={(e) => setSellAmount(e.target.value)}
                />
              </div>
              <Button onClick={handleSell} className="w-full">
                Confirm Sell
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CryptoDetail;