import { useState, useEffect } from 'react';
import { Bell, BellOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

export const NotificationSettings = () => {
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [settings, setSettings] = useState({
    paymentReceived: true,
    paymentSent: true,
    lowBalance: true,
    securityAlerts: true
  });
  const { toast } = useToast();

  useEffect(() => {
    setPermission(Notification.permission);
  }, []);

  const requestPermission = async () => {
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      if (result === "granted") {
        toast({
          title: "Notifications enabled",
          description: "You will now receive notifications for important events."
        });
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      toast({
        title: "Error",
        description: "Could not enable notifications. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));

    // Save settings to localStorage
    localStorage.setItem('notificationSettings', JSON.stringify({
      ...settings,
      [setting]: !settings[setting]
    }));

    // Show demo notification
    if (permission === "granted" && !settings[setting]) {
      new Notification("Notification Setting Updated", {
        body: `You will now receive notifications for ${setting.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
        icon: "/favicon.ico"
      });
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Notification Settings</h2>
          <p className="text-sm text-gray-500">Customize your notification preferences</p>
        </div>
        {permission !== "granted" && (
          <Button onClick={requestPermission} className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Enable Notifications
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">Payment Received</label>
            <p className="text-xs text-gray-500">Get notified when you receive money</p>
          </div>
          <Switch
            checked={settings.paymentReceived}
            onCheckedChange={() => handleSettingChange('paymentReceived')}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">Payment Sent</label>
            <p className="text-xs text-gray-500">Get notified when your payments are completed</p>
          </div>
          <Switch
            checked={settings.paymentSent}
            onCheckedChange={() => handleSettingChange('paymentSent')}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">Low Balance</label>
            <p className="text-xs text-gray-500">Get notified when your balance is below $100</p>
          </div>
          <Switch
            checked={settings.lowBalance}
            onCheckedChange={() => handleSettingChange('lowBalance')}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">Security Alerts</label>
            <p className="text-xs text-gray-500">Get notified about important security events</p>
          </div>
          <Switch
            checked={settings.securityAlerts}
            onCheckedChange={() => handleSettingChange('securityAlerts')}
          />
        </div>
      </div>
    </Card>
  );
};