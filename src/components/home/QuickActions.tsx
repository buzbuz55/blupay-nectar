import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export const QuickActions = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <Button
        variant="outline"
        className="flex items-center justify-center gap-2 p-4 h-auto"
      >
        <Users className="w-6 h-6 text-blupay-primary" />
        <span className="text-blupay-primary font-medium">Create a group</span>
      </Button>
      <Button
        variant="outline"
        className="flex items-center justify-center gap-2 p-4 h-auto"
      >
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          LM
        </div>
        <span className="text-gray-700">219 friends</span>
      </Button>
    </div>
  );
};