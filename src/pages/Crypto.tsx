import { useState } from "react";
import { QRScanner } from "@/components/qr/QRScanner";
import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";

const CryptoPage = () => {
  const [showScanner, setShowScanner] = useState(false);

  if (showScanner) {
    return <QRScanner />;
  }

  return (
    <div className="p-4">
      <Button 
        onClick={() => setShowScanner(true)}
        className="w-full flex items-center gap-2"
      >
        <QrCode className="w-5 h-5" />
        Scan QR Code
      </Button>
      
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Recent Transactions</h2>
        {/* Example transaction list */}
        <ul className="space-y-2">
          <li className="flex justify-between p-2 border-b">
            <span>Transaction 1</span>
            <span>$10.00</span>
          </li>
          <li className="flex justify-between p-2 border-b">
            <span>Transaction 2</span>
            <span>$20.00</span>
          </li>
          <li className="flex justify-between p-2 border-b">
            <span>Transaction 3</span>
            <span>$30.00</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CryptoPage;
