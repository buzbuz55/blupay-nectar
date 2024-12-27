import { useState, useEffect, useRef } from 'react';
import SignupFlow from '@/components/signup/SignupFlow';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Send, Sun, Mic, Camera, RefreshCw, CalendarClock, Gift, History,
  CreditCard, Globe, ShieldCheck, ArrowDown, Users, MessageSquare,
  ShoppingCart, ChartBar, Wallet, Headset, QrCode, Split, Mail,
  WalletCards, UserCog, Speaker, AlertOctagon, Heart, PiggyBank,
  Database, User, Settings, ChartLine, Percent, DollarSign
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { CameraDialog } from '@/components/camera/CameraDialog';
import { CurrencyConverter } from '@/components/currency/CurrencyConverter';
import { useNavigate } from 'react-router-dom';

const BLUAi = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hasCompletedSignup, setHasCompletedSignup] = useState(() => {
    return localStorage.getItem('hasCompletedSignup') === 'true';
  });
  const [userName, setUserName] = useState('User');
  const [temperature, setTemperature] = useState('25°');
  const [weather, setWeather] = useState('Sunny');
  const [isHoldingMic, setIsHoldingMic] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleSignupComplete = () => {
    localStorage.setItem('hasCompletedSignup', 'true');
    setHasCompletedSignup(true);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        audioChunksRef.current = [];
        
        // Here you would typically send the audioBlob to your server
        console.log('Audio recording completed', audioBlob);
        toast({
          title: "Voice recorded",
          description: "Processing your message...",
        });
      };

      mediaRecorderRef.current.start();
      setIsHoldingMic(true);
      toast({
        title: "Recording started",
        description: "Listening to your voice...",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Microphone Error",
        description: "Unable to access microphone. Please check permissions.",
      });
      setIsHoldingMic(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    setIsHoldingMic(false);
  };

  useEffect(() => {
    const savedName = localStorage.getItem('userName') || 'User';
    setUserName(savedName);
  }, []);

  if (!hasCompletedSignup) {
    return <SignupFlow onComplete={handleSignupComplete} />;
  }

  const featureButtons = [
    { icon: CalendarClock, label: "Recurring Payments", route: "/recurring-payments" },
    { icon: Gift, label: "Rewards & Cashback", route: "/rewards" },
    { icon: History, label: "Transaction History", route: "/history" },
    { icon: CreditCard, label: "Bill Pay Integration", route: "/bill-pay" },
    { icon: Globe, label: "Multi-Currency Support", route: "/multi-currency" },
    { icon: ShieldCheck, label: "Identity Verification", route: "/kyc" },
    { icon: ArrowDown, label: "Direct Deposits", route: "/direct-deposits" },
    { icon: Users, label: "Bill Splitting", route: "/bill-splitting" },
    { icon: MessageSquare, label: "Payment Requests", route: "/payment-requests" },
    { icon: ShoppingCart, label: "Merchant Payments", route: "/merchant" },
    { icon: ChartBar, label: "Expense Categorization", route: "/expenses" },
    { icon: Wallet, label: "Shared Wallets", route: "/shared-wallets" },
    { icon: Headset, label: "Customer Support", route: "/support" },
    { icon: QrCode, label: "QR Payments", route: "/qr-payments" },
    { icon: Split, label: "Split with Friends", route: "/split" },
    { icon: Gift, label: "Referral Program", route: "/referral" },
    { icon: Wallet, label: "App-Only Balance", route: "/balance" },
    { icon: Users, label: "Social Feed", route: "/social" },
    { icon: Mail, label: "Email Payments", route: "/email-pay" },
    { icon: WalletCards, label: "Digital Cards", route: "/cards" },
    { icon: Globe, label: "Currency Exchange", route: "/exchange" },
    { icon: UserCog, label: "AI Assistant", route: "/ai-assistant" },
    { icon: Speaker, label: "Voice Payments", route: "/voice" },
    { icon: AlertOctagon, label: "Fraud Detection", route: "/security" },
    { icon: Heart, label: "Spend-For-A-Cause", route: "/donate" },
    { icon: PiggyBank, label: "Automated Savings", route: "/savings" },
    { icon: UserCog, label: "Spend Smart", route: "/smart-spend" },
    { icon: Database, label: "Blockchain History", route: "/blockchain" },
    { icon: User, label: "Spending Profiles", route: "/profiles" },
    { icon: ChartLine, label: "Investment Tips", route: "/investments" },
    { icon: ChartLine, label: "Credit Score", route: "/credit" },
    { icon: Users, label: "Shared Goals", route: "/goals" },
    { icon: Percent, label: "Personal Offers", route: "/offers" }
  ];

  return (
    <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-gradient-to-br from-white/40 to-white/10">
      <div className="absolute inset-0 backdrop-blur-xl bg-white/30" />

      <div className="relative z-10 h-full p-6 flex flex-col">
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

        <div className="mb-8">
          <h1 className="text-2xl font-light text-gray-800">
            Hey {userName},
          </h1>
          <p className="text-lg text-gray-600">Welcome back!</p>
        </div>

        <CurrencyConverter className="mb-6" />

        {/* Feature Buttons Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6 overflow-y-auto max-h-[50vh] pr-2 scrollbar-thin">
          {featureButtons.map((feature, index) => (
            <Button
              key={index}
              variant="outline"
              className="flex flex-col items-center justify-center gap-2 p-4 h-auto aspect-square bg-white/50 backdrop-blur-sm hover:bg-white/60 transition-all duration-200"
              onClick={() => navigate(feature.route)}
            >
              <feature.icon className="w-8 h-8 text-blupay-primary" />
              <span className="text-sm text-center font-medium">{feature.label}</span>
            </Button>
          ))}
        </div>

        {/* Chat Interface */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 max-w-[80%]">
            <p className="text-sm text-gray-800">How can I assist you today?</p>
          </div>
        </div>

        {/* Input Section */}
        <div className="space-y-4">
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

          <div className="flex justify-between items-center px-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCameraOpen(true)}
              className="rounded-full"
            >
              <Camera className="w-6 h-6 text-gray-600" />
            </Button>
            
            <div 
              className={`flex items-center justify-center w-32 h-12 rounded-full transition-all ${
                isHoldingMic ? 'bg-blupay-primary text-white' : 'bg-white/50 text-gray-600'
              }`}
              onTouchStart={startRecording}
              onTouchEnd={stopRecording}
              onMouseDown={startRecording}
              onMouseUp={stopRecording}
              onMouseLeave={stopRecording}
            >
              <Mic className="w-5 h-5 mr-2" />
              <span className="text-sm">Hold to speak</span>
            </div>
          </div>
        </div>
      </div>

      <CameraDialog 
        open={isCameraOpen}
        onOpenChange={setIsCameraOpen}
      />
    </div>
  );
};

export default BLUAi;