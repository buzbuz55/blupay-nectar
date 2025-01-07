import { Gift, Star, Users, Wallet } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface Milestone {
  threshold: number;
  points: number;
  description: string;
}

interface Activity {
  icon: any;
  name: string;
  points: number;
  milestones: Milestone[];
}

interface PointsActivitiesListProps {
  activities: Activity[];
  onActivityComplete: (activityType: string, points: number) => void;
}

export const PointsActivitiesList = ({ activities, onActivityComplete }: PointsActivitiesListProps) => {
  return (
    <div className="grid gap-4">
      {activities.map((activity, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-4 p-4 bg-white rounded-lg border hover:border-blue-200 transition-colors">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <activity.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.name}</p>
                  <p className="text-sm text-gray-500">Starting at {activity.points.toLocaleString()} points</p>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => onActivityComplete(activity.name, activity.points)}
                >
                  Complete
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent className="w-64 p-4">
              <div className="space-y-2">
                <p className="font-semibold text-sm">Milestones:</p>
                {activity.milestones.map((milestone, idx) => (
                  <div key={idx} className="text-xs">
                    <p className="font-medium">{milestone.description}</p>
                    <p className="text-gray-500">+{milestone.points.toLocaleString()} points</p>
                  </div>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};