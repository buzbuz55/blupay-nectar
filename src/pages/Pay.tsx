import { ArrowLeft, QrCode, Search, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const contacts = [
  {
    id: 1,
    name: "Kollel Chatzos",
    username: "@kollel-chatzos",
    initials: "KC",
    image: null
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
  },
  {
    id: 6,
    name: "Shmuel Wise",
    username: "@realcleardaf",
    initials: "SW",
    image: null
  },
  {
    id: 7,
    name: "Derech Emet",
    username: "@congderechemet",
    initials: "DE",
    image: null
  },
  {
    id: 8,
    name: "Kollel Kotel",
    username: "@Kollelkotel",
    initials: "KK",
    image: null
  }
];

const PayPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
              />
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <QrCode className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Sync Contacts Section */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <Users className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Sync your contacts</h2>
            <p className="text-gray-600">Easily find people you know.</p>
          </div>
        </div>
      </div>

      {/* Top People Section */}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-4">Top people</h3>
        <div className="space-y-4">
          {contacts.map((contact) => (
            <button 
              key={contact.id}
              className="flex items-center gap-4 w-full hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <Avatar className="h-12 w-12">
                {contact.image && <img src={contact.image} alt={contact.name} />}
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
  );
};

export default PayPage;