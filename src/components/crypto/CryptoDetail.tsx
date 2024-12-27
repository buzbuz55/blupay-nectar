import { CryptoAsset } from "@/types/crypto";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown, X } from "lucide-react";
import { CryptoChart } from "./CryptoChart";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface CryptoDetailProps {
  crypto: CryptoAsset;
  onClose: () => void;
}

export const CryptoDetail = ({ crypto, onClose }: CryptoDetailProps) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("24");
  const { toast } = useToast();
  const [amount, setAmount] = useState("");

  const handlePurchase = () => {
    toast({
      title: "Purchase Initiated",
      description: `Starting purchase of ${amount} ${crypto.symbol.toUpperCase()}`,
    });
  };

  const timeRanges = [
    { label: "1H", value: "1" },
    { label: "24H", value: "24" },
    { label: "7D", value: "7" },
    { label: "1M", value: "30" },
    { label: "1Y", value: "365" },
  ];

  return (
    <Card className="relative p-6 backdrop-blur-sm bg-white/10 border-none shadow-lg">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>
      
      <div className="flex items-center gap-4 mb-6">
        <img src={crypto.image} alt={crypto.name} className="w-12 h-12" />
        <div>
          <h2 className="text-2xl font-bold">{crypto.symbol.toUpperCase()}</h2>
          <p className="text-muted-foreground">{crypto.name}</p>
        </div>
        <div className="ml-auto">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600">
                Buy
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Purchase {crypto.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount to purchase</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-background/50 backdrop-blur-sm"
                  />
                  <p className="text-sm text-muted-foreground">
                    Total: ${amount ? (parseFloat(amount) * crypto.current_price).toFixed(2) : "0.00"}
                  </p>
                </div>
                <Button onClick={handlePurchase} className="w-full bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600">
                  Purchase {crypto.symbol.toUpperCase()}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-3xl font-bold">
              ${crypto.current_price.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              Market Cap: ${(crypto.market_cap / 1000000).toFixed(2)}M
            </p>
          </div>
          <div className={`flex items-center gap-1 ${
            crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {crypto.price_change_percentage_24h >= 0 ? (
              <ArrowUp className="w-6 h-6" />
            ) : (
              <ArrowDown className="w-6 h-6" />
            )}
            <span className="text-xl">{Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%</span>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-4">
          {timeRanges.map((range) => (
            <Button
              key={range.value}
              variant={selectedTimeRange === range.value ? "default" : "outline"}
              onClick={() => setSelectedTimeRange(range.value)}
              className="w-full"
            >
              {range.label}
            </Button>
          ))}
        </div>

        <div className="h-[400px]">
          <CryptoChart
            cryptoId={crypto.id}
            days={selectedTimeRange}
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  );
};