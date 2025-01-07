import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt, Store } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ReceiptItem {
  name: string;
  quantity: number;
  price: number;
}

interface ReceiptCardProps {
  receiptNumber: string;
  businessName: string;
  totalAmount: number;
  items: ReceiptItem[] | null;
  createdAt: string;
}

export const ReceiptCard = ({
  receiptNumber,
  businessName,
  totalAmount,
  items,
  createdAt,
}: ReceiptCardProps) => {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg font-bold">Receipt #{receiptNumber}</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            <Store className="mr-1 h-4 w-4" />
            {businessName}
          </div>
        </div>
        <Receipt className="h-5 w-5 text-blue-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Amount</span>
            <span className="font-medium">${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Items</span>
            <span className="font-medium">{items?.length || 0} items</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};