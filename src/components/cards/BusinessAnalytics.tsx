import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface TransactionData {
  date: string;
  total: number;
}

interface BusinessMetrics {
  totalTransactions: number;
  totalRevenue: number;
  averageTransaction: number;
}

export const BusinessAnalytics = () => {
  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useQuery({
    queryKey: ['business-metrics'],
    queryFn: async () => {
      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('amount, created_at')
        .eq('type', 'payment');

      if (error) throw error;

      const totalTransactions = transactions.length;
      const totalRevenue = transactions.reduce((sum, t) => sum + Number(t.amount), 0);
      const averageTransaction = totalRevenue / totalTransactions;

      return {
        totalTransactions,
        totalRevenue,
        averageTransaction: averageTransaction || 0
      };
    }
  });

  const { data: chartData, isLoading: chartLoading, error: chartError } = useQuery({
    queryKey: ['transaction-chart'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('amount, created_at')
        .eq('type', 'payment')
        .order('created_at', { ascending: true });

      if (error) throw error;

      const dailyTotals: { [key: string]: number } = {};
      data.forEach(transaction => {
        const date = new Date(transaction.created_at).toLocaleDateString();
        dailyTotals[date] = (dailyTotals[date] || 0) + Number(transaction.amount);
      });

      return Object.entries(dailyTotals).map(([date, total]) => ({
        date,
        total
      }));
    }
  });

  if (metricsError || chartError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load analytics data. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Business Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          {metricsLoading ? (
            <Skeleton className="h-16" />
          ) : (
            <div>
              <p className="text-sm text-gray-500">Total Transactions</p>
              <p className="text-2xl font-bold">{metrics?.totalTransactions.toLocaleString()}</p>
            </div>
          )}
        </Card>
        
        <Card className="p-4">
          {metricsLoading ? (
            <Skeleton className="h-16" />
          ) : (
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold">${metrics?.totalRevenue.toLocaleString()}</p>
            </div>
          )}
        </Card>
        
        <Card className="p-4">
          {metricsLoading ? (
            <Skeleton className="h-16" />
          ) : (
            <div>
              <p className="text-sm text-gray-500">Average Transaction</p>
              <p className="text-2xl font-bold">${metrics?.averageTransaction.toFixed(2)}</p>
            </div>
          )}
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="text-lg font-medium mb-4">Transaction History</h3>
        {chartLoading ? (
          <Skeleton className="h-[300px]" />
        ) : (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>
    </div>
  );
};