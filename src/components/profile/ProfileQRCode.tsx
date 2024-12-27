import { QrCode } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileQRCodeProps {
  username: string;
  name: string;
  avatarUrl?: string;
}

export const ProfileQRCode = ({ username, name, avatarUrl }: ProfileQRCodeProps) => {
  const userQRValue = `blupay:${username}`;

  return (
    <div className="relative mt-8">
      <Dialog>
        <DialogTrigger asChild>
          <button className="absolute right-0 bottom-0 p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors">
            <QrCode className="w-5 h-5 text-gray-600" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center gap-4 p-6">
            <h2 className="text-xl font-semibold">Your BluPay QR Code</h2>
            <div className="bg-white p-4 rounded-xl">
              <QRCodeSVG value={userQRValue} size={200} />
            </div>
            <p className="text-sm text-gray-500">Scan to connect with {name}</p>
          </div>
        </DialogContent>
      </Dialog>
      <Avatar className="w-24 h-24 border-4 border-white">
        <AvatarImage src={avatarUrl} />
        <AvatarFallback className="text-2xl">{name.charAt(0)}</AvatarFallback>
      </Avatar>
    </div>
  );
};