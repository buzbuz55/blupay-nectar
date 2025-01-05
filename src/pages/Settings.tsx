import { ArrowLeft, Building2, Plus, Landmark, CalendarClock, MapPin, Fingerprint, Lock, Bell, Users2, SmilePlus, HelpCircle, FileText, Wallet, BriefcaseBusiness, Send, Gift, FileKey, Smartphone, ShieldCheck, FileQuestion, Star, LogOut, Moon, Sun, Globe } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { NotificationSettings } from "@/components/notifications/NotificationSettings";
import { useSettings } from "@/contexts/SettingsContext";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { settings, updateSetting } = useSettings();
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
    localStorage.clear();
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
        <div className="p-4 space-y-6">
          {/* Theme Settings */}
          <div className="bg-white rounded-lg p-4 space-y-4">
            <h2 className="font-semibold">Display & Accessibility</h2>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Theme</label>
                <p className="text-xs text-gray-500">Choose your preferred theme</p>
              </div>
              <Select
                value={settings.theme}
                onValueChange={(value: "light" | "dark" | "system") => updateSetting("theme", value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4" />
                      Light
                    </div>
                  </SelectItem>
                  <SelectItem value="dark">
                    <div className="flex items-center gap-2">
                      <Moon className="w-4 h-4" />
                      Dark
                    </div>
                  </SelectItem>
                  <SelectItem value="system">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      System
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Sound Effects</label>
                <p className="text-xs text-gray-500">Enable sound effects for actions</p>
              </div>
              <Switch
                checked={settings.sound}
                onCheckedChange={(checked) => updateSetting("sound", checked)}
              />
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-lg p-4 space-y-4">
            <h2 className="font-semibold">Security</h2>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Two-Factor Authentication</label>
                <p className="text-xs text-gray-500">Add an extra layer of security</p>
              </div>
              <Switch
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => updateSetting("twoFactorAuth", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Auto-Lock</label>
                <p className="text-xs text-gray-500">Lock app after {settings.autoLock} minutes</p>
              </div>
              <Select
                value={settings.autoLock.toString()}
                onValueChange={(value) => updateSetting("autoLock", parseInt(value))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 minute</SelectItem>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <NotificationSettings />

          {/* Settings Sections */}
          <div className="mb-6">
            <h2 className="px-4 py-2 text-sm font-semibold text-gray-500">PREFERENCES</h2>
            <div className="bg-white">
              {[
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
              ].map((item, index) => (
                <button
                  key={item.label}
                  onClick={() => handleSettingClick(item)}
                  className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 ${
                    index !== 9 ? 'border-b border-gray-100' : ''
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
        </div>
      </main>

      <Dialog open={!!selectedSetting} onOpenChange={() => setSelectedSetting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedSetting?.label}</DialogTitle>
            <DialogDescription>{selectedSetting?.content}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsPage;
