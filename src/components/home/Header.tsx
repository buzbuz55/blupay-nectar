import { Bell, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blupay-dark to-blupay-primary p-6 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <Link 
            to="/profile" 
            className="space-y-1 group transition-transform duration-200 hover:scale-105"
          >
            <h1 className="text-2xl font-bold tracking-tight group-hover:text-white/90">H Baz</h1>
            <p className="text-sm text-white/80 font-medium">@bazbaz</p>
          </Link>
          
          <div className="flex gap-4">
            <Link 
              to="/notifications" 
              className="relative p-2 hover:bg-white/10 rounded-xl transition-colors duration-200"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blupay-accent rounded-full" />
            </Link>
            
            <Link 
              to="/settings" 
              className="p-2 hover:bg-white/10 rounded-xl transition-colors duration-200"
            >
              <Settings className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};