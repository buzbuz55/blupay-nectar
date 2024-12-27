import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Heart, MessageSquare, Lock } from "lucide-react";
import { format } from "date-fns";

interface PaymentReceiptProps {
  recipient: {
    name: string;
    username: string;
    avatarUrl?: string;
    initials: string;
  };
  amount: number;
  transactionId: string;
  paymentMethod: {
    type: string;
    lastFour?: string;
    icon?: React.ReactNode;
  };
  fee: number;
  timestamp: Date;
}

export const PaymentReceipt = ({ recipient, amount, transactionId, paymentMethod, fee, timestamp }: PaymentReceiptProps) => {
  return (
    <div className="space-y-6">
      {/* Status Bar */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>{format(timestamp, "h:mm")}</span>
        <div className="flex items-center gap-2">
          <span>📱</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Success Message */}
      <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-center gap-2">
        <span className="text-green-500">✓</span>
        <span>You sent a payment to {recipient.name}</span>
      </div>

      {/* Recipient Info */}
      <Card className="p-6 space-y-4">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={recipient.avatarUrl} />
            <AvatarFallback>{recipient.initials}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-2xl font-semibold">{recipient.name}</h2>
            <p className="text-gray-500">"{amount.toFixed(2)}"</p>
            <p className="text-3xl font-bold text-red-500 mt-2">-${amount.toFixed(2)}</p>
          </div>
        </div>

        {/* Social Activity */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Social activity</h3>
          <div className="flex gap-4 justify-center">
            <div className="flex items-center gap-2 text-gray-500">
              <Heart className="h-5 w-5" /> 0
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <MessageSquare className="h-5 w-5" /> 0
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Status</h3>
            <p className="text-gray-700">Complete</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Fee</h3>
            <p className="text-gray-700">${fee.toFixed(2)}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Payment method</h3>
            <div className="flex items-center gap-3">
              {paymentMethod.icon}
              <div>
                <p className="font-medium">{paymentMethod.type}</p>
                {paymentMethod.lastFour && (
                  <p className="text-sm text-gray-500">Credit •••• {paymentMethod.lastFour}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Transaction details</h3>
            <div className="flex items-center gap-2 text-gray-700">
              <span>{format(timestamp, "MMMM dd, yyyy, h:mm a")}</span>
              <Lock className="h-4 w-4 text-blue-500" />
              <span className="text-blue-500">Private</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Paid to</h3>
            <p className="text-gray-700">{recipient.username}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Type of transaction</h3>
            <p className="text-gray-700">Payments between friends</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Transaction ID</h3>
            <p className="text-gray-500 text-sm font-mono">{transactionId}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};