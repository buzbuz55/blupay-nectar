import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, memo } from "react";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

export const Balance = memo(() => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showBankDialog, setShowBankDialog] = useState(false);
  const [bankInfo, setBankInfo] = useState({
    accountNumber: "",
    routingNumber: "",
  });

  const handleAccountInfo = () => {
    setShowBankDialog(true);
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

  return (
    <>
      <Card className="p-6 rounded-2xl border-0 shadow-sm bg-gradient-to-br from-white to-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Balance</h2>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleAccountInfo}
            className="text-sm font-medium hover:bg-gray-100 border-gray-200"
          >
            Account Info
          </Button>
        </div>
        
        <div className="mb-8">
          <span className="text-4xl font-bold text-gray-900">$6.76</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Button 
            className="flex items-center justify-center gap-2 bg-black hover:bg-black/90 text-white rounded-xl h-12"
            onClick={() => navigate("/pay")}
          >
            <ArrowUpRight className="w-4 h-4" />
            Send
          </Button>
          <Button 
            className="flex items-center justify-center gap-2 bg-black hover:bg-black/90 text-white rounded-xl h-12"
            onClick={() => navigate("/cards")}
          >
            <ArrowDownLeft className="w-4 h-4" />
            Receive
          </Button>
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
