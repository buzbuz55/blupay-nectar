import { useState, useEffect } from 'react';
import SignupFlow from '@/components/signup/SignupFlow';
import { Header } from '@/components/bluai/Header';
import { FeatureList } from '@/components/bluai/FeatureList';

const BLUAi = () => {
  const [hasCompletedSignup, setHasCompletedSignup] = useState(() => {
    return localStorage.getItem('hasCompletedSignup') === 'true';
  });
  const [userName, setUserName] = useState('User');
  const [temperature, setTemperature] = useState('25°');
  const [weather, setWeather] = useState('Sunny');

  const handleSignupComplete = () => {
    localStorage.setItem('hasCompletedSignup', 'true');
    setHasCompletedSignup(true);
  };

  useEffect(() => {
    const savedName = localStorage.getItem('userName') || 'User';
    setUserName(savedName);
  }, []);

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
        
        <div className="flex-1">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-1">Features</h3>
            <p className="text-sm text-gray-600">Explore what you can do</p>
          </div>
          
          <FeatureList />
        </div>
      </div>
    </div>
  );
};

export default BLUAi;