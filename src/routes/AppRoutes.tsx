import { Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { SettingsRoutes } from "./settings-routes";

// Lazy load all pages
const Login = lazy(() => import("@/pages/Login"));
const Index = lazy(() => import("@/pages/Index"));
const NotificationsPage = lazy(() => import("@/pages/Notifications"));
const CardsPage = lazy(() => import("@/pages/Cards"));
const PayPage = lazy(() => import("@/pages/Pay"));
const CryptoPage = lazy(() => import("@/pages/Crypto"));
const CryptoDetail = lazy(() => import("@/pages/CryptoDetail"));
const SupportPage = lazy(() => import("@/pages/Support"));
const BLUAi = lazy(() => import("@/pages/BLUAi"));
const BLUAiChat = lazy(() => import("@/pages/BLUAiChat"));
const KYCPage = lazy(() => import("@/pages/KYC"));
const DirectDeposits = lazy(() => import("@/pages/DirectDeposits"));
const PaymentRequestPage = lazy(() => import("@/pages/PaymentRequest"));
const MerchantPage = lazy(() => import("@/pages/Merchant"));
const ProfilePage = lazy(() => import("@/pages/Profile"));
const ContactUs = lazy(() => import("@/pages/ContactUs"));
const Locations = lazy(() => import("@/pages/Locations"));
const Enroll = lazy(() => import("@/pages/Enroll"));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/enroll" element={<Enroll />} />
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
            <SettingsRoutes />
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
  );
};
