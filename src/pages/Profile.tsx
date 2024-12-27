import { ProfileDropdown } from "@/components/profile/ProfileDropdown";

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
    </div>
  );
};

export default ProfilePage;