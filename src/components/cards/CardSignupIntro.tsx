import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const CardSignupIntro = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4">
      <div className="space-y-6 max-w-md mx-auto pt-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Manage your finances easily
          </h1>
          <p className="text-gray-500">
            Everlasting cards management app
          </p>
        </div>

        <div className="relative aspect-[4/3] w-full max-w-sm mx-auto my-8">
          <div className="absolute inset-0 bg-gradient-to-br from-blupay-primary/20 to-blupay-accent/20 rounded-3xl transform rotate-6"></div>
          <Card className="relative h-full bg-white p-6 rounded-3xl shadow-xl">
            <div className="h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <img src="/visa.svg" alt="VISA" className="w-16 opacity-50" />
                <p className="text-right text-sm text-gray-600">Michele Joana</p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center opacity-50">
                  <div className="text-sm">4580 7634 3506 8920</div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full border-2"></div>
                    <div className="w-8 h-8 rounded-full border-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4 pt-4">
          <Button 
            onClick={() => navigate("/cards/credit")}
            className="w-full h-14 text-lg bg-blupay-primary hover:bg-blupay-primary/90"
          >
            Apply for Credit Card
          </Button>
          
          <Button 
            onClick={() => navigate("/cards/debit")}
            variant="outline"
            className="w-full h-14 text-lg border-2"
          >
            Get a Debit Card
          </Button>
          
          <Button 
            onClick={() => navigate("/cards/crypto")}
            variant="outline"
            className="w-full h-14 text-lg border-2 border-blupay-accent text-blupay-accent hover:bg-blupay-accent/10"
          >
            Crypto Card
          </Button>
        </div>
      </div>
    </div>
  );
};