import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ChartBar, PiggyBank, Coins, ArrowUp, ArrowDown } from "lucide-react";

interface SpendingCategory {
  category: string;
  amount: number;
  trend: "up" | "down";
  recommendation: string;
  icon: JSX.Element;
}

export const AiRecommendations = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<SpendingCategory[]>([
    {
      category: "Entertainment",
      amount: 250,
      trend: "up",
      recommendation: "Your entertainment spending has increased by 15% this month. Consider setting a budget limit.",
      icon: <ChartBar className="w-5 h-5 text-blue-500" />
    },
    {
      category: "Savings",
      amount: 500,
      trend: "up",
      recommendation: "Great job! You've increased your savings by 20% compared to last month.",
      icon: <PiggyBank className="w-5 h-5 text-green-500" />
    },
    {
      category: "Shopping",
      amount: 400,
      trend: "down",
      recommendation: "You've reduced shopping expenses. Keep up the good work!",
      icon: <Coins className="w-5 h-5 text-purple-500" />
    }
  ]);

  const getNewRecommendations = async () => {
    setLoading(true);
    try {
      // Simulated API call - in production, this would call your AI service
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, we're just rotating the existing recommendations
      setRecommendations(prev => [...prev.slice(1), prev[0]]);
      
      toast({
        title: "Recommendations Updated",
        description: "Your personalized insights have been refreshed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch new recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Spending Insights</h2>
        <Button
          onClick={getNewRecommendations}
          disabled={loading}
          variant="outline"
        >
          {loading ? "Analyzing..." : "Refresh Insights"}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {recommendations.map((item, index) => (
          <Card key={index} className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {item.icon}
                <h3 className="font-medium">{item.category}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">${item.amount}</span>
                {item.trend === "up" ? (
                  <ArrowUp className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDown className="w-4 h-4 text-red-500" />
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600">{item.recommendation}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};