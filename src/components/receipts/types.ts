import { Json } from "@/integrations/supabase/types";

export interface ReceiptItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Receipt {
  id: string;
  receipt_number: string;
  total_amount: number;
  items: ReceiptItem[];
  receipt_url: string | null;
  created_at: string;
}

export const isValidReceiptItem = (item: unknown): item is ReceiptItem => {
  if (typeof item !== 'object' || item === null) return false;
  const i = item as Record<string, unknown>;
  return (
    typeof i.name === 'string' &&
    typeof i.quantity === 'number' &&
    typeof i.price === 'number'
  );
};

export const transformItems = (items: Json | null): ReceiptItem[] | null => {
  if (!Array.isArray(items)) return null;
  const unknownItems = items as unknown[];
  const validItems = unknownItems.filter(isValidReceiptItem);
  return validItems.length === items.length ? validItems : null;
};