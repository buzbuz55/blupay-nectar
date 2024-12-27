import { useState } from "react";
import { QRScanner } from "@/components/qr/QRScanner";
import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { fetchWithRetry } from "@/utils/api";
import { CryptoList } from "@/components/crypto/CryptoList";
import { CryptoDetail } from "@/components/crypto/CryptoDetail";
import { CryptoAsset } from "@/types/crypto";

const CryptoPage = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoAsset | null>(null);
  const { toast } = useToast();

  const { data: cryptos, isLoading } = useQuery({
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
        {selectedCrypto ? (
          <CryptoDetail
            crypto={selectedCrypto}
            onClose={() => setSelectedCrypto(null)}
          />
        ) : (
          <CryptoList
            cryptos={cryptos || []}
            isLoading={isLoading}
            onSelect={setSelectedCrypto}
          />
        )}
      </div>
    </div>
  );
};

export default CryptoPage;