import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift, Star } from "lucide-react";

interface LoyaltyProgramCardProps {
  programName: string;
  pointsPerDollar: number;
  businessName: string;
  totalPoints?: number;
}

export const LoyaltyProgramCard = ({
  programName,
  pointsPerDollar,
  businessName,
  totalPoints,
}: LoyaltyProgramCardProps) => {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">{programName}</CardTitle>
        <Gift className="h-5 w-5 text-blue-500" />
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-gray-500 mb-4">
          {businessName}
        </CardDescription>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            {pointsPerDollar}x Points per $
          </Badge>
          {totalPoints !== undefined && (
            <span className="text-sm font-medium">
              {totalPoints.toLocaleString()} points
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};