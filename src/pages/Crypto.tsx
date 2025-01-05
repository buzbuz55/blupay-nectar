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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullStartY, setPullStartY] = useState(0);
  const [pullMoveY, setPullMoveY] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const refreshIndicatorRef = useRef<HTMLDivElement>(null);
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
    setIsRefreshing(true);
    await refetch();
    toast({
      title: "Refreshed",
      description: "Crypto data has been updated",
    });
    setIsRefreshing(false);
    setIsPulling(false);
    setPullMoveY(0);
  };

  const handleTouchStart = (e: TouchEvent) => {
    const scrollTop = document.documentElement.scrollTop;
    if (scrollTop <= 0) {
      setPullStartY(e.touches[0].clientY);
      setIsPulling(true);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isPulling && !isRefreshing) {
      const touchY = e.touches[0].clientY;
      const pullDistance = touchY - pullStartY;
      
      if (pullDistance > 0) {
        e.preventDefault();
        setPullMoveY(pullDistance);
        
        if (refreshIndicatorRef.current) {
          const maxPull = 150;
          const pullPercent = Math.min(pullDistance / maxPull, 1);
          refreshIndicatorRef.current.style.transform = `translateY(${pullDistance}px)`;
          refreshIndicatorRef.current.style.opacity = pullPercent.toString();
        }
      }
    }
  };

  const handleTouchEnd = () => {
    if (isPulling && pullMoveY > 70) {
      handleRefresh();
    }
    
    if (refreshIndicatorRef.current) {
      refreshIndicatorRef.current.style.transform = 'translateY(0)';
      refreshIndicatorRef.current.style.opacity = '0';
    }
    
    setIsPulling(false);
    setPullMoveY(0);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: false });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd);

      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isPulling, pullStartY, isRefreshing]);

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
      <div 
        ref={refreshIndicatorRef}
        className="absolute top-0 left-0 w-full flex items-center justify-center transition-transform duration-200 pointer-events-none"
        style={{ opacity: 0 }}
      >
        <div className="bg-white rounded-full p-2 shadow-lg">
          <RefreshCw 
            className={`w-6 h-6 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} 
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Crypto</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="hover:bg-gray-100"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
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