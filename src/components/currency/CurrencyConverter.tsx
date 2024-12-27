import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { RefreshCw, ArrowRight, ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";

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
    { symbol: '$', rate: 1, name: 'USD' },
    { symbol: '€', rate: 0, name: 'EUR' },
    { symbol: '£', rate: 0, name: 'GBP' },
    { symbol: '¥', rate: 0, name: 'JPY' },
    { symbol: 'A$', rate: 0, name: 'AUD' },
    { symbol: 'C$', rate: 0, name: 'CAD' },
    { symbol: 'CHF', rate: 0, name: 'CHF' },
    { symbol: '¥', rate: 0, name: 'CNY' },
  ]);
  
  const [amount, setAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
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
  }, []);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const calculateConversion = () => {
    const fromRate = rates.find(r => r.name === fromCurrency)?.rate || 1;
    const toRate = rates.find(r => r.name === toCurrency)?.rate || 1;
    const amountNum = parseFloat(amount) || 0;
    
    if (fromCurrency === 'USD') {
      return (amountNum * toRate).toFixed(2);
    } else if (toCurrency === 'USD') {
      return (amountNum / fromRate).toFixed(2);
    } else {
      return ((amountNum / fromRate) * toRate).toFixed(2);
    }
  };

  return (
    <Card className={cn("p-6 bg-white", className)}>
      <DialogTitle className="text-xl font-semibold mb-4">Currency Converter</DialogTitle>
      <DialogDescription className="text-sm text-gray-500 mb-6">
        Convert between currencies at guaranteed lowest rates
      </DialogDescription>

      <div className="space-y-6">
        <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
          <div className="space-y-2">
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="text-lg"
            />
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {rates.map((currency) => (
                  <SelectItem key={currency.name} value={currency.name}>
                    {currency.symbol} {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleSwapCurrencies}
            className="rounded-full"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </Button>

          <div className="space-y-2">
            <Input
              type="number"
              value={calculateConversion()}
              readOnly
              className="text-lg bg-gray-50"
            />
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {rates.map((currency) => (
                  <SelectItem key={currency.name} value={currency.name}>
                    {currency.symbol} {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={fetchRates}
            disabled={isLoading}
          >
            <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
          </Button>
        </div>
      </div>
    </Card>
  );
};