import { ProfileDropdown } from "@/components/profile/ProfileDropdown";
import { BottomNav } from "@/components/layout/BottomNav";

const ProfilePage = () => {
  // This would come from your auth context/state management
  const mockProfile = {
    name: "H Baz",
    username: "bazbaz",
    balance: "6.76",
    avatarUrl: undefined
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileDropdown profile={mockProfile} />
      <BottomNav />
    </div>
  );
};

export default ProfilePage;