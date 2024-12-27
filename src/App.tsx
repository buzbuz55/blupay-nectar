import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
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
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <div className="pb-20">
                  <Index />
                  <BottomNav />
                </div>
              }
            />
            <Route
              path="/notifications"
              element={
                <div className="pb-20">
                  <NotificationsPage />
                  <BottomNav />
                </div>
              }
            />
            <Route
              path="/settings/*"
              element={
                <div className="pb-20">
                  <SettingsPage />
                  <BottomNav />
                </div>
              }
            />
            <Route
              path="/cards/*"
              element={
                <div className="pb-20">
                  <CardsPage />
                  <BottomNav />
                </div>
              }
            />
            <Route
              path="/pay/*"
              element={
                <div className="pb-20">
                  <PayPage />
                  <BottomNav />
                </div>
              }
            />
            <Route
              path="/crypto"
              element={
                <div className="pb-20">
                  <CryptoPage />
                  <BottomNav />
                </div>
              }
            />
            <Route
              path="/crypto/:id"
              element={
                <div className="pb-20">
                  <CryptoDetail />
                  <BottomNav />
                </div>
              }
            />
            <Route
              path="/bluai"
              element={
                <div className="pb-20">
                  <BLUAi />
                  <BottomNav />
                </div>
              }
            />
            <Route
              path="/bluai/chat"
              element={
                <div className="pb-20">
                  <BLUAiChat />
                  <BottomNav />
                </div>
              }
            />
            <Route
              path="/kyc"
              element={
                <div className="pb-20">
                  <KYCPage />
                  <BottomNav />
                </div>
              }
            />
            <Route
              path="/direct-deposits"
              element={
                <div className="pb-20">
                  <DirectDeposits />
                  <BottomNav />
                </div>
              }
            />
            <Route
              path="/payment-request"
              element={
                <div className="pb-20">
                  <PaymentRequestPage />
                  <BottomNav />
                </div>
              }
            />
            <Route
              path="/merchant"
              element={
                <div className="pb-20">
                  <MerchantPage />
                  <BottomNav />
                </div>
              }
            />
            <Route
              path="/support"
              element={
                <div className="pb-20">
                  <SupportPage />
                  <BottomNav />
                </div>
              }
            />
            <Route
              path="/profile"
              element={
                <div className="pb-20">
                  <ProfilePage />
                  <BottomNav />
                </div>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;