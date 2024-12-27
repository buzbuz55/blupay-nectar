import { useState, useEffect } from 'react';
import SignupFlow from '@/components/signup/SignupFlow';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sun, Mic, Camera } from "lucide-react";

const BLUAi = () => {
  const [hasCompletedSignup, setHasCompletedSignup] = useState(() => {
    return localStorage.getItem('hasCompletedSignup') === 'true';
  });
  const [userName, setUserName] = useState('User');
  const [temperature, setTemperature] = useState('25°');
  const [weather, setWeather] = useState('Sunny');
  const [isHoldingMic, setIsHoldingMic] = useState(false);

  const handleSignupComplete = () => {
    localStorage.setItem('hasCompletedSignup', 'true');
    setHasCompletedSignup(true);
  };

  useEffect(() => {
    // Simulate getting user data
    const savedName = localStorage.getItem('userName') || 'User';
    setUserName(savedName);
  }, []);

  if (!hasCompletedSignup) {
    return <SignupFlow onComplete={handleSignupComplete} />;
  }

  return (
    <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-gradient-to-br from-white/40 to-white/10">
      {/* Frosted glass background effect */}
      <div className="absolute inset-0 backdrop-blur-xl bg-white/30" />

      {/* Main content */}
      <div className="relative z-10 h-full p-6 flex flex-col">
        {/* Top section with weather and time */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center space-x-2 text-gray-800">
            <Sun className="w-5 h-5" />
            <span>{temperature}</span>
            <span className="text-sm">{weather}</span>
          </div>
          <div className="text-sm text-gray-600">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        {/* Welcome message */}
        <div className="mb-8">
          <h1 className="text-2xl font-light text-gray-800">
            Hey {userName},
          </h1>
          <p className="text-lg text-gray-600">Welcome back!</p>
        </div>

        {/* Chat messages area */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 max-w-[80%]">
            <p className="text-sm text-gray-800">How can I assist you today?</p>
          </div>
        </div>

        {/* Bottom controls */}
        <div className="space-y-4">
          {/* Input area */}
          <div className="flex gap-2 items-center">
            <Input
              placeholder="Type your message..."
              className="flex-1 bg-white/50 backdrop-blur-sm border-0 focus-visible:ring-1 focus-visible:ring-gray-300 rounded-xl"
            />
            <Button 
              size="icon" 
              className="rounded-full bg-blupay-primary hover:bg-blupay-primary/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Bottom actions */}
          <div className="flex justify-between items-center px-4">
            <Camera className="w-6 h-6 text-gray-600" />
            <div 
              className={`flex items-center justify-center w-32 h-12 rounded-full transition-all ${
                isHoldingMic ? 'bg-blupay-primary text-white' : 'bg-white/50 text-gray-600'
              }`}
              onTouchStart={() => setIsHoldingMic(true)}
              onTouchEnd={() => setIsHoldingMic(false)}
              onMouseDown={() => setIsHoldingMic(true)}
              onMouseUp={() => setIsHoldingMic(false)}
              onMouseLeave={() => setIsHoldingMic(false)}
            >
              <Mic className="w-5 h-5 mr-2" />
              <span className="text-sm">Hold to speak</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BLUAi;