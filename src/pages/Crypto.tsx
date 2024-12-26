import { Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/layout/BottomNav";

interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

const CryptoPage = () => {
  const { data: cryptoPrices, isLoading } = useQuery({
    queryKey: ['crypto-prices'],
    queryFn: async () => {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,litecoin,bitcoin-cash,pyusd&order=market_cap_desc&sparkline=false'
      );
      return response.json() as Promise<CryptoPrice[]>;
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Crypto</h1>
          <Link to="/settings" className="text-gray-600">
            <Settings className="w-6 h-6" />
          </Link>
        </div>
      </header>

      <main className="px-4">
        {/* Balance Section */}
        <div className="mb-8">
          <h2 className="text-xl mb-2">Your crypto balance</h2>
          <div className="text-4xl font-bold mb-6">$0</div>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              className="w-full py-6 text-lg bg-blue-500 hover:bg-blue-600"
              onClick={() => console.log("Buy crypto")}
            >
              Buy
            </Button>
            <Button 
              className="w-full py-6 text-lg bg-blue-500 hover:bg-blue-600"
              onClick={() => console.log("Receive crypto")}
            >
              Receive
            </Button>
          </div>
        </div>

        {/* Crypto List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Explore more crypto</h2>
          {isLoading ? (
            <div className="text-center py-4">Loading prices...</div>
          ) : (
            <div className="space-y-4">
              {cryptoPrices?.map((crypto) => (
                <button
                  key={crypto.id}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={crypto.image} 
                      alt={crypto.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="text-left">
                      <div className="font-semibold">{crypto.name}</div>
                      <div className="text-sm text-gray-500">{crypto.symbol.toUpperCase()}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      ${crypto.current_price.toLocaleString()}
                    </div>
                    <div className={`text-sm ${
                      crypto.price_change_percentage_24h >= 0 
                        ? 'text-green-500' 
                        : 'text-red-500'
                    }`}>
                      {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default CryptoPage;