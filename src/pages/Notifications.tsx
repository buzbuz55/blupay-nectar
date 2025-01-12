import { ArrowLeft, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { useState } from "react";

const initialNotifications = [
  {
    id: 1,
    title: "Check out the BLUPAY Teen Account",
    description: "Teach them financial independence, feel confident with parental controls.",
    action: "Let's do it",
    secondary: "Not now",
    route: "/cards"
  },
  {
    id: 2,
    title: "Check out BLUPAY for business, an easy way to shop, share & connect",
    description: "",
    action: "Learn more",
    secondary: "Not now",
    route: "/merchant"
  },
  {
    id: 3,
    title: "Set up Direct Deposit and get your paycheck up to 2 days* before payday!",
    description: "",
    action: "Learn more",
    secondary: "Not now",
    route: "/direct-deposits"
  },
  {
    id: 4,
    title: "Invite friends, earn $5",
    description: "Share your link or invite friends from your contacts. Everybody gets $5!",
    action: "Invite",
    secondary: "Not now",
    route: "/profile"
  }
];

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [animatingIds, setAnimatingIds] = useState<number[]>([]);

  const handleDismiss = (id: number) => {
    setAnimatingIds((prev) => [...prev, id]);
    
    // Remove notification after animation completes
    setTimeout(() => {
      setNotifications((prev) => prev.filter((notification) => notification.id !== id));
      setAnimatingIds((prev) => prev.filter((animId) => animId !== id));
    }, 300); // Match animation duration
  };

  const handleAction = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Link to="/">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-semibold">Notifications</h1>
          </div>
          <Settings className="w-6 h-6" />
        </div>
      </header>

      <main className="pt-16 p-4 space-y-4">
        {notifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`p-4 space-y-4 transition-all duration-300 ${
              animatingIds.includes(notification.id) 
                ? 'translate-x-full opacity-0' 
                : 'translate-x-0 opacity-100'
            }`}
          >
            <div className="flex gap-4">
              <Avatar className="bg-blupay-primary text-white">
                <span className="text-lg font-semibold">B</span>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{notification.title}</h3>
                {notification.description && (
                  <p className="text-gray-600 text-sm">{notification.description}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Button 
                className="w-full bg-blupay-primary hover:bg-blupay-primary/90"
                onClick={() => handleAction(notification.route)}
              >
                {notification.action}
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleDismiss(notification.id)}
              >
                {notification.secondary}
              </Button>
            </div>
          </Card>
        ))}
      </main>
    </div>
  );
};

export default NotificationsPage;