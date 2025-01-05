import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface SettingsContextType {
  settings: {
    theme: "light" | "dark" | "system";
    language: string;
    notifications: boolean;
    sound: boolean;
    twoFactorAuth: boolean;
    autoLock: number; // in minutes
  };
  updateSetting: <K extends keyof SettingsContextType["settings"]>(
    key: K,
    value: SettingsContextType["settings"][K]
  ) => void;
}

const defaultSettings = {
  theme: "system" as const,
  language: "en",
  notifications: true,
  sound: true,
  twoFactorAuth: false,
  autoLock: 5,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState(defaultSettings);
  const { toast } = useToast();

  useEffect(() => {
    const savedSettings = localStorage.getItem("bluPaySettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const updateSetting = <K extends keyof typeof settings>(
    key: K,
    value: typeof settings[K]
  ) => {
    setSettings((prev) => {
      const newSettings = { ...prev, [key]: value };
      localStorage.setItem("bluPaySettings", JSON.stringify(newSettings));
      
      toast({
        title: "Settings updated",
        description: `${key.charAt(0).toUpperCase() + key.slice(1)} has been updated.`,
      });
      
      return newSettings;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};