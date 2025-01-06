import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const SettingsFooter = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

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
  );
};