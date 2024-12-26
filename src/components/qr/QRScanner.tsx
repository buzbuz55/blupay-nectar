import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useToast } from '@/components/ui/use-toast';
import { ChevronLeft, Image } from 'lucide-react';
import { Link } from 'react-router-dom';

export const QRScanner = () => {
  const [selected, setSelected] = useState('scan');
  const { toast } = useToast();

  const handleScan = (result: any) => {
    if (result) {
      toast({
        title: "QR Code Detected",
        description: "Processing payment details...",
      });
      // Here you would handle the scanned QR code data
      console.log(result);
    }
  };

  const handleError = (error: any) => {
    console.error(error);
    toast({
      variant: "destructive",
      title: "Camera Error",
      description: "Please make sure you've granted camera permissions.",
    });
  };

  return (
    <div className="fixed inset-0 bg-black">
      {/* Top Bar */}
      <div className="relative z-10">
        <div className="absolute top-4 left-4">
          <Link to="/crypto" className="text-white p-2 rounded-full bg-black/50">
            <ChevronLeft className="w-6 h-6" />
          </Link>
        </div>
        
        {/* Segmented Control */}
        <div className="flex justify-center pt-4 px-4">
          <div className="bg-black/50 rounded-full p-1 flex gap-1">
            {['Scan code', 'BluPay me', 'Show to pay'].map((option) => (
              <button
                key={option}
                className={`px-6 py-2 rounded-full text-sm transition-all ${
                  selected === option.toLowerCase()
                    ? 'bg-white text-black'
                    : 'text-white'
                }`}
                onClick={() => setSelected(option.toLowerCase())}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* QR Scanner */}
      <div className="h-full w-full">
        <QrReader
          constraints={{
            facingMode: 'environment'
          }}
          onResult={handleScan}
          containerStyle={{
            height: '100%',
            width: '100%',
          }}
          videoStyle={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      {/* Bottom Action */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <button 
          className="p-4 rounded-full bg-black/50 text-white"
          onClick={() => {
            // Handle photo library access
            toast({
              title: "Photo Library",
              description: "Opening photo library...",
            });
          }}
        >
          <Image className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};