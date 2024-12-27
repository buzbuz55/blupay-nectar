import { Users, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        className="flex items-center justify-center gap-2 p-4 h-auto rounded-2xl border-2 border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all"
        onClick={() => navigate("/pay")}
      >
        <Users className="w-5 h-5 text-gray-700" />
        <span className="text-gray-900 font-medium">Create Group</span>
      </Button>
      <Button
        variant="outline"
        className="flex items-center justify-center gap-2 p-4 h-auto rounded-2xl border-2 border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all"
        onClick={() => navigate("/pay")}
      >
        <Gift className="w-5 h-5 text-gray-700" />
        <span className="text-gray-900 font-medium">Send Gift</span>
      </Button>
    </div>
  );
};