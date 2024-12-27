import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { CurrencyConverter } from '@/components/currency/CurrencyConverter';

const BLUAi = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // Handle sending message
    setMessage('');
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {/* Chatbot Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="h-[300px] overflow-y-auto mb-4 space-y-4">
          <div className="bg-blue-50 rounded-2xl p-4 max-w-[80%]">
            <p className="text-gray-800">Hello! I'm BLU AI. How can I assist you with your financial needs today?</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Currency Converter */}
      <CurrencyConverter />
    </div>
  );
};

export default BLUAi;
