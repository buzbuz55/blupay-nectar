import { useState } from "react";
import { QRScanner } from "@/components/qr/QRScanner";
import { Button } from "@/components/ui/button";
import { QrCode, Bitcoin, ChartLine, ArrowUp, ArrowDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
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

const PurchaseDialog = ({ crypto }: { crypto: CryptoAsset }) => {
  const [amount, setAmount] = useState("");
  const { toast } = useToast();

  const handlePurchase = () => {
    toast({
      title: "Purchase Initiated",
      description: `Starting purchase of ${amount} ${crypto.symbol.toUpperCase()}`,
    });
    // Here you would typically integrate with a payment processor
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

const CryptoCard = ({ crypto }: { crypto: CryptoAsset }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">
          <div className="flex items-center gap-2">
            <img src={crypto.image} alt={crypto.name} className="w-6 h-6" />
            {crypto.symbol.toUpperCase()}
          </div>
        </CardTitle>
        <ChartLine className="w-4 h-4 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold">
              ${crypto.current_price.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              Market Cap: ${(crypto.market_cap / 1000000).toFixed(2)}M
            </p>
          </div>
          <div className={`flex items-center gap-1 ${
            crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {crypto.price_change_percentage_24h >= 0 ? (
              <ArrowUp className="w-4 h-4" />
            ) : (
              <ArrowDown className="w-4 h-4" />
            )}
            <span>{Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%</span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">Buy</Button>
            </DialogTrigger>
            <PurchaseDialog crypto={crypto} />
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

const CryptoPage = () => {
  const [showScanner, setShowScanner] = useState(false);
  const { toast } = useToast();

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
    refetchInterval: 30000, // Refetch every 30 seconds
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
    <div className="p-4 space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Crypto</h1>
        <Button 
          onClick={handleScanClick}
          variant="outline"
          className="flex items-center gap-2"
        >
          <QrCode className="w-4 h-4" />
          Scan
        </Button>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          Array(3).fill(0).map((_, i) => (
            <Card key={i} className="w-full">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-12 w-[200px]" />
                  <Skeleton className="h-8 w-[100px]" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          cryptos?.map((crypto) => (
            <CryptoCard key={crypto.id} crypto={crypto} />
          ))
        )}
      </div>
    </div>
  );
};

export default CryptoPage;