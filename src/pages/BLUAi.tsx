import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mic, Send, Sun, Camera } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const BLUAi = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [weather] = useState({ temp: "25°", condition: "Sunny" }); // Mock weather data

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Here we would normally make the API call to OpenAI
      // For now, we'll simulate a response
      setTimeout(() => {
        const assistantMessage: Message = {
          role: 'assistant',
          content: "I'm BLUAi, your financial assistant. I'm here to help you with investment advice, budgeting tips, and any other financial questions you might have.",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from BLUAi",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b">
        <div className="flex items-center space-x-2">
          <Sun className="w-5 h-5 text-yellow-500" />
          <span>{weather.temp} {weather.condition}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-200 rounded-full" />
          <div className="w-4 h-4 bg-gray-200 rounded-full" />
        </div>
      </div>

      {/* Welcome Message */}
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Hey there,</h1>
        <p className="text-gray-600">Welcome back!</p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.role === 'assistant' && (
              <Avatar className="w-8 h-8 mr-2">
                <AvatarImage src="/lovable-uploads/a85f85e1-c154-4843-955c-a34c98781613.png" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-2xl">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center space-x-2">
          <Camera className="w-6 h-6 text-gray-400" />
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message BLUAi..."
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          {input.trim() ? (
            <Button onClick={handleSend} size="icon" className="rounded-full">
              <Send className="w-4 h-4" />
            </Button>
          ) : (
            <Button size="icon" className="rounded-full">
              <Mic className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BLUAi;