import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { RefreshCw, Send, BarChart3, Bell, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CurrencyConverterProps {
  className?: string;
}

interface ExchangeRate {
  symbol: string;
  rate: number;
  name: string;
  flag?: string;
  fullName?: string;
}

export const CurrencyConverter = ({ className }: CurrencyConverterProps) => {
  const [amount, setAmount] = useState<string>('1.00');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [rates, setRates] = useState<ExchangeRate[]>([
    { symbol: '$', rate: 1, name: 'USD', flag: '🇺🇸', fullName: 'US Dollar' },
    { symbol: '€', rate: 0, name: 'EUR', flag: '🇪🇺', fullName: 'Euro' },
    { symbol: '£', rate: 0, name: 'GBP', flag: '🇬🇧', fullName: 'British Pound' },
    { symbol: '¥', rate: 0, name: 'JPY', flag: '🇯🇵', fullName: 'Japanese Yen' },
  ]);

  const fetchRates = async () => {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      
      setRates(prev => prev.map(currency => ({
        ...currency,
        rate: data.rates[currency.name]
      })));
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const calculateConversion = (amount: number, fromRate: number, toRate: number) => {
    const result = (amount / fromRate) * toRate;
    return result.toFixed(2);
  };

  const fromRate = rates.find(r => r.name === fromCurrency)?.rate || 1;
  const toRate = rates.find(r => r.name === toCurrency)?.rate || 1;
  const convertedAmount = calculateConversion(parseFloat(amount) || 0, fromRate, toRate);

  return (
    <Card className={cn("p-6 bg-white", className)}>
      <div className="flex items-center justify-between mb-8 border-b pb-4">
        <Button variant="secondary" className="flex items-center gap-2">
          <ArrowRightLeft className="w-4 h-4" />
          Convert
        </Button>
        <div className="flex gap-4">
          <Button variant="ghost">
            <Send className="w-4 h-4" />
            Send
          </Button>
          <Button variant="ghost">
            <BarChart3 className="w-4 h-4" />
            Charts
          </Button>
          <Button variant="ghost">
            <Bell className="w-4 h-4" />
            Alerts
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-sm text-gray-500 mb-2 block">Amount</label>
          <Input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            className="text-2xl font-semibold h-16"
            placeholder="0.00"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500 mb-2 block">From</label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="h-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {rates.map((currency) => (
                  <SelectItem key={currency.name} value={currency.name}>
                    <div className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span>{currency.name} - {currency.fullName}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-500 mb-2 block">To</label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="h-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {rates.map((currency) => (
                  <SelectItem key={currency.name} value={currency.name}>
                    <div className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span>{currency.name} - {currency.fullName}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-blue-600">💰</span>
              <span className="text-gray-600">Looking to make large transfers?</span>
            </div>
            <p className="text-sm text-gray-500">We can beat competitor rates</p>
          </div>
          <Button variant="link" className="text-blue-600">
            Contact us
          </Button>
        </div>

        <Button className="w-full h-12 text-lg">
          Convert
        </Button>
      </div>
    </Card>
  );
};