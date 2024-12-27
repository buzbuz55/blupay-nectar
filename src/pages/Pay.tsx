import { ArrowLeft, QrCode, Search, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PaymentScreen } from "@/components/payment/PaymentScreen";

const contacts = [
  {
    id: 1,
    name: "Kollel Chatzos",
    username: "@kollel-chatzos",
    initials: "KC",
    image: "/lovable-uploads/223a1454-fa94-4477-a9c7-62432d05a73a.png"
  },
  {
    id: 2,
    name: "Breslov Yeshiva",
    username: "@TheBreslov-Yeshiva",
    initials: "BY",
    image: null
  },
  {
    id: 3,
    name: "Zichron Moshe",
    username: "@Zichron-Moshe",
    initials: "ZM",
    image: null
  },
  {
    id: 4,
    name: "Bnei Melachim",
    username: "@BneiMelachim",
    initials: "BM",
    image: null
  },
  {
    id: 5,
    name: "Joshua Whitney",
    username: "@wwstudios",
    initials: "JW",
    image: null
  }
];

const PayPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSyncContacts = () => {
    toast({
      title: "Syncing contacts",
      description: "We're syncing your contacts to help you find people you know.",
    });
  };

  const handleContactClick = (contact: typeof contacts[0]) => {
    navigate(`/pay/${contact.id}`);
  };

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-background">
            <div className="flex justify-between items-center p-4 text-sm text-gray-600">
              <span>1:09</span>
              <div className="flex items-center gap-2">
                <span className="h-4 w-4">📱</span>
                <span className="h-4 w-4">🔋</span>
              </div>
            </div>

            <div className="sticky top-0 bg-background z-10 px-4 py-3 border-b">
              <div className="flex items-center gap-3">
                <Link to="/" className="text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="h-6 w-6" />
                </Link>
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none" 
                      placeholder="Name, @username, phone, or email"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <QrCode className="h-6 w-6 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-4 border-b">
              <Button
                variant="ghost"
                className="w-full flex items-center gap-4 hover:bg-gray-50"
                onClick={handleSyncContacts}
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-gray-600" />
                </div>
                <div className="text-left">
                  <h2 className="text-xl font-semibold">Sync your contacts</h2>
                  <p className="text-gray-600">Easily find people you know.</p>
                </div>
              </Button>
            </div>

            <div className="p-4">
              <h3 className="text-xl font-semibold mb-4">Top people</h3>
              <div className="space-y-4">
                {filteredContacts.map((contact) => (
                  <button 
                    key={contact.id}
                    className="flex items-center gap-4 w-full hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    onClick={() => handleContactClick(contact)}
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={contact.image} />
                      <AvatarFallback className="bg-gray-200 text-gray-600">
                        {contact.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <div className="font-semibold">{contact.name}</div>
                      <div className="text-gray-600 text-sm">{contact.username}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        }
      />
      <Route path="/:id" element={<PaymentScreen />} />
    </Routes>
  );
};

export default PayPage;