import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ReceiptCard } from "./ReceiptCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Json } from "@/integrations/supabase/types";

interface ReceiptItem {
  name: string;
  quantity: number;
  price: number;
}

interface Receipt {
  id: string;
  receipt_number: string;
  total_amount: number;
  items: ReceiptItem[] | null;
  created_at: string;
  business_profiles: {
    business_name: string;
  };
}

interface SupabaseReceipt {
  id: string;
  receipt_number: string;
  total_amount: number;
  items: Json;
  created_at: string;
  business_profiles: {
    business_name: string;
  };
}

// Type guard to check if an item is a valid ReceiptItem
const isValidReceiptItem = (item: unknown): item is ReceiptItem => {
  if (typeof item !== 'object' || item === null) return false;
  
  const candidate = item as Record<string, unknown>;
  return (
    typeof candidate.name === 'string' &&
    typeof candidate.quantity === 'number' &&
    typeof candidate.price === 'number'
  );
};

// Function to safely transform Json to ReceiptItem[]
const transformItems = (items: Json | null): ReceiptItem[] | null => {
  if (!Array.isArray(items)) return null;
  
  const validItems = items.filter(isValidReceiptItem);
  return validItems.length === items.length ? validItems : null;
};

export const DigitalReceipts = () => {
  const { data: receipts, isLoading, error } = useQuery<Receipt[]>({
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

      // Transform the data to ensure items is properly typed
      return (data as SupabaseReceipt[]).map(receipt => ({
        ...receipt,
        items: transformItems(receipt.items)
      }));
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
              items={receipt.items}
              createdAt={receipt.created_at}
            />
          ))}
        </div>
      )}
    </div>
  );
};