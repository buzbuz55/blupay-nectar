import { useState, useRef } from "react";
import { QRScanner } from "@/components/qr/QRScanner";
import { Button } from "@/components/ui/button";
import { Settings, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CryptoList } from "@/components/crypto/CryptoList";
import { CryptoAsset } from "@/types/crypto";
import { usePullRefresh } from "@/hooks/use-pull-refresh";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CORS_PROXY = "https://cors-proxy.fringe.zone/";
const COINGECKO_API = "https://api.coingecko.com/api/v3";

const CryptoPage = () => {
  const [showScanner, setShowScanner] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: cryptos, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['cryptos'],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${CORS_PROXY}${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`
        );
        
        if (response.status === 429) {
          throw new Error("Rate limit exceeded. Please try again in a minute.");
        }
        
        if (!response.ok) {
          throw new Error('Failed to fetch crypto data');
        }
        
        return response.json() as Promise<CryptoAsset[]>;
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(err.message);
        }
        throw new Error('Failed to fetch crypto data');
      }
    },
    retry: 1,
    refetchInterval: 30000, // Reduced to 30 seconds to avoid rate limits
  });

  const handleRefresh = async () => {
    try {
      await refetch();
      toast({
        title: "Refreshed",
        description: "Crypto data has been updated",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to refresh data",
        variant: "destructive",
      });
    }
  };

  const { pulling, refreshing } = usePullRefresh(containerRef, {
    onRefresh: handleRefresh,
    threshold: 50,
    refreshMessage: "Crypto prices updated",
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
    <div 
      ref={containerRef} 
      className="p-4 space-y-6 min-h-screen bg-gray-50 relative"
    >
      <div className={`absolute top-0 left-0 w-full flex items-center justify-center transition-transform duration-200 pointer-events-none ${
        pulling || refreshing ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="bg-white rounded-full p-2 shadow-lg">
          <RefreshCw 
            className={`w-6 h-6 text-gray-600 ${refreshing ? 'animate-spin' : ''}`} 
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Crypto</h1>
        </div>
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

        {isError && (
          <Alert variant="destructive">
            <AlertDescription>
              {error instanceof Error ? error.message : "Failed to load crypto data"}
            </AlertDescription>
          </Alert>
        )}

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
                <CryptoList 
                  cryptos={cryptos} 
                  isLoading={isLoading} 
                  onRefresh={handleRefresh}
                />
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
          <CryptoList 
            cryptos={cryptos} 
            isLoading={isLoading} 
            onRefresh={handleRefresh}
          />
        </div>
      </div>
    </div>
  );
};

export default CryptoPage;