import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ContactUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-semibold text-gray-800">Contact Us</h1>
      </div>

      <div className="space-y-4 max-w-2xl mx-auto">
        {/* BLUPAY Support Card */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <img
              src="/lovable-uploads/9ce88fcf-6663-4dfe-a1e4-3e05415953b7.png"
              alt="BLUPAY"
              className="h-8"
            />
            <span className="text-xl text-gray-700">BLUPAY</span>
          </div>
          
          <div className="space-y-2">
            <div className="text-gray-600">
              Mon - Fri, 8 a.m. - 11 p.m. ET
              <br />
              Sat - Sun, 8 a.m. - 8 p.m. ET
            </div>
            <a 
              href="tel:800-933-6262" 
              className="text-blue-600 text-lg font-semibold hover:underline"
            >
              800-933-6262
            </a>
          </div>

          <Button 
            className="w-full justify-center text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            variant="ghost"
            onClick={() => navigate("/login")}
          >
            LOG IN FOR MORE OPTIONS
          </Button>

          <p className="text-gray-600 text-sm">
            Logging in will allow us to route you to the specialist who is best suited to offer you support.
          </p>
        </Card>

        {/* BLUPAY Benefits Card */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="text-blue-600 font-bold text-xl">BENEFITS ONLINE</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">US, Puerto Rico, and Canada</span>
              <a 
                href="tel:866-820-1492" 
                className="text-blue-600 font-semibold hover:underline"
              >
                866-820-1492
              </a>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Outside the US, Puerto Rico, and Canada</span>
              <a 
                href="tel:609-818-8894" 
                className="text-blue-600 font-semibold hover:underline"
              >
                609-818-8894
              </a>
            </div>
          </div>
        </Card>

        {/* Investment Disclaimer */}
        <div className="p-4 space-y-4 text-gray-600 text-sm">
          <h3 className="font-semibold">Investment, insurance and annuity products:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Are Not FDIC Insured</li>
            <li>Are Not Bank Guaranteed</li>
            <li>May Lose Value</li>
            <li>Are Not Deposits</li>
            <li>Are Not Insured by Any Federal Government Agency</li>
            <li>Are Not a Condition to Any Banking Service or Activity</li>
          </ul>

          <p>
            Investing involves risk. There is always the potential of losing money when you invest in securities. Asset allocation, diversification, and rebalancing do not ensure a profit or protect against loss in declining markets.
          </p>

          <p>
            BLUPAY and its advisors do not provide legal, tax or accounting advice. Clients should consult their legal and/or tax advisors before making any financial decisions.
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-4 text-blue-600 text-sm py-6">
          <a href="#" className="hover:underline">Security</a>
          <span className="text-gray-300">|</span>
          <a href="#" className="hover:underline">Privacy</a>
          <span className="text-gray-300">|</span>
          <a href="#" className="hover:underline">Children's Privacy</a>
          <span className="text-gray-300">|</span>
          <a href="#" className="hover:underline">Your Privacy Choices</a>
          <span className="text-gray-300">|</span>
          <a href="#" className="hover:underline">Advertising Practices</a>
        </div>

        <div className="text-center text-gray-600 text-sm pb-6">
          BLUPAY, N.A. Member FDIC. © 2024 BLUPAY Corporation.
        </div>
      </div>
    </div>
  );
};

export default ContactUs;