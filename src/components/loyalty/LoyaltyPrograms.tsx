import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LoyaltyProgramCard } from "./LoyaltyProgramCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const LoyaltyPrograms = () => {
  const { data: programs, isLoading, error } = useQuery({
    queryKey: ["loyalty-programs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("loyalty_programs")
        .select(`
          *,
          business_profiles (
            business_name
          )
        `);

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[140px] w-full" />
        <Skeleton className="h-[140px] w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load loyalty programs. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Loyalty Programs</h2>
      {programs?.length === 0 ? (
        <Alert>
          <AlertDescription>
            No loyalty programs available at the moment.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {programs?.map((program) => (
            <LoyaltyProgramCard
              key={program.id}
              programName={program.program_name}
              pointsPerDollar={program.points_per_dollar}
              businessName={program.business_profiles.business_name}
            />
          ))}
        </div>
      )}
    </div>
  );
};