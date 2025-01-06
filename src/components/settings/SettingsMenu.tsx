import { Building2, Plus, Landmark, CalendarClock, MapPin, Fingerprint, Lock, Bell, Users2, SmilePlus } from "lucide-react";
import { SettingsMenuItem } from "./SettingsMenuItem";

export const SettingsMenu = () => {
  const menuItems = [
    { icon: Building2, label: "Account", to: "/settings/account" },
    { icon: Plus, label: "Create Business Profile", to: "/settings/business", badge: "New" },
    { icon: Landmark, label: "Payment Methods", to: "/settings/payment-methods" },
    { icon: CalendarClock, label: "Scheduled Payments & Requests", to: "/settings/scheduled" },
    { icon: MapPin, label: "Shipping Addresses", to: "/settings/shipping" },
    { icon: Fingerprint, label: "Face ID & Passcode", to: "/settings/security" },
    { icon: Lock, label: "Privacy", to: "/settings/privacy" },
    { icon: Bell, label: "Notifications", to: "/settings/notifications" },
    { icon: Users2, label: "Friends & Social", to: "/settings/social" },
    { icon: SmilePlus, label: "Emoji", to: "/settings/emoji" },
  ];

  return (
    <div className="mb-6">
      <h2 className="px-4 py-2 text-sm font-semibold text-gray-500">PREFERENCES</h2>
      <div className="bg-white">
        {menuItems.map((item) => (
          <SettingsMenuItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            badge={item.badge}
            to={item.to}
          />
        ))}
      </div>
    </div>
  );
};