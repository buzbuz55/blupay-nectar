import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { CryptoAsset } from "@/types/crypto";
import { useToast } from "@/hooks/use-toast";

interface CryptoListProps {
  cryptos?: CryptoAsset[];
  isLoading: boolean;
  onRefresh?: () => void;
}

const CryptoListItem = memo(({ crypto, onClick }: { 
  crypto: CryptoAsset; 
  onClick: () => void;
}) => (
  <div 
    className="flex items-center justify-between py-4 border-b cursor-pointer hover:bg-gray-50 transition-colors"
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      <img 
        src={crypto.image} 
        alt={crypto.name} 
        className="w-8 h-8"
        loading="lazy"
      />
      <div>
        <h3 className="font-medium">{crypto.name}</h3>
        <p className="text-sm text-gray-500">{crypto.symbol.toUpperCase()}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-medium">${crypto.current_price.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 8
      })}</p>
      <p className={`text-sm ${
        crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
      }`}>
        {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
        {crypto.price_change_percentage_24h.toFixed(2)}%
      </p>
    </div>
  </div>
));

CryptoListItem.displayName = 'CryptoListItem';

export const CryptoList = ({ cryptos, isLoading, onRefresh }: CryptoListProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleRefresh = async () => {
    if (onRefresh) {
      try {
        await onRefresh();
        toast({
          title: "Prices Updated",
          description: "Cryptocurrency prices have been refreshed",
        });
      } catch (error) {
        toast({
          title: "Update Failed",
          description: "Could not refresh prices. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array(3).fill(0).map((_, i) => (
          <div key={i} className="py-4 border-b">
            <div className="flex justify-between items-center">
              <Skeleton className="h-12 w-[200px]" />
              <Skeleton className="h-8 w-[100px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {onRefresh && (
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Prices
          </Button>
        </div>
      )}
      {cryptos?.map((crypto) => (
        <CryptoListItem
          key={crypto.id}
          crypto={crypto}
          onClick={() => navigate(`/crypto/${crypto.id}`)}
        />
      ))}
    </div>
  );
};