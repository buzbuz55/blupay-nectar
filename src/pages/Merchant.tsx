import { useState } from "react";
import { Building2, ChevronLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

interface Merchant {
  id: string;
  name: string;
  category: string;
  image?: string;
  initials: string;
}

const merchants: Merchant[] = [
  {
    id: "1",
    name: "Walmart",
    category: "Retail",
    initials: "W",
    image: "/lovable-uploads/223a1454-fa94-4477-a9c7-62432d05a73a.png"
  },
  {
    id: "2",
    name: "Target",
    category: "Retail",
    initials: "T"
  },
  {
    id: "3",
    name: "Starbucks",
    category: "Food & Beverage",
    initials: "S"
  },
  {
    id: "4",
    name: "Amazon",
    category: "E-commerce",
    initials: "A"
  }
];

const MerchantPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const filteredMerchants = merchants.filter(merchant =>
    merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    merchant.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePayMerchant = (merchant: Merchant) => {
    toast({
      title: "Payment Initiated",
      description: `Starting payment to ${merchant.name}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 bg-background z-10 px-4 py-3 border-b">
        <div className="flex items-center gap-3">
          <Link to="/bluai" className="text-gray-600 hover:text-gray-900">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none" 
                placeholder="Search merchants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Merchant Payments</h1>
          <p className="text-gray-600">Pay businesses and merchants directly</p>
        </div>

        <div className="space-y-4">
          {filteredMerchants.map((merchant) => (
            <Card 
              key={merchant.id}
              className="p-4 hover:shadow-md transition-shadow"
            >
              <button 
                className="flex items-center gap-4 w-full"
                onClick={() => handlePayMerchant(merchant)}
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={merchant.image} />
                  <AvatarFallback className="bg-gray-200 text-gray-600">
                    {merchant.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <div className="font-semibold">{merchant.name}</div>
                  <div className="text-sm text-gray-500">{merchant.category}</div>
                </div>
                <Button variant="outline" size="sm">
                  Pay
                </Button>
              </button>
            </Card>
          ))}

          {filteredMerchants.length === 0 && (
            <div className="text-center py-8">
              <Building2 className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-4 text-gray-600">No merchants found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MerchantPage;