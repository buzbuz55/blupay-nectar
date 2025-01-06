import { Route, Routes } from "react-router-dom";
import SettingsPage from "@/pages/Settings";

export const SettingsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SettingsPage />} />
      <Route path="/account" element={<div>Account Settings</div>} />
      <Route path="/business" element={<div>Business Profile</div>} />
      <Route path="/payment-methods" element={<div>Payment Methods</div>} />
      <Route path="/scheduled" element={<div>Scheduled Payments</div>} />
      <Route path="/shipping" element={<div>Shipping Addresses</div>} />
      <Route path="/security" element={<div>Security Settings</div>} />
      <Route path="/privacy" element={<div>Privacy Settings</div>} />
      <Route path="/notifications" element={<div>Notification Settings</div>} />
      <Route path="/social" element={<div>Social Settings</div>} />
      <Route path="/emoji" element={<div>Emoji Settings</div>} />
    </Routes>
  );
};