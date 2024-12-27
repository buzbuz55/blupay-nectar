import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, memo } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const spendingData = [
  { day: "Mon", amount: 150 },
  { day: "Tue", amount: 280 },
  { day: "Wed", amount: 293.38 },
  { day: "Thu", amount: 310 },
  { day: "Fri", amount: 265 },
  { day: "Sat", amount: 240 },
  { day: "Sun", amount: 245 },
];

const savingsData = [
  { name: "Monthly Saving", amount: 2000.00, color: "emerald" },
  { name: "Emergency Fund", amount: 3840.00, color: "red" }
];

export const Balance = memo(() => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showBankDialog, setShowBankDialog] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("1W");
  const [bankInfo, setBankInfo] = useState({
    accountNumber: "",
    routingNumber: "",
  });

  const handleAccountInfo = () => {
    setShowBankDialog(true);
  };

  const handleCopyBalance = () => {
    navigator.clipboard.writeText("14,879.84");
    toast({
      title: "Copied to clipboard",
      description: "Balance has been copied to your clipboard",
    });
  };

  const handleSaveBankInfo = () => {
    if (!bankInfo.accountNumber || !bankInfo.routingNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in all banking details",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Banking Information Saved",
      description: "Your account details have been securely saved",
    });
    setShowBankDialog(false);
  };

  const timeframes = ["1D", "1W", "1M", "3M", "1Y", "All"];

  return (
    <>
      <Card className="p-6 mb-4 space-y-6">
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-500">Your Active Balance</p>
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-4xl font-bold">$14,879.84</h1>
            <button onClick={handleCopyBalance} className="p-1 hover:bg-gray-100 rounded-full">
              <Copy className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <p className="text-sm text-gray-500">US Dollar</p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button 
            variant="outline" 
            className="bg-navy-900 text-white hover:bg-navy-800"
            onClick={() => navigate("/cards")}
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 7h12m0 0v10M20 7l-4-4m4 4l-4 4" />
            </svg>
            Request
          </Button>
          
          <Button 
            className="col-span-2 bg-blupay-primary hover:bg-blupay-primary/90"
            onClick={() => navigate("/pay")}
          >
            Send Money
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Spending</h2>
            <span className="text-lg font-semibold">$1,783.93</span>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {timeframes.map((timeframe) => (
              <Button
                key={timeframe}
                variant={selectedTimeframe === timeframe ? "default" : "outline"}
                className="px-4 py-1 text-sm"
                onClick={() => setSelectedTimeframe(timeframe)}
              >
                {timeframe}
              </Button>
            ))}
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spendingData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 rounded-lg shadow-lg border">
                          <p className="text-sm font-medium">${payload[0].value}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#4F46E5"
                  fillOpacity={1}
                  fill="url(#colorAmount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Saving</h2>
            <Button variant="link" className="text-blue-600 p-0">Details</Button>
          </div>
          
          <div className="space-y-3">
            {savingsData.map((saving) => (
              <div key={saving.name} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full bg-${saving.color}-500`} />
                  <span className="text-gray-600">{saving.name}</span>
                </div>
                <span className="font-medium">${saving.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Dialog open={showBankDialog} onOpenChange={setShowBankDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Banking Information</DialogTitle>
            <DialogDescription>
              Enter your banking details securely
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                type="text"
                placeholder="Enter account number"
                value={bankInfo.accountNumber}
                onChange={(e) => setBankInfo(prev => ({
                  ...prev,
                  accountNumber: e.target.value
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="routingNumber">Routing Number</Label>
              <Input
                id="routingNumber"
                type="text"
                placeholder="Enter routing number"
                value={bankInfo.routingNumber}
                onChange={(e) => setBankInfo(prev => ({
                  ...prev,
                  routingNumber: e.target.value
                }))}
              />
            </div>
            <Button 
              className="w-full bg-blupay-primary hover:bg-blupay-primary/90"
              onClick={handleSaveBankInfo}
            >
              Save Banking Information
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
});

Balance.displayName = "Balance";