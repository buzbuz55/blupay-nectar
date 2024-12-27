import { useQuery } from "@tanstack/react-query";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { fetchWithRetry } from "@/utils/api";

interface CryptoChartProps {
  cryptoId: string;
  days: string;
  className?: string;
}

interface PriceDataPoint {
  timestamp: number;
  price: number;
}

export const CryptoChart = ({ cryptoId, days, className }: CryptoChartProps) => {
  const { data: priceData, isLoading, error } = useQuery({
    queryKey: ['cryptoChart', cryptoId, days],
    queryFn: async () => {
      const data = await fetchWithRetry(
        `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=${days}`
      );
      return data.prices.map(([timestamp, price]: [number, number]) => ({
        timestamp,
        price,
      }));
    },
    staleTime: 60000, // Consider data fresh for 1 minute
    gcTime: 300000, // Keep data in cache for 5 minutes (renamed from cacheTime)
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * Math.pow(2, attemptIndex), 10000),
  });

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load chart data. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return <Skeleton className={`h-full w-full ${className}`} />;
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    if (parseInt(days) <= 1) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={priceData}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="timestamp"
          tickFormatter={formatDate}
          tick={{ fontSize: 12 }}
          stroke="#888888"
        />
        <YAxis
          domain={['auto', 'auto']}
          tick={{ fontSize: 12 }}
          stroke="#888888"
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <Card className="p-2 bg-background/80 backdrop-blur-sm border-none">
                  <p className="text-sm font-medium">
                    ${payload[0].value.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(payload[0].payload.timestamp)}
                  </p>
                </Card>
              );
            }
            return null;
          }}
        />
        <Area
          type="monotone"
          dataKey="price"
          stroke="#8B5CF6"
          fillOpacity={1}
          fill="url(#colorPrice)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};