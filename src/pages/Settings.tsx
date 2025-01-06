import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { SettingsMenu } from "@/components/settings/SettingsMenu";
import { SettingsFooter } from "@/components/settings/SettingsFooter";
import { NotificationSettings } from "@/components/notifications/NotificationSettings";
import { useSettings } from "@/contexts/SettingsContext";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sun, Moon, Globe } from "lucide-react";

const SettingsPage = () => {
  const { settings, updateSetting } = useSettings();

  return (
    <div className="min-h-screen bg-gray-50">
      <SettingsHeader />
      
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
          
          <SettingsMenu />
          
          <SettingsFooter />
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
