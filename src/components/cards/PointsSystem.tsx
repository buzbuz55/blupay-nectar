import { Card } from "@/components/ui/card";
import { Gift, Star, Users, Wallet } from "lucide-react";
import { PointsHeader } from "./points/PointsHeader";
import { PointsActivitiesList } from "./points/PointsActivitiesList";
import { LuxuryItemsDialog } from "./points/LuxuryItemsDialog";
import { PointsInfoDialog } from "./points/PointsInfoDialog";
import { BluClubDialog } from "./points/BluClubDialog";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type UserPoints = Database['public']['Tables']['user_points']['Row'];
type PointsActivity = Database['public']['Tables']['points_activities']['Row'];

export const PointsSystem = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch user points
  const { data: pointsData, isLoading } = useQuery({
    queryKey: ['userPoints'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('user_points')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      return data || { total_points: 0, next_reward_threshold: 70000 };
    }
  });

  // Handle points activity completion
  const completeMutation = useMutation({
    mutationFn: async ({ activityType, points }: { activityType: string, points: number }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('points_activities')
        .insert({
          user_id: user.id,
          activity_type: activityType,
          points_earned: points
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPoints'] });
      toast({
        title: "Points earned!",
        description: "Your points have been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error earning points",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const currentPoints = pointsData?.total_points || 0;
  const nextRewardThreshold = pointsData?.next_reward_threshold || 70000;
  const progress = (currentPoints / nextRewardThreshold) * 100;

  const pointsActivities = [
    { 
      icon: Wallet, 
      name: "Opening Account", 
      points: 50000,
      milestones: [
        { threshold: 1, points: 50000, description: "First account creation" },
        { threshold: 30, points: 10000, description: "Active for 30 days" },
        { threshold: 90, points: 25000, description: "Active for 90 days" }
      ]
    },
    { 
      icon: Users, 
      name: "Adding Friends", 
      points: 2000,
      milestones: [
        { threshold: 1, points: 2000, description: "First friend added" },
        { threshold: 5, points: 5000, description: "5 friends milestone" },
        { threshold: 10, points: 10000, description: "10 friends milestone" }
      ]
    },
    { 
      icon: Star, 
      name: "5-Star Review", 
      points: 10000,
      milestones: [
        { threshold: 1, points: 10000, description: "First review" },
        { threshold: 5, points: 15000, description: "5 reviews milestone" }
      ]
    },
    { 
      icon: Gift, 
      name: "Sharing App", 
      points: 5000,
      milestones: [
        { threshold: 1, points: 5000, description: "First share" },
        { threshold: 5, points: 7500, description: "5 shares milestone" },
        { threshold: 10, points: 15000, description: "10 shares milestone" }
      ]
    },
  ];

  const luxuryCategories = [
    {
      title: "High-End Electronics and Gadgets",
      items: [
        { name: 'Apple MacBook Pro 16" (2025)', points: 250000, value: 2500 },
        { name: 'Samsung QN90B Neo QLED 65"', points: 200000, value: 2000 },
        { name: "Sony WH-1000XM5 Wireless Headphones", points: 75000, value: 750 },
      ]
    },
    {
      title: "Fashion & Accessories",
      items: [
        { name: "Louis Vuitton Keepall 55 Bandoulière", points: 150000, value: 1500 },
        { name: "Gucci GG Marmont Quilted Leather Bag", points: 200000, value: 2000 },
        { name: "Rolex Submariner Date Watch", points: 500000, value: 5000 },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">BluPay Points</h2>
      
      <PointsHeader 
        currentPoints={currentPoints}
        nextRewardThreshold={nextRewardThreshold}
        progress={progress}
        isLoading={isLoading}
      />

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Ways to Earn Points</h3>
          <div className="flex gap-2">
            <BluClubDialog />
            <LuxuryItemsDialog categories={luxuryCategories} />
            <PointsInfoDialog />
          </div>
        </div>
        <PointsActivitiesList 
          activities={pointsActivities}
          onActivityComplete={(activityType, points) => 
            completeMutation.mutate({ activityType, points })
          }
        />
      </Card>
    </div>
  );
};