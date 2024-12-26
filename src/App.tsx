import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotificationsPage from "./pages/Notifications";
import SettingsPage from "./pages/Settings";
import CardsPage from "./pages/Cards";
import PayPage from "./pages/Pay";
import CryptoPage from "./pages/Crypto";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/cards/*" element={<CardsPage />} />
            <Route path="/pay" element={<PayPage />} />
            <Route path="/crypto" element={<CryptoPage />} />
            <Route path="/profile" element={<div className="p-4">Profile Page</div>} />
          </Routes>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;