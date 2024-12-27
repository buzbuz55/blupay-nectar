import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const SignupFlow = ({ onComplete }: { onComplete: () => void }) => {
  const [currentScreen, setCurrentScreen] = useState(0);

  const screens = [
    {
      title: "Welcome to BLUPay",
      subtitle: "Spend, save and manage your money, all in one place.",
      image: "/lovable-uploads/ad1f85c8-ce79-4d90-a5c7-19a242c6c028.png",
    },
    {
      title: "Smart Financial Assistant",
      subtitle: "Get personalized advice and insights to help you make better financial decisions.",
      image: "/lovable-uploads/ad1f85c8-ce79-4d90-a5c7-19a242c6c028.png",
    },
    {
      title: "Ready to Start?",
      subtitle: "Join thousands of users who trust BLUPay with their finances.",
      image: "/lovable-uploads/ad1f85c8-ce79-4d90-a5c7-19a242c6c028.png",
    },
  ];

  const handleNext = () => {
    if (currentScreen === screens.length - 1) {
      onComplete();
    } else {
      setCurrentScreen((prev) => prev + 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blupay-secondary to-white">
      <div className="relative h-full flex flex-col items-center justify-between p-6 max-w-md mx-auto">
        {/* Progress indicators */}
        <div className="absolute top-8 left-0 right-0 flex justify-center gap-2">
          {screens.map((_, index) => (
            <div
              key={index}
              className={`h-1 w-12 rounded-full transition-colors ${
                index <= currentScreen ? 'bg-blupay-primary' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="mt-24 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            {screens[currentScreen].title}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {screens[currentScreen].subtitle}
          </p>
          <div className="relative w-full max-w-xs mx-auto h-64">
            <img
              src={screens[currentScreen].image}
              alt="Welcome illustration"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Button */}
        <div className="w-full max-w-xs mb-8">
          <Button
            onClick={handleNext}
            className="w-full bg-blupay-primary hover:bg-blupay-primary/90 text-white py-6 rounded-full text-lg font-semibold"
          >
            {currentScreen === screens.length - 1 ? (
              "Get Started"
            ) : (
              <>
                Next
                <ArrowRight className="ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignupFlow;