import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const WalletBalance = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl p-4 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium">Balance</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold">$</span>
            <span className="text-5xl font-bold">6</span>
            <span className="text-3xl font-bold">.76</span>
          </div>
        </div>
        <button className="flex items-center gap-1 text-gray-600">
          Account & Routing
          <Eye className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex gap-4 mt-6">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => navigate("/transfer")}
        >
          Transfer
        </Button>
        <Button 
          className="flex-1 bg-blue-600 hover:bg-blue-700"
          onClick={() => navigate("/add-money")}
        >
          Add money
        </Button>
      </div>
    </div>
  );
};