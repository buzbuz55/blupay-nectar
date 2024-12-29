import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";

export const CryptoBalance = () => {
  const navigate = useNavigate();
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [startY, setStartY] = useState(0);
  const [pulling, setPulling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleTouchStart = (e: TouchEvent) => {
    const scrollTop = document.documentElement.scrollTop;
    if (scrollTop <= 0) {
      setStartY(e.touches[0].pageY);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (startY) {
      const currentY = e.touches[0].pageY;
      const diff = currentY - startY;
      if (diff > 50) {
        setPulling(true);
      }
    }
  };

  const handleTouchEnd = () => {
    if (pulling) {
      refresh();
    }
    setStartY(0);
    setPulling(false);
  };

  const refresh = () => {
    setLastUpdated(new Date());
    // Add any other refresh logic here
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart);
      container.addEventListener('touchmove', handleTouchMove);
      container.addEventListener('touchend', handleTouchEnd);

      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [startY, pulling]);
  
  return (
    <div 
      ref={containerRef}
      className="bg-white rounded-xl p-4 mb-4 relative"
    >
      <h3 className="text-lg font-medium mb-2">Crypto</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold">$</span>
        <span className="text-4xl font-bold">0</span>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Last update: {format(lastUpdated, 'hh:mm a')}
      </p>
      
      <Button 
        variant="outline" 
        className="w-full mt-4"
        onClick={() => navigate("/crypto")}
      >
        View
      </Button>

      {pulling && (
        <div className="absolute top-0 left-0 w-full text-center text-sm text-gray-500 py-2">
          Release to refresh...
        </div>
      )}
    </div>
  );
};