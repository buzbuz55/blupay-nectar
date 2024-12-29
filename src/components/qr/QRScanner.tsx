import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useToast } from '@/components/ui/use-toast';
import { ChevronLeft, Image } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface QRData {
  recipient: string;
  amount?: string;
}

export const QRScanner = () => {
  const [selected, setSelected] = useState('scan');
  const [scanning, setScanning] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentData, setPaymentData] = useState<QRData | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleScan = (result: any) => {
    if (result) {
      setScanning(false);
      try {
        // Expecting QR data in format: {"recipient": "username", "amount": "100"}
        const data: QRData = JSON.parse(result?.text || '{}');
        
        if (!data.recipient) {
          throw new Error('Invalid QR code format');
        }

        setPaymentData(data);
        setShowPayment(true);
        
        toast({
          title: "QR Code Scanned Successfully",
          description: `Ready to send payment to ${data.recipient}`,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Invalid QR Code",
          description: "This QR code is not valid for payments.",
        });
        setScanning(true);
      }
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

  const handleClosePayment = () => {
    setShowPayment(false);
    setScanning(true);
    setPaymentData(null);
  };

  return (
    <div className="fixed inset-0 bg-black">
      {/* Top Bar */}
      <div className="relative z-10">
        <div className="absolute top-4 left-4">
          <Link to="/" className="text-white p-2 rounded-full bg-black/50">
            <ChevronLeft className="w-6 h-6" />
          </Link>
        </div>
        
        {/* Segmented Control */}
        <div className="flex justify-center pt-4 px-4">
          <div className="bg-black/50 rounded-full p-1 flex gap-1">
            {['Scan code', 'Show to pay'].map((option) => (
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
      {scanning && (
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
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-64 h-64 mx-auto mt-32 border-2 border-white rounded-lg" />
          </div>
        </div>
      )}

      {/* Payment Dialog */}
      <Dialog open={showPayment} onOpenChange={handleClosePayment}>
        <DialogContent className="sm:max-w-md">
          {paymentData && (
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4">Send Payment</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Recipient</label>
                  <p className="font-medium">{paymentData.recipient}</p>
                </div>
                {paymentData.amount && (
                  <div>
                    <label className="text-sm text-gray-500">Amount</label>
                    <p className="font-medium">${paymentData.amount}</p>
                  </div>
                )}
                <Button 
                  className="w-full"
                  onClick={() => {
                    toast({
                      title: "Payment Sent",
                      description: `Successfully sent payment to ${paymentData.recipient}`,
                    });
                    handleClosePayment();
                    navigate('/');
                  }}
                >
                  Confirm Payment
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Bottom Action */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <Button 
          variant="outline"
          className="bg-black/50 text-white border-white/20 hover:bg-black/70"
          onClick={() => {
            toast({
              title: "Photo Library",
              description: "Opening photo library...",
            });
          }}
        >
          <Image className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};