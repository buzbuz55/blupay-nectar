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
import CryptoDetail from "./pages/CryptoDetail";
import SupportPage from "./pages/Support";
import BLUAi from "./pages/BLUAi";
import BLUAiChat from "./pages/BLUAiChat";
import KYCPage from "./pages/KYC";
import DirectDeposits from "./pages/DirectDeposits";
import PaymentRequestPage from "./pages/PaymentRequest";
import MerchantPage from "./pages/Merchant";
import ProfilePage from "./pages/Profile";
import { BottomNav } from "./components/layout/BottomNav";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <div className="pb-20">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/settings/*" element={<SettingsPage />} />
              <Route path="/cards/*" element={<CardsPage />} />
              <Route path="/pay/*" element={<PayPage />} />
              <Route path="/crypto" element={<CryptoPage />} />
              <Route path="/crypto/:id" element={<CryptoDetail />} />
              <Route path="/bluai" element={<BLUAi />} />
              <Route path="/bluai/chat" element={<BLUAiChat />} />
              <Route path="/kyc" element={<KYCPage />} />
              <Route path="/direct-deposits" element={<DirectDeposits />} />
              <Route path="/payment-request" element={<PaymentRequestPage />} />
              <Route path="/merchant" element={<MerchantPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </div>
          <BottomNav />
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;