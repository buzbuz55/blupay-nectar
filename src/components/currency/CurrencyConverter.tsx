import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { RefreshCw, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface CurrencyConverterProps {
  className?: string;
}

interface ExchangeRate {
  symbol: string;
  rate: number;
  name: string;
}

export const CurrencyConverter = ({ className }: CurrencyConverterProps) => {
  const { toast } = useToast();
  const [rates, setRates] = useState<ExchangeRate[]>([
    { symbol: '€', rate: 0, name: 'EUR' },
    { symbol: '£', rate: 0, name: 'GBP' },
    { symbol: '¥', rate: 0, name: 'JPY' },
    { symbol: 'A$', rate: 0, name: 'AUD' },
    { symbol: 'C$', rate: 0, name: 'CAD' },
    { symbol: 'CHF', rate: 0, name: 'CHF' },
    { symbol: '¥', rate: 0, name: 'CNY' },
    { symbol: 'HK$', rate: 0, name: 'HKD' },
    { symbol: '₹', rate: 0, name: 'INR' },
    { symbol: '₪', rate: 0, name: 'ILS' },
    { symbol: '₩', rate: 0, name: 'KRW' },
    { symbol: 'MX$', rate: 0, name: 'MXN' },
    { symbol: 'N$', rate: 0, name: 'NZD' },
    { symbol: '₱', rate: 0, name: 'PHP' },
    { symbol: '₽', rate: 0, name: 'RUB' },
    { symbol: 'S$', rate: 0, name: 'SGD' },
    { symbol: '฿', rate: 0, name: 'THB' },
    { symbol: '₺', rate: 0, name: 'TRY' },
    { symbol: 'R$', rate: 0, name: 'BRL' },
    { symbol: 'R', rate: 0, name: 'ZAR' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [amount, setAmount] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('EUR');

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

  const calculateConversion = (amount: number, rate: number) => {
    return (amount * rate).toFixed(2);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value === '') {
      setAmount('');
    } else {
      const numericValue = parseInt(value) / 100;
      setAmount(numericValue.toFixed(2));
    }
  };

  const handleInternationalTransfer = () => {
    toast({
      title: "International Transfer",
      description: "You'll be connected with our international transfer specialist for amounts over $5,000",
    });
  };

  const formattedAmount = amount ? parseFloat(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) : '0.00';

  const showInternationalOption = parseFloat(amount) >= 5000;

  return (
    <Card className={cn("p-4 bg-white/50 backdrop-blur-sm", className)}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Currency Converter</h3>
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

      <div className="mb-6">
        <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm mb-4">
          <span className="text-4xl font-medium">{formattedAmount}</span>
          <span className="text-2xl font-medium text-gray-600">USD</span>
        </div>
      </div>
      
      {showInternationalOption && (
        <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <h4 className="text-lg font-semibold text-blue-800 mb-2">
            International Transfer Available
          </h4>
          <p className="text-blue-600 mb-3">
            Get better rates and dedicated support for transfers over $5,000
          </p>
          <Button 
            onClick={handleInternationalTransfer}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
          >
            Talk to a Specialist
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}
      
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {rates.map((currency) => (
          <div 
            key={currency.name} 
            className="flex justify-between items-center p-3 rounded-lg hover:bg-white/50 transition-colors"
            onClick={() => setSelectedCurrency(currency.name)}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium">{currency.symbol}</span>
              <span className="text-gray-600">{currency.name}</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-medium">
                {amount ? calculateConversion(parseFloat(amount), currency.rate) : '0.00'} {currency.symbol}
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