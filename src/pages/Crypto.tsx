import { useState } from "react";
import { QRScanner } from "@/components/qr/QRScanner";
import { Button } from "@/components/ui/button";
import { QrCode, PlayCircle } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface TutorialVideo {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
}

const tutorialVideos: TutorialVideo[] = [
  {
    id: 1,
    title: "Transfer Crypto on Venmo",
    thumbnail: "/lovable-uploads/0ca0d8a0-c05d-4468-b783-10b45ffd0505.png",
    duration: "2:30",
  },
  {
    id: 2,
    title: "Crypto vs Stocks",
    thumbnail: "/lovable-uploads/0ca0d8a0-c05d-4468-b783-10b45ffd0505.png",
    duration: "3:15",
  },
  {
    id: 3,
    title: "How Crypto is Created",
    thumbnail: "/lovable-uploads/0ca0d8a0-c05d-4468-b783-10b45ffd0505.png",
    duration: "4:00",
  },
];

const CryptoPage = () => {
  const [showScanner, setShowScanner] = useState(false);

  if (showScanner) {
    return <QRScanner />;
  }

  return (
    <div className="p-4 space-y-6">
      <Button 
        onClick={() => setShowScanner(true)}
        className="w-full flex items-center gap-2"
      >
        <QrCode className="w-5 h-5" />
        Scan QR Code
      </Button>
      
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Recent Transactions</h2>
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

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Learn as you go</h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {tutorialVideos.map((video) => (
              <CarouselItem key={video.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="relative aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle className="w-12 h-12 text-white opacity-80" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <h3 className="text-white font-medium">{video.title}</h3>
                    <span className="text-white/80 text-sm">{video.duration}</span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default CryptoPage;