import { useState } from "react";
import { QRScanner } from "@/components/qr/QRScanner";
import { Button } from "@/components/ui/button";
import { QrCode, ChartLine, ArrowUp, ArrowDown } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CryptoChart } from "@/components/crypto/CryptoChart";
import { fetchWithRetry } from "@/utils/api";

interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

const timeRanges = [
  { label: "1H", value: "1" },
  { label: "24H", value: "24" },
  { label: "7D", value: "7" },
  { label: "1M", value: "30" },
  { label: "1Y", value: "365" },
] as const;

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
  );
};

const CryptoCard = ({ crypto }: { crypto: CryptoAsset }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<typeof timeRanges[number]["value"]>("24");

  return (
    <Card className="overflow-hidden backdrop-blur-sm bg-white/10 border-none shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">
          <div className="flex items-center gap-2">
            <img src={crypto.image} alt={crypto.name} className="w-8 h-8" />
            <div className="flex flex-col">
              <span>{crypto.symbol.toUpperCase()}</span>
              <span className="text-sm text-muted-foreground">{crypto.name}</span>
            </div>
          </div>
        </CardTitle>
        <ChartLine className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold">
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
                <ArrowUp className="w-4 h-4" />
              ) : (
                <ArrowDown className="w-4 h-4" />
              )}
              <span>{Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%</span>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-gradient-to-r from-blue-500/10 to-violet-500/10 hover:from-blue-500/20 hover:to-violet-500/20 border-none"
                >
                  Buy
                </Button>
              </DialogTrigger>
              <PurchaseDialog crypto={crypto} />
            </Dialog>
          </div>
          
          <Tabs defaultValue="24" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-background/50">
              {timeRanges.map((range) => (
                <TabsTrigger
                  key={range.value}
                  value={range.value}
                  onClick={() => setSelectedTimeRange(range.value)}
                  className="data-[state=active]:bg-primary/20"
                >
                  {range.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {timeRanges.map((range) => (
              <TabsContent key={range.value} value={range.value} className="h-[200px]">
                <CryptoChart 
                  cryptoId={crypto.id} 
                  days={range.value} 
                  className="w-full h-full" 
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

const CryptoPage = () => {
  const [showScanner, setShowScanner] = useState(false);
  const { toast } = useToast();

  const { data: cryptos, isLoading, error } = useQuery({
    queryKey: ['cryptos'],
    queryFn: async () => {
      const data = await fetchWithRetry(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      );
      return data as CryptoAsset[];
    },
    staleTime: 60000,
    gcTime: 300000, // renamed from cacheTime
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * Math.pow(2, attemptIndex), 10000),
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
    <div className="p-4 space-y-6 pb-20 min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500">
          Crypto
        </h1>
        <Button 
          onClick={handleScanClick}
          variant="outline"
          className="flex items-center gap-2 bg-background/50 backdrop-blur-sm border-none"
        >
          <QrCode className="w-4 h-4" />
          Scan
        </Button>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          Array(3).fill(0).map((_, i) => (
            <Card key={i} className="w-full backdrop-blur-sm bg-white/10 border-none">
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
