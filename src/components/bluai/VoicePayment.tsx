import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

// Define the types for the Web Speech API
interface IWindow extends Window {
  SpeechRecognition?: typeof SpeechRecognition;
  webkitSpeechRecognition?: typeof SpeechRecognition;
}

export const VoicePayment = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const windowWithSpeech = window as IWindow;
    const SpeechRecognition = windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        toast({
          title: "Listening...",
          description: "Try saying: 'Send 50 dollars to John'",
        });
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        toast({
          title: "Error",
          description: "Could not recognize speech. Please try again.",
          variant: "destructive",
        });
        setIsListening(false);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const current = event.resultIndex;
        const currentTranscript = event.results[current][0].transcript.toLowerCase();
        setTranscript(currentTranscript);

        // Process payment commands
        if (currentTranscript.includes('send') && currentTranscript.includes('dollar')) {
          const amount = currentTranscript.match(/\d+/g)?.[0];
          const recipient = currentTranscript.match(/to\s+(\w+)/i)?.[1];

          if (amount && recipient) {
            recognition.stop();
            handlePaymentCommand(amount, recipient);
          }
        }
      };

      setRecognition(recognition);
    } else {
      toast({
        title: "Not supported",
        description: "Voice recognition is not supported in your browser.",
        variant: "destructive",
      });
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [toast]);

  const handlePaymentCommand = (amount: string, recipient: string) => {
    toast({
      title: "Payment command recognized",
      description: `Sending $${amount} to ${recipient}`,
    });
    
    // Navigate to payment screen with pre-filled data
    navigate(`/pay`, { 
      state: { 
        amount, 
        recipient,
        fromVoiceCommand: true 
      } 
    });
  };

  const toggleListening = useCallback(() => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
    } else {
      try {
        recognition.start();
      } catch (error) {
        console.error('Speech recognition error:', error);
      }
    }
  }, [recognition, isListening]);

  return (
    <div className="space-y-4 p-4 bg-white rounded-xl shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Voice Payment</h3>
        <Button
          variant={isListening ? "destructive" : "default"}
          size="icon"
          onClick={toggleListening}
        >
          {isListening ? (
            <MicOff className="h-5 w-5" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </Button>
      </div>

      {transcript && (
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Recognized speech:</p>
          <div className="p-3 bg-gray-50 rounded-lg text-sm">
            {transcript}
          </div>
        </div>
      )}

      <div className="text-xs text-gray-500">
        Try saying: "Send 50 dollars to John"
      </div>
    </div>
  );
};