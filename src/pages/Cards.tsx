import { Routes, Route } from "react-router-dom";
import { CardSignupIntro } from "@/components/cards/CardSignupIntro";
import { useState } from "react";
import { Settings, Plus, CreditCard, Building2, DollarSign, Plane, Hotel, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { RedPacket } from "@/components/redpacket/RedPacket";

interface RewardCard {
  name: string;
  type: string;
  annualFee: number;
  image: string;
  welcomeOffer: string;
  rewardsRate: string[];
  benefits: string[];
}

const rewardCards: RewardCard[] = [
  {
    name: "American Express Platinum",
    type: "Premium Travel",
    annualFee: 695,
    image: "/lovable-uploads/9c2f46af-a950-4998-a24b-75f577e294f3.png",
    welcomeOffer: "Earn 80,000 Membership Rewards® points after spending $8,000 in first 6 months",
    rewardsRate: [
      "5x points on flights booked directly with airlines",
      "5x points on prepaid hotels booked with American Express Travel",
      "1x points on all other purchases"
    ],
    benefits: [
      "Airport lounge access",
      "Hotel elite status",
      "Airline fee credits",
      "Global Entry/TSA PreCheck credit"
    ]
  },
  {
    name: "Chase Sapphire Preferred",
    type: "Travel Rewards",
    annualFee: 95,
    image: "/lovable-uploads/d811bec2-b380-45c8-83a0-c28c1d41fb8e.png",
    welcomeOffer: "Earn 60,000 bonus points after spending $4,000 in first 3 months",
    rewardsRate: [
      "5x points on travel purchased through Chase Travel",
      "3x points on dining and streaming services",
      "2x points on all other travel purchases",
      "1x points on all other purchases"
    ],
    benefits: [
      "Transfer points to travel partners",
      "Travel insurance coverage",
      "No foreign transaction fees",
      "DoorDash DashPass membership"
    ]
  },
  {
    name: "Capital One Venture",
    type: "Travel Rewards",
    annualFee: 95,
    image: "/lovable-uploads/6f883efa-ac1b-4e84-b402-0a859b21f181.png",
    welcomeOffer: "Earn 75,000 miles after spending $4,000 in first 3 months",
    rewardsRate: [
      "5x miles on hotels and rental cars booked through Capital One Travel",
      "2x miles on all other purchases"
    ],
    benefits: [
      "Global Entry/TSA PreCheck credit",
      "Transfer miles to travel partners",
      "No foreign transaction fees",
      "Travel accident insurance"
    ]
  }
];

const CardsOverview = () => {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = (method: string) => {
    setIsConnecting(true);
    toast({
      title: "Plaid Integration Required",
      description: "Backend integration with Plaid API is needed to connect payment methods securely.",
    });
    setTimeout(() => setIsConnecting(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white p-4 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">Payment Methods</h1>
          <Link to="/settings" className="text-gray-600">
            <Settings className="w-6 h-6" />
          </Link>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Developer Note */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <h2 className="font-semibold text-blue-800 mb-2">Developer Note</h2>
          <p className="text-sm text-blue-700 mb-4">
            This page requires Plaid API integration for secure bank connections. 
          </p>
          <ol className="list-decimal list-inside text-sm text-blue-700 space-y-2">
            <li>Set up a Plaid account and obtain API keys</li>
            <li>Implement Plaid Link token creation on the backend</li>
            <li>Integrate Plaid Link SDK for secure authentication</li>
            <li>Handle token exchange and account verification</li>
          </ol>
        </Card>

        {/* Custom Cards Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Featured Credit Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewardCards.map((card) => (
              <Card key={card.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-4 space-y-4">
                  <div className="aspect-[1.6/1] relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden">
                    <img 
                      src={card.image} 
                      alt={card.name}
                      className="absolute inset-0 w-full h-full object-contain p-4"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{card.name}</h3>
                    <p className="text-sm text-gray-600">{card.type}</p>
                    <p className="text-sm font-medium mt-1">
                      Annual Fee: ${card.annualFee}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">Welcome Offer</h4>
                    <p className="text-sm text-gray-600">{card.welcomeOffer}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">Rewards Rate</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {card.rewardsRate.map((rate, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="mt-1">•</span>
                          <span>{rate}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">Key Benefits</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {card.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="mt-1">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full" onClick={() => handleConnect("card")}>
                    Apply Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Connect Methods */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Add a payment method</h2>
          
          <Button
            variant="outline"
            className="w-full justify-start h-auto p-4 bg-white"
            onClick={() => handleConnect("bank")}
            disabled={isConnecting}
          >
            <Building2 className="w-6 h-6 mr-3" />
            <div className="text-left">
              <div className="font-semibold">Connect a bank account</div>
              <div className="text-sm text-gray-500">Direct deposit, buy, and cash out</div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start h-auto p-4 bg-white"
            onClick={() => handleConnect("card")}
            disabled={isConnecting}
          >
            <CreditCard className="w-6 h-6 mr-3" />
            <div className="text-left">
              <div className="font-semibold">Add a debit or credit card</div>
              <div className="text-sm text-gray-500">Buy crypto instantly</div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start h-auto p-4 bg-white"
            onClick={() => handleConnect("paypal")}
            disabled={isConnecting}
          >
            <DollarSign className="w-6 h-6 mr-3" />
            <div className="text-left">
              <div className="font-semibold">Connect PayPal</div>
              <div className="text-sm text-gray-500">Buy and cash out with PayPal</div>
            </div>
          </Button>
        </div>

        {/* Red Packet Feature */}
        <RedPacket />
      </main>
    </div>
  );
};

const Cards = () => {
  return (
    <Routes>
      <Route index element={<CardSignupIntro />} />
      <Route path="overview" element={<CardsOverview />} />
      <Route path="credit" element={<div className="p-4">Credit Card Application Form (Coming Soon)</div>} />
      <Route path="debit" element={<div className="p-4">Debit Card Application Form (Coming Soon)</div>} />
      <Route path="crypto" element={<div className="p-4">Crypto Card Application Form (Coming Soon)</div>} />
    </Routes>
  );
};

export default Cards;