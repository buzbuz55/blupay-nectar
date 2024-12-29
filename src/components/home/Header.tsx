import { Bell, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { SearchDialog } from "../search/SearchDialog";
import { Logo } from "../common/Logo";

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-[#1A1F2C] to-[#9b87f5] p-4 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Logo size="md" />
            <Link 
              to="/profile" 
              className="flex flex-col space-y-0.5 group transition-transform duration-200 hover:scale-102"
            >
              <h1 className="text-xl font-semibold tracking-tight group-hover:text-white/90">H Baz</h1>
              <p className="text-sm text-white/70 font-medium">@bazbaz</p>
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <SearchDialog />
            
            <Link 
              to="/notifications" 
              className="relative p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#D6BCFA] rounded-full" />
            </Link>
            
            <Link 
              to="/settings" 
              className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
              <Settings className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};