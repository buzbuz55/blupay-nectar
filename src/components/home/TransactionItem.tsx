import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { TransactionMessage } from "@/components/messaging/TransactionMessage";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { supabase } from "@/integrations/supabase/client";

interface TransactionItemProps {
  transaction: {
    id: string;
    recipient_identifier: string;
    amount: number;
    created_at: string;
    type: string;
    status: string;
    note: string | null;
    sender_id: string;
    recipient_id: string | null;
  };
  formatDate: (date: string) => string;
}

export const TransactionItem = ({ transaction, formatDate }: TransactionItemProps) => {
  const isOutgoing = transaction.sender_id === (supabase.auth.getUser() as any).data?.user?.id;

  return (
    <Collapsible>
      <CollapsibleTrigger className="w-full">
        <Card className="p-4 hover:bg-gray-50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                isOutgoing ? "bg-red-100" : "bg-green-100"
              }`}>
                {isOutgoing ? (
                  <ArrowUpRight className="w-4 h-4 text-red-600" />
                ) : (
                  <ArrowDownLeft className="w-4 h-4 text-green-600" />
                )}
              </div>
              <div>
                <p className="font-medium">{transaction.recipient_identifier}</p>
                <p className="text-sm text-gray-500">{transaction.type}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${
                isOutgoing ? "text-red-600" : "text-green-600"
              }`}>
                {isOutgoing ? "-" : "+"}
                ${transaction.amount.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">{formatDate(transaction.created_at)}</p>
            </div>
          </div>
        </Card>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <TransactionMessage 
          transactionId={transaction.id}
          messages={[]}
          reactions={[]}
        />
      </CollapsibleContent>
    </Collapsible>
  );
};