import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface FeatureButtonProps {
  icon: LucideIcon;
  label: string;
  route: string;
}

export const FeatureButton = ({ icon: Icon, label, route }: FeatureButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outline"
      className="w-full justify-start gap-3 py-6 px-4 bg-white/50 hover:bg-white/60 transition-all duration-200"
      onClick={() => navigate(route)}
    >
      <Icon className="w-5 h-5 text-gray-600" />
      <span className="text-gray-700">{label}</span>
    </Button>
  );
};