import { useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // In a real app, you would fetch user data based on the ID
  const mockUserData = {
    id: parseInt(id || "1"),
    name: "Sarah Johnson",
    username: "@sarahj",
    bio: "Digital nomad & coffee enthusiast ✨",
    avatar: "/lovable-uploads/photo-1581091226825-a6a2a5aee158.jpg",
    transactions: 142,
    friends: 891
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        
        <div className="flex flex-col items-center space-y-4">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <img 
              src={mockUserData.avatar}
              alt={mockUserData.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold">{mockUserData.name}</h1>
            <p className="text-gray-600">{mockUserData.username}</p>
            <p className="mt-2 text-gray-800">{mockUserData.bio}</p>
          </div>
          
          <div className="flex gap-8 mt-6">
            <div className="text-center">
              <p className="text-2xl font-bold">{mockUserData.transactions}</p>
              <p className="text-gray-600">Transactions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{mockUserData.friends}</p>
              <p className="text-gray-600">Friends</p>
            </div>
          </div>
          
          <div className="w-full max-w-md mt-8">
            <Button className="w-full" variant="outline">
              Add Friend
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;