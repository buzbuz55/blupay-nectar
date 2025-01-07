import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ReceiptCard } from "./ReceiptCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const DigitalReceipts = () => {
  const { data: receipts, isLoading, error } = useQuery({
    queryKey: ["digital-receipts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("digital_receipts")
        .select(`
          *,
          business_profiles (
            business_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[160px] w-full" />
        <Skeleton className="h-[160px] w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load digital receipts. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Digital Receipts</h2>
      {receipts?.length === 0 ? (
        <Alert>
          <AlertDescription>
            No digital receipts available at the moment.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {receipts?.map((receipt) => (
            <ReceiptCard
              key={receipt.id}
              receiptNumber={receipt.receipt_number}
              businessName={receipt.business_profiles.business_name}
              totalAmount={receipt.total_amount}
              items={receipt.items || []}
              createdAt={receipt.created_at}
            />
          ))}
        </div>
      )}
    </div>
  );
};