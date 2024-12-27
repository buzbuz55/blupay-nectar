import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { PaymentModal } from "../payment/PaymentModal";

interface ProfileInfo {
  name: string;
  username: string;
  balance: string;
  avatarUrl?: string;
}

export const ProfileDropdown = ({ profile }: { profile: ProfileInfo }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<any>(null);

  const handleProfileClick = (recipient: any) => {
    setSelectedRecipient(recipient);
    setIsPaymentModalOpen(true);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="p-4 space-y-6">
        {/* Header with time and status */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>1:10</span>
          <div className="flex items-center gap-2">
            <span className="h-4 w-4">📱</span>
            <span className="h-4 w-4">🔋</span>
          </div>
        </div>

        {/* Your accounts section */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Your accounts</h1>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={profile.avatarUrl} />
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{profile.name}</h2>
                <p className="text-gray-600">@{profile.username}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full border">
                <QrCode className="h-5 w-5" />
              </div>
              <div className="px-4 py-2 rounded-full border font-medium">
                ${profile.balance}
              </div>
            </div>
          </div>
        </div>

        {/* Completed Transactions Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Completed</h2>
            <span className="text-3xl text-gray-500">2024</span>
          </div>
          
          <div className="space-y-4">
            {/* Transaction items */}
            <button 
              className="w-full flex items-center justify-between py-2"
              onClick={() => handleProfileClick({
                name: "Kollel Kotel",
                username: "@kollel-kotel",
                initials: "KK"
              })}
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>KK</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Kollel Kotel</p>
                  <div className="flex items-center gap-1 text-gray-600">
                    <span>Dec 26</span>
                    <span>🔒</span>
                  </div>
                </div>
              </div>
              <span className="text-red-500 font-medium">- $53.56</span>
            </button>
          </div>
        </div>
      </div>

      {selectedRecipient && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          recipient={selectedRecipient}
        />
      )}
    </div>
  );
};