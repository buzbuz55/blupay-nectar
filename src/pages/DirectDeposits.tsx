import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const DirectDeposits = () => {
  const { toast } = useToast();
  const [bankInfo, setBankInfo] = useState({
    accountNumber: "",
    routingNumber: "",
    accountType: "",
    bankName: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would connect to a banking API
    toast({
      title: "Direct Deposit Setup Initiated",
      description: "We'll verify your bank details and activate direct deposits within 2-3 business days.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-6">
        <Link to="/bluai" className="flex items-center gap-2 text-gray-600 mb-4">
          <ChevronLeft className="w-5 h-5" />
          Back to BLUAi
        </Link>
        <h1 className="text-2xl font-bold mb-2">Set Up Direct Deposit</h1>
        <p className="text-gray-600">
          Have your paycheck automatically deposited into your account
        </p>
      </div>

      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Account Information</h2>
          <p className="text-sm text-gray-500">
            Share this information with your employer to set up direct deposits
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="font-medium">Your Direct Deposit Details:</p>
            <div className="mt-2 space-y-1 text-sm">
              <p>Routing Number: 123456789</p>
              <p>Account Number: Your account number</p>
              <p>Bank Name: BLUAi Financial</p>
              <p>Account Type: Checking</p>
            </div>
          </div>

          <Button
            onClick={() => {
              navigator.clipboard.writeText("Routing: 123456789\nAccount: Your account number");
              toast({
                title: "Copied to clipboard",
                description: "Direct deposit details have been copied",
              });
            }}
            variant="outline"
            className="w-full"
          >
            Copy Direct Deposit Info
          </Button>
        </div>

        <div className="border-t pt-6">
          <h3 className="font-medium mb-4">Link Your External Bank Account</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                value={bankInfo.bankName}
                onChange={(e) => setBankInfo({ ...bankInfo, bankName: e.target.value })}
                placeholder="Enter your bank name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="routingNumber">Routing Number</Label>
              <Input
                id="routingNumber"
                value={bankInfo.routingNumber}
                onChange={(e) => setBankInfo({ ...bankInfo, routingNumber: e.target.value })}
                placeholder="Enter 9-digit routing number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                value={bankInfo.accountNumber}
                onChange={(e) => setBankInfo({ ...bankInfo, accountNumber: e.target.value })}
                placeholder="Enter account number"
              />
            </div>

            <Button type="submit" className="w-full">
              Set Up Direct Deposit
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default DirectDeposits;