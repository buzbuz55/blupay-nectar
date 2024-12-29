import { Button } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Bank {
  name: string;
  type: string;
  lastFour: string;
  logo?: string;
}

const banks: Bank[] = [
  {
    name: "Bank of America",
    type: "Credit",
    lastFour: "4880",
    logo: "/bank-of-america-logo.png"
  }
];

export const BanksList = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Banks and cards</h3>
      <div className="grid grid-cols-2 gap-4">
        {banks.map((bank) => (
          <div 
            key={bank.lastFour}
            className="bg-white rounded-xl p-4 shadow-sm"
          >
            <div className="h-20 bg-red-600 rounded-lg mb-3" />
            <h4 className="font-medium truncate">{bank.name}</h4>
            <p className="text-gray-600">{bank.type}</p>
            <p className="text-gray-600">•••• {bank.lastFour}</p>
          </div>
        ))}
        
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-full aspect-square rounded-xl border-2 border-dashed"
          onClick={() => navigate("/add-bank")}
        >
          <Plus className="h-8 w-8 mb-2 text-blue-600" />
          <span className="text-blue-600 font-medium text-center">
            Add a bank<br />or card
          </span>
        </Button>
      </div>
    </div>
  );
};