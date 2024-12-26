import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Balance = () => {
  return (
    <Card className="p-6 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Balance</h2>
        <Button variant="outline" size="sm">
          Account & Routing
        </Button>
      </div>
      <div className="mb-6">
        <span className="text-3xl font-bold">$6.76</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button className="w-full bg-blupay-primary hover:bg-blupay-primary/90">
          Transfer
        </Button>
        <Button className="w-full bg-blupay-primary hover:bg-blupay-primary/90">
          Add money
        </Button>
      </div>
    </Card>
  );
};