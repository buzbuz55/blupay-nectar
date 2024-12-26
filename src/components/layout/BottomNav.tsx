import { Home, CreditCard, Send, Bitcoin, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const BottomNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: CreditCard, label: "Cards", path: "/cards" },
    { icon: Send, label: "Pay/Request", path: "/pay" },
    { icon: Bitcoin, label: "Crypto", path: "/crypto" },
    { icon: User, label: "Me", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 shadow-lg">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center transition-all duration-200 transform hover:scale-105 ${
              isActive(item.path) 
                ? "text-blupay-primary scale-105" 
                : "text-gray-500"
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};