import { useState } from "react";
import { QRScanner } from "@/components/qr/QRScanner";
import { Button } from "@/components/ui/button";
import { QrCode, Bitcoin, ChartLine, ArrowUp, ArrowDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface CryptoAsset {
  id: number;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  amount: number;
}

const cryptoAssets: CryptoAsset[] = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    price: 43567.89,
    change24h: 2.5,
    amount: 0.05,
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    price: 2234.56,
    change24h: -1.2,
    amount: 1.5,
  },
];

interface Transaction {
  id: number;
  type: "send" | "receive";
  amount: number;
  symbol: string;
  date: string;
  status: "completed" | "pending";
}

const recentTransactions: Transaction[] = [
  {
    id: 1,
    type: "receive",
    amount: 0.01,
    symbol: "BTC",
    date: "2024-02-20",
    status: "completed",
  },
  {
    id: 2,
    type: "send",
    amount: 0.5,
    symbol: "ETH",
    date: "2024-02-19",
    status: "completed",
  },
];

const CryptoPage = () => {
  const [showScanner, setShowScanner] = useState(false);
  const { toast } = useToast();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

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
    <div className="p-4 space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Crypto</h1>
        <Button 
          onClick={handleScanClick}
          variant="outline"
          className="flex items-center gap-2"
        >
          <QrCode className="w-4 h-4" />
          Scan
        </Button>
      </div>

      <div className="space-y-4">
        {cryptoAssets.map((asset) => (
          <Card key={asset.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">
                <div className="flex items-center gap-2">
                  <Bitcoin className="w-5 h-5" />
                  {asset.symbol}
                </div>
              </CardTitle>
              <ChartLine className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">
                    {asset.amount} {asset.symbol}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatCurrency(asset.amount * asset.price)}
                  </p>
                </div>
                <div className={`flex items-center gap-1 ${
                  asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {asset.change24h >= 0 ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  <span>{Math.abs(asset.change24h)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="space-y-3">
          {recentTransactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                {tx.type === "receive" ? (
                  <ArrowDown className="w-5 h-5 text-green-500" />
                ) : (
                  <ArrowUp className="w-5 h-5 text-red-500" />
                )}
                <div>
                  <p className="font-medium">
                    {tx.type === "receive" ? "Received" : "Sent"} {tx.amount} {tx.symbol}
                  </p>
                  <p className="text-sm text-gray-500">{tx.date}</p>
                </div>
              </div>
              <span className={`text-sm ${
                tx.status === "completed" ? "text-green-500" : "text-yellow-500"
              }`}>
                {tx.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoPage;