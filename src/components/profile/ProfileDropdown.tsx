import { ProfileHeader } from "./ProfileHeader";
import { ProfileQRCode } from "./ProfileQRCode";
import { ProfileActions } from "./ProfileActions";
import { ProfileBalance } from "./ProfileBalance";
import { ProfileCrypto } from "./ProfileCrypto";

interface ProfileInfo {
  name: string;
  username: string;
  balance: string;
  avatarUrl?: string;
}

export const ProfileDropdown = ({ profile }: { profile: ProfileInfo }) => {
  return (
    <div className="min-h-screen bg-blupay-primary">
      <div className="relative bg-blupay-primary text-white p-6 pb-20">
        <ProfileHeader name={profile.name} username={profile.username} />
        <ProfileQRCode 
          username={profile.username} 
          name={profile.name} 
          avatarUrl={profile.avatarUrl} 
        />
      </div>

      <div className="bg-white rounded-t-[2rem] -mt-10 min-h-screen p-6">
        <div className="space-y-6">
          <ProfileActions />
          
          <div className="flex gap-4 border-b">
            <button className="px-4 py-2 text-blupay-primary border-b-2 border-blupay-primary font-medium">
              Wallet
            </button>
            <button className="px-4 py-2 text-gray-500">
              Transactions
            </button>
          </div>

          <ProfileBalance />
          <ProfileCrypto />
        </div>
      </div>
    </div>
  );
};