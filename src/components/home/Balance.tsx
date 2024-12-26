import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const Balance = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAccountInfo = () => {
    toast({
      title: "Account Information",
      description: "Account & Routing information will be displayed here",
    });
  };

  return (
    <Card className="p-6 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Balance</h2>
        <Button variant="outline" size="sm" onClick={handleAccountInfo}>
          Account & Routing
        </Button>
      </div>
      <div className="mb-6">
        <span className="text-3xl font-bold">$6.76</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button 
          className="w-full bg-blupay-primary hover:bg-blupay-primary/90"
          onClick={() => navigate("/pay")}
        >
          Transfer
        </Button>
        <Button 
          className="w-full bg-blupay-primary hover:bg-blupay-primary/90"
          onClick={() => navigate("/cards")}
        >
          Add money
        </Button>
      </div>
    </Card>
  );
};