import { Bell, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-white px-4 py-6 sticky top-0 z-50 backdrop-blur-lg bg-white/80">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">H Baz</h1>
            <p className="text-sm text-gray-500 font-medium">@bazbaz</p>
          </div>
          
          <div className="flex gap-2">
            <Link 
              to="/notifications" 
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <Bell className="w-6 h-6 text-gray-700" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Link>
            
            <Link 
              to="/settings" 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <Settings className="w-6 h-6 text-gray-700" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};