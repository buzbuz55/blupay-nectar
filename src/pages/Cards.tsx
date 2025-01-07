import { Routes, Route } from "react-router-dom";
import { CardSignupIntro } from "@/components/cards/CardSignupIntro";
import { Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { RedPacket } from "@/components/redpacket/RedPacket";
import { FeaturedCards } from "@/components/cards/FeaturedCards";
import { ConnectMethods } from "@/components/cards/ConnectMethods";
import { PointsSystem } from "@/components/cards/PointsSystem";
import { BusinessFeatures } from "@/components/cards/BusinessFeatures";
import { BusinessAnalytics } from "@/components/cards/BusinessAnalytics";

const CardsOverview = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white p-4 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">Payment Methods</h1>
          <Link to="/settings" className="text-gray-600">
            <Settings className="w-6 h-6" />
          </Link>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Featured Cards Section */}
        <FeaturedCards />

        {/* Business Analytics */}
        <BusinessAnalytics />

        {/* Business Features */}
        <BusinessFeatures />

        {/* Points System */}
        <PointsSystem />

        {/* Red Packet Feature */}
        <RedPacket />

        {/* Connect Methods */}
        <ConnectMethods />

        {/* Developer Note */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <h2 className="font-semibold text-blue-800 mb-2">Developer Note</h2>
          <p className="text-sm text-blue-700 mb-4">
            This page requires Plaid API integration for secure bank connections. 
          </p>
          <ol className="list-decimal list-inside text-sm text-blue-700 space-y-2">
            <li>Set up a Plaid account and obtain API keys</li>
            <li>Implement Plaid Link token creation on the backend</li>
            <li>Integrate Plaid Link SDK for secure authentication</li>
            <li>Handle token exchange and account verification</li>
          </ol>
        </Card>
      </main>
    </div>
  );
};

const Cards = () => {
  return (
    <Routes>
      <Route index element={<CardSignupIntro />} />
      <Route path="overview" element={<CardsOverview />} />
      <Route path="credit" element={<div className="p-4">Credit Card Application Form (Coming Soon)</div>} />
      <Route path="debit" element={<div className="p-4">Debit Card Application Form (Coming Soon)</div>} />
      <Route path="crypto" element={<div className="p-4">Crypto Card Application Form (Coming Soon)</div>} />
    </Routes>
  );
};

export default Cards;