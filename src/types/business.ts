export interface BusinessProfile {
  id: string;
  user_id: string;
  business_name: string;
  business_type: string;
  contact_email: string | null;
  contact_phone: string | null;
  address: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface LoyaltyProgram {
  id: string;
  business_id: string;
  program_name: string;
  points_per_dollar: number;
  created_at: string;
  updated_at: string;
}

export interface DigitalReceipt {
  id: string;
  transaction_id: string | null;
  business_id: string | null;
  user_id: string | null;
  receipt_number: string;
  total_amount: number;
  items: any;
  receipt_url: string | null;
  created_at: string;
}

export interface Invoice {
  id: string;
  business_id: string | null;
  user_id: string | null;
  invoice_number: string;
  amount: number;
  status: string;
  due_date: string | null;
  items: any;
  created_at: string;
  updated_at: string;
}