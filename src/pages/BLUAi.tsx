import { useState, useEffect, useRef } from 'react';
import SignupFlow from '@/components/signup/SignupFlow';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sun, Mic, Camera } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { CameraDialog } from '@/components/camera/CameraDialog';

const BLUAi = () => {
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

        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 max-w-[80%]">
            <p className="text-sm text-gray-800">How can I assist you today?</p>
          </div>
        </div>

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