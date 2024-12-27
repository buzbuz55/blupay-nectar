import { useState, useEffect } from 'react';
import SignupFlow from '@/components/signup/SignupFlow';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

const BLUAi = () => {
  const [hasCompletedSignup, setHasCompletedSignup] = useState(() => {
    return localStorage.getItem('hasCompletedSignup') === 'true';
  });

  const handleSignupComplete = () => {
    localStorage.setItem('hasCompletedSignup', 'true');
    setHasCompletedSignup(true);
  };

  if (!hasCompletedSignup) {
    return <SignupFlow onComplete={handleSignupComplete} />;
  }

  return (
    <div className="container max-w-4xl mx-auto p-4">
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          <div className="bg-secondary rounded-lg p-4">
            <p className="text-sm">Hi! I'm BLU, your AI assistant. How can I help you today?</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BLUAi;