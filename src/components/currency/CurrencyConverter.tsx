import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface CurrencyConverterProps {
  className?: string;
}

interface ExchangeRate {
  symbol: string;
  rate: number;
  name: string;
}

export const CurrencyConverter = ({ className }: CurrencyConverterProps) => {
  const [rates, setRates] = useState<ExchangeRate[]>([
    { symbol: '€', rate: 0, name: 'EUR' },
    { symbol: '£', rate: 0, name: 'GBP' },
    { symbol: '¥', rate: 0, name: 'JPY' },
    { symbol: 'A$', rate: 0, name: 'AUD' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchRates = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      
      setRates(prev => prev.map(currency => ({
        ...currency,
        rate: data.rates[currency.name]
      })));
      
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className={cn("p-4 bg-white/50 backdrop-blur-sm", className)}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Live Exchange Rates</h3>
        <button 
          onClick={fetchRates}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          disabled={isLoading}
        >
          <RefreshCw className={cn(
            "w-4 h-4 text-gray-600",
            isLoading && "animate-spin"
          )} />
        </button>
      </div>
      
      <div className="space-y-3">
        {rates.map((currency) => (
          <div key={currency.name} className="flex justify-between items-center p-2 rounded-lg hover:bg-white/50 transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium">{currency.symbol}</span>
              <span className="text-gray-600">{currency.name}</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-medium">
                {currency.rate.toFixed(4)}
              </div>
              <div className="text-xs text-gray-500">
                1 USD = {currency.rate.toFixed(4)} {currency.name}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-xs text-gray-500 text-right">
        Last updated: {lastUpdated.toLocaleTimeString()}
      </div>
    </Card>
  );
};