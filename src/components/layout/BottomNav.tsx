import { Home, CreditCard, Send, Bitcoin, Bot } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const BottomNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === "/cards") {
      return location.pathname.startsWith("/cards");
    }
    return location.pathname === path;
  };
  
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: CreditCard, label: "Cards", path: "/cards/overview" },
    { icon: Send, label: "Pay/Request", path: "/pay" },
    { icon: Bitcoin, label: "Crypto", path: "/crypto" },
    { icon: Bot, label: "BLUAi", path: "/bluai" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 py-2 px-4 shadow-lg z-50">
      <div className="flex justify-around items-center max-w-lg mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center transition-all duration-200 px-3 py-1 rounded-xl ${
              isActive(item.path) 
                ? "text-blupay-primary scale-105 bg-blupay-primary/10" 
                : "text-gray-500 hover:text-blupay-primary/80 hover:bg-blupay-primary/5"
            }`}
          >
            <item.icon className={`w-5 h-5 transition-transform duration-200 ${
              isActive(item.path) ? "scale-110" : ""
            }`} />
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};