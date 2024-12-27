import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export const ProfileActions = () => {
  return (
    <div className="flex gap-4">
      <Button
        variant="outline"
        className="flex-1 h-auto py-4 flex flex-col items-center gap-2"
        onClick={() => console.log("Create group")}
      >
        <Users className="w-6 h-6 text-blupay-primary" />
        <span className="text-sm font-medium text-blupay-primary">Create a group</span>
      </Button>
      
      <Button
        variant="outline"
        className="flex-1 h-auto py-4 flex flex-col items-center gap-2"
      >
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <span>LM</span>
        </div>
        <span className="text-sm font-medium">219 friends</span>
      </Button>
    </div>
  );
};