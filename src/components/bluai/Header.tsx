import { Sun } from "lucide-react";

interface HeaderProps {
  userName: string;
  temperature: string;
  weather: string;
}

export const Header = ({ userName, temperature, weather }: HeaderProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-2 text-gray-800">
          <Sun className="w-5 h-5" />
          <span>{temperature}</span>
          <span className="text-sm">{weather}</span>
        </div>
        <div className="text-sm text-gray-600">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-light text-gray-800">
          Good {getTimeOfDay()},
        </h1>
        <h2 className="text-3xl font-medium text-gray-900">
          {userName}!
        </h2>
        <p className="text-lg text-gray-600 mt-1">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'short' 
          })}
        </p>
      </div>
    </div>
  );
};

const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Morning";
  if (hour < 17) return "Afternoon";
  return "Evening";
};