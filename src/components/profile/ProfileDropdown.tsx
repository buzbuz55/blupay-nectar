import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QrCode, Eye, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ProfileInfo {
  name: string;
  username: string;
  balance: string;
  avatarUrl?: string;
}

export const ProfileDropdown = ({ profile }: { profile: ProfileInfo }) => {
  return (
    <div className="min-h-screen bg-blupay-primary">
      {/* Header with curved bottom */}
      <div className="relative bg-blupay-primary text-white p-6 pb-20">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <span>▼</span>
            </div>
            <p className="text-white/90">@{profile.username}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/notifications" className="p-2 bg-white/10 rounded-full">
              <div className="w-6 h-6 flex items-center justify-center">
                🔔
              </div>
            </Link>
            <Link to="/settings" className="p-2 bg-white/10 rounded-full">
              <div className="w-6 h-6 flex items-center justify-center">
                ⚙️
              </div>
            </Link>
          </div>
        </div>

        {/* Profile Image and QR */}
        <div className="relative mt-8">
          <div className="absolute right-0 bottom-0 p-2 bg-white rounded-lg">
            <QrCode className="w-5 h-5 text-gray-600" />
          </div>
          <Avatar className="w-24 h-24 border-4 border-white">
            <AvatarImage src={profile.avatarUrl} />
            <AvatarFallback className="text-2xl">{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Main Content with White Background */}
      <div className="bg-white rounded-t-[2rem] -mt-10 min-h-screen p-6">
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1 h-auto py-4 flex flex-col items-center gap-2"
              onClick={() => console.log("Create group")}
            >
              <Users className="w-6 h-6 text-blupay-primary" />
              <span className="text-sm font-medium text-blupay-primary">Create a group</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex-1 h-auto py-4 flex flex-col items-center gap-2"
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span>LM</span>
              </div>
              <span className="text-sm font-medium">219 friends</span>
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b">
            <button className="px-4 py-2 text-blupay-primary border-b-2 border-blupay-primary font-medium">
              Wallet
            </button>
            <button className="px-4 py-2 text-gray-500">
              Transactions
            </button>
          </div>

          {/* Balance Card */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium">Balance</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">$</span>
                  <span className="text-5xl font-bold">6</span>
                  <span className="text-3xl font-bold">.76</span>
                </div>
              </div>
              <button className="flex items-center gap-1 text-gray-600">
                Account & Routing
                <Eye className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex gap-4 mt-6">
              <Button variant="outline" className="flex-1">
                Transfer
              </Button>
              <Button className="flex-1">
                Add money
              </Button>
            </div>
          </div>

          {/* Crypto Section */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-lg font-medium mb-2">Crypto</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">$</span>
              <span className="text-4xl font-bold">0</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Last update: 12:08 AM*</p>
            
            <Button variant="outline" className="w-full mt-4">
              View
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};