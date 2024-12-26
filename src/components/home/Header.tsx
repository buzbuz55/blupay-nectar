import { Bell, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-blupay-primary text-white p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">H Baz ▼</h1>
          <p className="text-sm opacity-90">@bazbaz</p>
        </div>
        <div className="flex gap-4">
          <Link to="/notifications" className="hover:opacity-80 transition-opacity">
            <Bell className="w-6 h-6" />
          </Link>
          <Link to="/settings" className="hover:opacity-80 transition-opacity">
            <Settings className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </header>
  );
};