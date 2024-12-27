import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Index from "./pages/Index";
import NotificationsPage from "./pages/Notifications";
import SettingsPage from "./pages/Settings";
import CardsPage from "./pages/Cards";
import PayPage from "./pages/Pay";
import CryptoPage from "./pages/Crypto";
import SupportPage from "./pages/Support";
import BLUAi from "./pages/BLUAi";
import BLUAiChat from "./pages/BLUAiChat";
import KYCPage from "./pages/KYC";
import DirectDeposits from "./pages/DirectDeposits";
import PaymentRequestPage from "./pages/PaymentRequest";
import MerchantPage from "./pages/Merchant";
import { BottomNav } from "./components/layout/BottomNav";

const queryClient = new QueryClient();

const SwipeDetector = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance required (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.touches[0].clientY);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.touches[0].clientY);
  };

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isSwipeDown = distance < -minSwipeDistance;
    
    if (isSwipeDown && location.pathname !== '/') {
      navigate('/');
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, navigate, location.pathname]);

  useEffect(() => {
    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);

    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [onTouchEnd]);

  return null;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SwipeDetector />
          <Toaster />
          <Sonner />
          <div className="pb-20">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/cards/*" element={<CardsPage />} />
              <Route path="/pay/*" element={<PayPage />} />
              <Route path="/crypto" element={<CryptoPage />} />
              <Route path="/bluai" element={<BLUAi />} />
              <Route path="/bluai/chat" element={<BLUAiChat />} />
              <Route path="/kyc" element={<KYCPage />} />
              <Route path="/direct-deposits" element={<DirectDeposits />} />
              <Route path="/payment-request" element={<PaymentRequestPage />} />
              <Route path="/merchant" element={<MerchantPage />} />
              <Route path="/support" element={<SupportPage />} />
            </Routes>
          </div>
          <BottomNav />
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;