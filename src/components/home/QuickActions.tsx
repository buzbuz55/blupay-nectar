import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <Button
        variant="outline"
        className="flex items-center justify-center gap-2 p-4 h-auto"
        onClick={() => navigate("/pay")}
      >
        <Users className="w-6 h-6 text-blupay-primary" />
        <span className="text-blupay-primary font-medium">Create a group</span>
      </Button>
      <Button
        variant="outline"
        className="flex items-center justify-center gap-2 p-4 h-auto"
        onClick={() => navigate("/profile")}
      >
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          LM
        </div>
        <span className="text-gray-700">219 friends</span>
      </Button>
    </div>
  );
};