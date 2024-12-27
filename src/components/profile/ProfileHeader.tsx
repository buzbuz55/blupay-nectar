import { Link } from "react-router-dom";

interface ProfileHeaderProps {
  name: string;
  username: string;
}

export const ProfileHeader = ({ name, username }: ProfileHeaderProps) => {
  return (
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">{name}</h1>
          <span>▼</span>
        </div>
        <p className="text-white/90">@{username}</p>
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
  );
};