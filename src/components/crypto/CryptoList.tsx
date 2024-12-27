import { CryptoAsset } from "@/types/crypto";
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

interface CryptoListProps {
  cryptos: CryptoAsset[];
  onSelect: (crypto: CryptoAsset) => void;
  isLoading: boolean;
}

export const CryptoList = ({ cryptos, onSelect, isLoading }: CryptoListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array(3).fill(0).map((_, i) => (
          <Card key={i} className="w-full backdrop-blur-sm bg-white/10 border-none">
            <div className="p-6">
              <div className="flex justify-between items-center">
                <div className="h-12 w-[200px] bg-gray-200 animate-pulse rounded" />
                <div className="h-8 w-[100px] bg-gray-200 animate-pulse rounded" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cryptos?.map((crypto) => (
        <Card 
          key={crypto.id}
          className="overflow-hidden backdrop-blur-sm bg-white/10 border-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          onClick={() => onSelect(crypto)}
        >
          <div className="p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <img src={crypto.image} alt={crypto.name} className="w-12 h-12" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">{crypto.symbol.toUpperCase()}</span>
                    <span className="text-lg text-muted-foreground">{crypto.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Market Cap: ${(crypto.market_cap / 1000000).toFixed(2)}M
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <p className="text-xl font-bold">
                  ${crypto.current_price.toLocaleString()}
                </p>
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
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};