import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const SettingsHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-10">
      <div className="flex items-center p-4">
        <Link to="/" className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-semibold">Settings</h1>
      </div>
    </header>
  );
};