import { ArrowLeft, Building2, Plus, Landmark, CalendarClock, MapPin, Fingerprint, Lock, Bell, Users2, SmilePlus, HelpCircle, FileText, Wallet, BriefcaseBusiness, Send, Gift, FileKey, Smartphone, ShieldCheck, FileQuestion, Star, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { NotificationSettings } from "@/components/notifications/NotificationSettings";

const settingSections = [
  {
    title: "PREFERENCES",
    items: [
      { id: "account", icon: Building2, label: "Account", badge: "", content: "Manage your account settings and preferences" },
      { id: "business", icon: Plus, label: "Create Business Profile", badge: "New", content: "Set up your business profile to accept payments" },
      { id: "payment", icon: Landmark, label: "Payment Methods", badge: "", content: "Add or remove payment methods" },
      { id: "scheduled", icon: CalendarClock, label: "Scheduled Payments & Requests", badge: "", content: "View and manage your scheduled transactions" },
      { id: "shipping", icon: MapPin, label: "Shipping Addresses", badge: "", content: "Manage your shipping addresses" },
      { id: "faceid", icon: Fingerprint, label: "Face ID & Passcode", badge: "", content: "Configure your security settings" },
      { id: "privacy", icon: Lock, label: "Privacy", badge: "", content: "Control your privacy settings" },
      { id: "notifications", icon: Bell, label: "Notifications", badge: "", content: "Customize your notification preferences" },
      { id: "friends", icon: Users2, label: "Friends & Social", badge: "", content: "Manage your social connections" },
      { id: "emoji", icon: SmilePlus, label: "Emoji", badge: "", content: "Customize your emoji reactions" },
      { id: "help", icon: HelpCircle, label: "Get help", badge: "", content: "Get support and answers to your questions" },
    ]
  },
  {
    title: "TAX",
    items: [
      { icon: FileText, label: "Tax Verification", badge: "" },
      { icon: FileText, label: "Tax Documents", badge: "" },
    ]
  },
  {
    title: "BUYING",
    items: [
      { icon: Wallet, label: "BLUPAY Debit Card", badge: "" },
      { icon: BriefcaseBusiness, label: "Direct Deposit", badge: "" },
      { icon: FileText, label: "Cash a Check", badge: "" },
      { icon: Wallet, label: "Backup Payment", badge: "" },
      { icon: BriefcaseBusiness, label: "Connected Businesses", badge: "" },
      { icon: Send, label: "Send & receive money with Visa+", badge: "" },
      { icon: Gift, label: "Offers", badge: "" },
      { icon: Gift, label: "Gift cards", badge: "" },
    ]
  },
  {
    title: "SECURITY",
    items: [
      { icon: FileKey, label: "Change Password", badge: "" },
      { icon: Smartphone, label: "Remembered Devices", badge: "" },
      { icon: ShieldCheck, label: "Identity Verification", badge: "" },
    ]
  },
  {
    title: "INFORMATION",
    items: [
      { icon: FileQuestion, label: "Legal", badge: "" },
      { icon: FileText, label: "Helpful Information", badge: "" },
      { icon: FileText, label: "Technical Info", badge: "" },
      { icon: Star, label: "Rate BLUPAY", badge: "" },
    ]
  }
];

const SettingsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedSetting, setSelectedSetting] = useState<{
    id: string;
    label: string;
    content: string;
  } | null>(null);

  const handleSettingClick = (item: { id: string; label: string; content: string }) => {
    setSelectedSetting(item);
  };

  const handleSignOut = () => {
    toast({
      title: "Signing out...",
      description: "You have been successfully signed out.",
    });
    // In a real app, you would handle the sign out logic here
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center p-4">
          <Link to="/" className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>
      </header>

      <main className="pt-16 pb-20">
        <div className="p-4">
          <NotificationSettings />
        </div>

        {settingSections.map((section) => (
          <div key={section.title} className="mb-6">
            <h2 className="px-4 py-2 text-sm font-semibold text-gray-500">{section.title}</h2>
            <div className="bg-white">
              {section.items.map((item, index) => (
                <button
                  key={item.label}
                  onClick={() => handleSettingClick(item)}
                  className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 ${
                    index !== section.items.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className="px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    <span className="text-gray-400">›</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="p-4">
          <Button 
            variant="destructive"
            className="w-full flex items-center justify-center gap-2 py-2"
            onClick={handleSignOut}
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out of BLUPAY</span>
          </Button>
          <p className="text-center text-gray-500 text-sm mt-4">Version 10.55.0 (4)</p>
        </div>
      </main>

      <Dialog open={!!selectedSetting} onOpenChange={() => setSelectedSetting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedSetting?.label}</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <p className="text-gray-600">{selectedSetting?.content}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsPage;
