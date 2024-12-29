import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const CryptoBalance = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white rounded-xl p-4 mb-4">
      <h3 className="text-lg font-medium mb-2">Crypto</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold">$</span>
        <span className="text-4xl font-bold">0</span>
      </div>
      <p className="text-sm text-gray-500 mt-1">Last update: 11:20 PM*</p>
      
      <Button 
        variant="outline" 
        className="w-full mt-4"
        onClick={() => navigate("/crypto")}
      >
        View
      </Button>
    </div>
  );
};