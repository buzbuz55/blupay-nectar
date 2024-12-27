import { useState } from "react";
import { QRScanner } from "@/components/qr/QRScanner";
import { Button } from "@/components/ui/button";
import { QrCode, ChartLine, ArrowUp, ArrowDown, Settings } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

const CryptoCard = ({ crypto }: { crypto: CryptoAsset }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="flex items-center justify-between py-4 border-b cursor-pointer"
      onClick={() => navigate(`/crypto/${crypto.id}`)}
    >
      <div className="flex items-center gap-3">
        <img src={crypto.image} alt={crypto.name} className="w-8 h-8" />
        <div>
          <h3 className="font-medium">{crypto.name}</h3>
          <p className="text-sm text-gray-500">{crypto.symbol.toUpperCase()}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">${crypto.current_price.toLocaleString()}</p>
        <p className={`text-sm ${
          crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
        }`}>
          {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
          {crypto.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

const PurchaseDialog = ({ crypto }: { crypto: CryptoAsset }) => {
  const [amount, setAmount] = useState("");
  const { toast } = useToast();

  const handlePurchase = () => {
    toast({
      title: "Purchase Initiated",
      description: `Starting purchase of ${amount} ${crypto.symbol.toUpperCase()}`,
    });
  };

  return (
    <DialogContent>
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
          />
          <p className="text-sm text-muted-foreground">
            Total: ${amount ? (parseFloat(amount) * crypto.current_price).toFixed(2) : "0.00"}
          </p>
        </div>
        <Button onClick={handlePurchase} className="w-full">
          Purchase {crypto.symbol.toUpperCase()}
        </Button>
      </div>
    </DialogContent>
  );
};

const CryptoPage = () => {
  const [showScanner, setShowScanner] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: cryptos, isLoading } = useQuery({
    queryKey: ['cryptos'],
    queryFn: async () => {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch crypto data');
      }
      return response.json() as Promise<CryptoAsset[]>;
    },
    refetchInterval: 30000,
  });

  const handleScanClick = () => {
    setShowScanner(true);
    toast({
      title: "QR Scanner Activated",
      description: "Position the QR code within the frame to scan",
    });
  };

  if (showScanner) {
    return <QRScanner />;
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Crypto</h1>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate('/settings')}
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="text-left">
          <p className="text-gray-600">Your crypto balance</p>
          <h2 className="text-4xl font-bold">$0</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full bg-blue-500 hover:bg-blue-600">Buy</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Select Cryptocurrency</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {cryptos?.map((crypto) => (
                  <div 
                    key={crypto.id}
                    className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
                    onClick={() => navigate(`/crypto/${crypto.id}`)}
                  >
                    <div className="flex items-center gap-2">
                      <img src={crypto.image} alt={crypto.name} className="w-6 h-6" />
                      <span>{crypto.name}</span>
                    </div>
                    <span>${crypto.current_price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleScanClick}
          >
            Receive
          </Button>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Explore more crypto</h3>
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="py-4 border-b">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-12 w-[200px]" />
                  <Skeleton className="h-8 w-[100px]" />
                </div>
              </div>
            ))
          ) : (
            <div className="space-y-2">
              {cryptos?.map((crypto) => (
                <CryptoCard key={crypto.id} crypto={crypto} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoPage;