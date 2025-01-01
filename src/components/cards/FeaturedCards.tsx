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
    image: "/lovable-uploads/98bcc655-8004-4a4a-9a22-90d9f6e01105.png",
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
    name: "BluPay Aquamarine Premier",
    type: "Travel Rewards",
    annualFee: 0,
    image: "/lovable-uploads/f9032a2c-660e-48c3-a038-5ddd35362fad.png",
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
    name: "BluPay Aviation Flyer",
    type: "Travel Rewards",
    annualFee: 0,
    image: "/lovable-uploads/b928fc8e-fcb2-454f-bb94-d54cced9f728.png",
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
              <Button className="w-full" onClick={handleApply}>
                Apply Now
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};