import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

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
    name: "BluPay Platinum Card",
    type: "Premium Travel",
    annualFee: 0,
    image: "/lovable-uploads/089660a8-ff67-450b-8250-9d150a8e0065.png",
    welcomeOffer: "Earn 80,000 Membership Rewards® points after spending $8,000 in first 6 months",
    rewardsRate: [
      "5x points on flights booked directly with airlines",
      "5x points on prepaid hotels booked with BluPay Travel",
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
    name: "BluPay Royal Blue",
    type: "Travel Rewards",
    annualFee: 0,
    image: "/lovable-uploads/0c78a7a3-7957-4488-8d24-5ef4db6a0eac.png",
    welcomeOffer: "Earn 60,000 bonus points after spending $4,000 in first 3 months",
    rewardsRate: [
      "5x points on travel purchased through BluPay Travel",
      "3x points on dining and streaming services",
      "2x points on all other travel purchases",
      "1x points on all other purchases"
    ],
    benefits: [
      "Transfer points to travel partners",
      "Travel insurance coverage",
      "No foreign transaction fees",
      "Premium dining benefits"
    ]
  },
  {
    name: "BluPay Sky Blue",
    type: "Travel Rewards",
    annualFee: 0,
    image: "/lovable-uploads/ca138254-7501-4563-abbc-f8f385dab436.png",
    welcomeOffer: "Earn 75,000 miles after spending $4,000 in first 3 months",
    rewardsRate: [
      "5x miles on hotels and rental cars booked through BluPay Travel",
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

export const FeaturedCards = () => {
  const { toast } = useToast();

  const handleApply = () => {
    toast({
      title: "Application Started",
      description: "Redirecting to card application form...",
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Featured Credit Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewardCards.map((card) => (
          <Card key={card.name} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-4 space-y-4 flex-1 flex flex-col">
              <div className="aspect-[1.6/1] relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden">
                <img 
                  src={card.image} 
                  alt={card.name}
                  className="absolute inset-0 w-full h-full object-cover transform scale-125 hover:scale-150 transition-transform duration-300"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{card.name}</h3>
                <p className="text-sm text-gray-600">{card.type}</p>
                <p className="text-sm font-medium mt-1">
                  Annual Fee: ${card.annualFee.toFixed(2)}
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
              <div className="flex-1">
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
              <div className="mt-auto pt-4">
                <Button className="w-full" onClick={handleApply}>
                  Apply Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};