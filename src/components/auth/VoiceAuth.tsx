import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Lock, Unlock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const VoiceAuth = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      
      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = async () => {
        setIsProcessing(true);
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        await processVoiceAuthentication(audioBlob);
        audioChunks.current = [];
        setIsProcessing(false);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      
      toast({
        title: "Recording started",
        description: "Please speak your passphrase",
      });
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const processVoiceAuthentication = async (audioBlob: Blob) => {
    // In a real application, you would:
    // 1. Convert the audio to a format suitable for voice recognition
    // 2. Extract voice features
    // 3. Compare with stored voice pattern
    // 4. Make authentication decision
    
    // For demo purposes, we'll simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate successful authentication
    setIsAuthenticated(true);
    toast({
      title: "Authentication successful",
      description: "Voice pattern matched",
    });
  };

  useEffect(() => {
    return () => {
      if (mediaRecorder.current && isRecording) {
        mediaRecorder.current.stop();
        mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isRecording]);

  return (
    <div className="flex flex-col items-center space-y-6 p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Voice Authentication</h2>
        <p className="text-gray-500">Speak your passphrase to authenticate</p>
      </div>

      <div className="relative w-32 h-32 flex items-center justify-center">
        <div className={`absolute inset-0 rounded-full ${
          isAuthenticated ? 'bg-green-100' : 'bg-blue-100'
        } ${isRecording ? 'animate-pulse' : ''}`}>
        </div>
        {isAuthenticated ? (
          <Unlock className="w-12 h-12 text-green-600" />
        ) : (
          <Lock className="w-12 h-12 text-blue-600" />
        )}
      </div>

      <Button
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isProcessing}
        className={`w-full h-12 ${
          isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isRecording ? (
          <MicOff className="w-6 h-6 mr-2" />
        ) : (
          <Mic className="w-6 h-6 mr-2" />
        )}
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </Button>

      {isProcessing && (
        <div className="text-sm text-gray-500">Processing voice pattern...</div>
      )}
    </div>
  );
};