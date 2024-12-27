import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { RefreshCcw, TrendingUp, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Tip {
  id: string;
  title: string;
  description: string;
  type: 'stock' | 'crypto' | 'general';
  risk: 'low' | 'medium' | 'high';
}

const mockTips: Tip[] = [
  {
    id: "1",
    title: "Diversification Strategy",
    description: "Consider spreading investments across different sectors to minimize risk.",
    type: "general",
    risk: "low"
  },
  {
    id: "2",
    title: "Emergency Fund First",
    description: "Before investing, ensure you have 3-6 months of expenses saved.",
    type: "general",
    risk: "low"
  },
  {
    id: "3",
    title: "Dollar-Cost Averaging",
    description: "Invest fixed amounts regularly instead of timing the market.",
    type: "stock",
    risk: "medium"
  }
];

export const InvestmentTips = () => {
  const { toast } = useToast();

  const { data: tips, isLoading, refetch } = useQuery({
    queryKey: ['investment-tips'],
    queryFn: async () => {
      // In a real implementation, this would fetch from an API
      return mockTips;
    },
    initialData: mockTips
  });

  const handleRefresh = () => {
    refetch();
    toast({
      title: "Tips Refreshed",
      description: "Investment tips have been updated.",
    });
  };

  const getRiskColor = (risk: Tip['risk']) => {
    switch (risk) {
      case 'low':
        return 'text-green-500';
      case 'medium':
        return 'text-yellow-500';
      case 'high':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Investment Tips</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          className="gap-2"
        >
          <RefreshCcw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4">
        {isLoading ? (
          <Card className="p-6 animate-pulse bg-gray-100" />
        ) : (
          tips.map((tip) => (
            <Card key={tip.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blupay-primary" />
                    <h3 className="font-semibold">{tip.title}</h3>
                  </div>
                  <p className="text-gray-600">{tip.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="bg-gray-100 px-2 py-1 rounded">{tip.type}</span>
                    <span className={`flex items-center gap-1 ${getRiskColor(tip.risk)}`}>
                      <AlertTriangle className="h-4 w-4" />
                      {tip.risk} risk
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};