import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { CryptoAsset } from "@/types/crypto";

interface CryptoListProps {
  cryptos?: CryptoAsset[];
  isLoading: boolean;
}

export const CryptoList = ({ cryptos, isLoading }: CryptoListProps) => {
  const navigate = useNavigate();

  if (isLoading) {
    return Array(3).fill(0).map((_, i) => (
      <div key={i} className="py-4 border-b">
        <div className="flex justify-between items-center">
          <Skeleton className="h-12 w-[200px]" />
          <Skeleton className="h-8 w-[100px]" />
        </div>
      </div>
    ));
  }

  return (
    <div className="space-y-2">
      {cryptos?.map((crypto) => (
        <div 
          key={crypto.id}
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
      ))}
    </div>
  );
};