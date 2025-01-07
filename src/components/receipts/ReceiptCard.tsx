import { Card } from "@/components/ui/card";
import { Receipt } from "./types";
import { format } from "date-fns";

interface ReceiptCardProps {
  receipt: Receipt;
}

export const ReceiptCard = ({ receipt }: ReceiptCardProps) => {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-medium">Receipt #{receipt.receipt_number}</h3>
          <p className="text-sm text-gray-500">
            {format(new Date(receipt.created_at), 'MMM d, yyyy')}
          </p>
        </div>
        <p className="font-semibold">${receipt.total_amount.toFixed(2)}</p>
      </div>
      
      <div className="space-y-2">
        {receipt.items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span>{item.name} (x{item.quantity})</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      
      {receipt.receipt_url && (
        <a
          href={receipt.receipt_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline mt-4 block"
        >
          View Full Receipt
        </a>
      )}
    </Card>
  );
};