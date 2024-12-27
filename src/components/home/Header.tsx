import { Bell, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-app-dark p-6 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark opacity-50" />
      <div className="absolute inset-0 backdrop-blur-sm" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-neon text-transparent bg-clip-text">
              H Baz
            </h1>
            <p className="text-sm text-neon-green/80 font-medium">@bazbaz</p>
          </div>
          
          <div className="flex gap-4">
            <Link 
              to="/notifications" 
              className="relative p-2 hover:bg-neon-green/10 rounded-xl transition-all duration-200"
            >
              <Bell className="w-6 h-6 text-neon-green" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-neon-blue rounded-full" />
            </Link>
            
            <Link 
              to="/settings" 
              className="p-2 hover:bg-neon-green/10 rounded-xl transition-all duration-200"
            >
              <Settings className="w-6 h-6 text-neon-green" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};