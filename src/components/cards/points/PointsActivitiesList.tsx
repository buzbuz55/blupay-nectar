import { Gift, Star, Users, Wallet } from "lucide-react";

interface Activity {
  icon: any;
  name: string;
  points: number;
}

interface PointsActivitiesListProps {
  activities: Activity[];
}

export const PointsActivitiesList = ({ activities }: PointsActivitiesListProps) => {
  return (
    <div className="grid gap-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center gap-4">
          <div className="p-2 bg-blue-50 rounded-lg">
            <activity.icon className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="font-medium">{activity.name}</p>
            <p className="text-sm text-gray-500">{activity.points.toLocaleString()} points</p>
          </div>
        </div>
      ))}
    </div>
  );
};