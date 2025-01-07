import { useState, useEffect } from 'react';
import SignupFlow from '@/components/signup/SignupFlow';
import { Header } from '@/components/bluai/Header';
import { FeatureList } from '@/components/bluai/FeatureList';
import { CurrencyConverter } from '@/components/currency/CurrencyConverter';
import { VoiceAuth } from '@/components/auth/VoiceAuth';
import { VoicePayment } from '@/components/bluai/VoicePayment';
import { AiRecommendations } from '@/components/bluai/AiRecommendations';
import { InvestmentTips } from '@/components/bluai/InvestmentTips';
import { ChatInterface } from '@/components/bluai/ChatInterface';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useNavigate, useLocation } from 'react-router-dom';
import { LoyaltyPrograms } from '@/components/loyalty/LoyaltyPrograms';

const BLUAi = () => {
  const [hasCompletedSignup, setHasCompletedSignup] = useState(() => {
    return localStorage.getItem('hasCompletedSignup') === 'true';
  });
  const [userName, setUserName] = useState('User');
  const [temperature, setTemperature] = useState('25°');
  const [weather, setWeather] = useState('Sunny');
  const [showCurrencyConverter, setShowCurrencyConverter] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignupComplete = () => {
    localStorage.setItem('hasCompletedSignup', 'true');
    setHasCompletedSignup(true);
  };

  useEffect(() => {
    const savedName = localStorage.getItem('userName') || 'User';
    setUserName(savedName);

    if (location.state?.fromCurrency) {
      setShowCurrencyConverter(true);
    }
  }, [location]);

  const handleFeatureClick = (route: string) => {
    if (route === 'currency-converter') {
      setShowCurrencyConverter(true);
    } else {
      navigate(route);
    }
  };

  if (!hasCompletedSignup) {
    return <SignupFlow onComplete={handleSignupComplete} />;
  }

  return (
    <div className="relative min-h-[calc(100vh-5rem)] bg-gradient-to-br from-gray-50 to-white/80">
      <div className="relative z-10 h-full p-6 flex flex-col space-y-8">
        <Header 
          userName={userName}
          temperature={temperature}
          weather={weather}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <AiRecommendations />
            <InvestmentTips />
            <VoiceAuth />
            <VoicePayment />
            <LoyaltyPrograms />
            
            <div className="flex-1">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-1">Features</h3>
                <p className="text-sm text-gray-600">Explore what you can do</p>
              </div>
              
              <FeatureList onFeatureClick={handleFeatureClick} />
            </div>
          </div>

          <div className="lg:sticky lg:top-6">
            <ChatInterface />
          </div>
        </div>
      </div>

      <Dialog open={showCurrencyConverter} onOpenChange={setShowCurrencyConverter}>
        <DialogContent className="sm:max-w-[425px]">
          <CurrencyConverter className="w-full" />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BLUAi;