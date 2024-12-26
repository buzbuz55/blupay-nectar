import { ArrowRight, Megaphone, CreditCard } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const CardsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background p-6 pb-24">
      <h1 className="text-3xl font-bold mb-6">BLUPAY Cards</h1>
      
      {/* Credit Card Section */}
      <Card 
        className="mb-4 p-6 flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => navigate("/cards/credit")}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">BLUPAY Credit Card:</h2>
            <p className="text-gray-600 text-lg mb-1">
              No impact to your credit score if declined.
            </p>
            <button className="text-blupay-primary text-sm hover:underline">
              See terms.
            </button>
          </div>
          <div className="w-24 h-full bg-emerald-400 rounded-r-xl flex items-center justify-center">
            <ArrowRight className="w-8 h-8 text-white" />
          </div>
        </div>
      </Card>

      {/* Debit Card Section */}
      <Card 
        className="mb-4 p-6 flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => navigate("/cards/debit")}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">Sign up for the BLUPAY Debit Card</h2>
            <p className="text-gray-600 text-lg">
              Automatic cashback offers. No monthly fee. No credit check.
            </p>
          </div>
          <div className="w-24 h-full bg-blupay-primary rounded-r-xl flex items-center justify-center">
            <ArrowRight className="w-8 h-8 text-white" />
          </div>
        </div>
      </Card>

      {/* Teen Debit Card Section */}
      <Card 
        className="p-6 flex items-center cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => navigate("/cards/teen")}
      >
        <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mr-4">
          <Megaphone className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-1">BLUPAY Teen Debit Card</h2>
          <p className="text-gray-600">
            Flexibility for teens, visibility for adults. All with no monthly fee.
          </p>
        </div>
        <ArrowRight className="w-6 h-6 text-gray-400" />
      </Card>
    </div>
  );
};

export default CardsPage;