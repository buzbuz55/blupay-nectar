import { useState, useRef, useEffect } from "react";
import { QRScanner } from "@/components/qr/QRScanner";
import { Button } from "@/components/ui/button";
import { Settings, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CryptoList } from "@/components/crypto/CryptoList";
import { CryptoAsset } from "@/types/crypto";

const CryptoPage = () => {
  const [showScanner, setShowScanner] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [startY, setStartY] = useState(0);
  const [pulling, setPulling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: cryptos, isLoading, refetch } = useQuery({
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

  const handleRefresh = async () => {
    await refetch();
    toast({
      title: "Refreshed",
      description: "Crypto data has been updated",
    });
  };

  const handleTouchStart = (e: TouchEvent) => {
    const scrollTop = document.documentElement.scrollTop;
    if (scrollTop <= 0) {
      setStartY(e.touches[0].pageY);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (startY) {
      const currentY = e.touches[0].pageY;
      const diff = currentY - startY;
      if (diff > 50) {
        setPulling(true);
      }
    }
  };

  const handleTouchEnd = () => {
    if (pulling) {
      handleRefresh();
    }
    setStartY(0);
    setPulling(false);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart);
      container.addEventListener('touchmove', handleTouchMove);
      container.addEventListener('touchend', handleTouchEnd);

      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [startY, pulling]);

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
    <div ref={containerRef} className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Crypto</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            className="hover:bg-gray-100"
          >
            <RefreshCw className="w-5 h-5" />
          </Button>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate('/settings')}
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {pulling && (
        <div className="absolute top-0 left-0 w-full text-center text-sm text-gray-500 py-2">
          Release to refresh...
        </div>
      )}

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
                <CryptoList cryptos={cryptos} isLoading={isLoading} />
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
          <CryptoList cryptos={cryptos} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default CryptoPage;