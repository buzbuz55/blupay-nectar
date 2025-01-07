import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Receipt, Star, ChartBar, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface BusinessProfile {
  id: string;
  business_name: string;
  business_type: string;
  contact_email: string | null;
  contact_phone: string | null;
  address: string | null;
  logo_url: string | null;
}

export const BusinessFeatures = () => {
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);

  const { data: businessProfile, isLoading } = useQuery({
    queryKey: ['businessProfile'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('business_profiles')
        .select('*')
        .maybeSingle();

      if (error) throw error;
      return data as BusinessProfile | null;
    }
  });

  const handleCreateBusiness = async () => {
    setIsCreating(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.from('business_profiles').insert({
        user_id: user.id,
        business_name: 'My Business',
        business_type: 'Retail',
      });

      if (error) throw error;

      toast({
        title: "Business Profile Created",
        description: "You can now manage your business features",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create business profile",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Business Features</h2>
      
      {!businessProfile ? (
        <Card className="p-6">
          <div className="text-center space-y-4">
            <Briefcase className="w-12 h-12 mx-auto text-blue-600" />
            <h3 className="text-lg font-semibold">Create Business Profile</h3>
            <p className="text-gray-600">
              Start accepting payments and manage your business with our suite of tools
            </p>
            <Button 
              onClick={handleCreateBusiness} 
              disabled={isCreating}
              className="w-full"
            >
              {isCreating ? "Creating..." : "Create Business Profile"}
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 hover:shadow-lg transition-shadow">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold">Business Profile</h3>
              </div>
              <p className="text-sm text-gray-600">
                {businessProfile.business_name}
              </p>
              <Button variant="outline" className="w-full">
                Manage Profile
              </Button>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-shadow">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <h3 className="font-semibold">Loyalty Program</h3>
              </div>
              <p className="text-sm text-gray-600">
                Reward your customers
              </p>
              <Button variant="outline" className="w-full">
                Manage Program
              </Button>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-shadow">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold">Digital Receipts</h3>
              </div>
              <p className="text-sm text-gray-600">
                View and manage receipts
              </p>
              <Button variant="outline" className="w-full">
                View Receipts
              </Button>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-shadow">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ChartBar className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold">Analytics</h3>
              </div>
              <p className="text-sm text-gray-600">
                Business insights
              </p>
              <Button variant="outline" className="w-full">
                View Analytics
              </Button>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-shadow">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                <h3 className="font-semibold">Invoices</h3>
              </div>
              <p className="text-sm text-gray-600">
                Generate and manage invoices
              </p>
              <Button variant="outline" className="w-full">
                Manage Invoices
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};