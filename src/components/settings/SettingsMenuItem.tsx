import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface SettingsMenuItemProps {
  icon: LucideIcon;
  label: string;
  badge?: string;
  to: string;
}

export const SettingsMenuItem = ({ icon: Icon, label, badge, to }: SettingsMenuItemProps) => {
  return (
    <Link
      to={to}
      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-b border-gray-100"
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-gray-600" />
        <span className="font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge && (
          <span className="px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">
            {badge}
          </span>
        )}
        <span className="text-gray-400">›</span>
      </div>
    </Link>
  );
};