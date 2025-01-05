import { Balance } from "@/components/home/Balance";
import { QuickActions } from "@/components/home/QuickActions";
import { useRef, useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullStartY, setPullStartY] = useState(0);
  const [pullMoveY, setPullMoveY] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const refreshIndicatorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Refreshed",
      description: "Content has been updated",
    });
    
    setIsRefreshing(false);
    setIsPulling(false);
    setPullMoveY(0);
  };

  const handleTouchStart = (e: TouchEvent) => {
    const scrollTop = document.documentElement.scrollTop;
    if (scrollTop <= 0) {
      setPullStartY(e.touches[0].clientY);
      setIsPulling(true);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isPulling && !isRefreshing) {
      const touchY = e.touches[0].clientY;
      const pullDistance = touchY - pullStartY;
      
      if (pullDistance > 0) {
        e.preventDefault();
        setPullMoveY(pullDistance);
        
        if (refreshIndicatorRef.current) {
          const maxPull = 150;
          const pullPercent = Math.min(pullDistance / maxPull, 1);
          refreshIndicatorRef.current.style.transform = `translateY(${pullDistance}px)`;
          refreshIndicatorRef.current.style.opacity = pullPercent.toString();
        }
      }
    }
  };

  const handleTouchEnd = () => {
    if (isPulling && pullMoveY > 70) {
      handleRefresh();
    }
    
    if (refreshIndicatorRef.current) {
      refreshIndicatorRef.current.style.transform = 'translateY(0)';
      refreshIndicatorRef.current.style.opacity = '0';
    }
    
    setIsPulling(false);
    setPullMoveY(0);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: false });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd);

      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isPulling, pullStartY, isRefreshing]);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gray-50 relative pb-16"
    >
      <div 
        ref={refreshIndicatorRef}
        className="absolute top-0 left-0 w-full flex items-center justify-center transition-transform duration-200 pointer-events-none"
        style={{ opacity: 0 }}
      >
        <div className="bg-white rounded-full p-2 shadow-lg">
          <RefreshCw 
            className={`w-6 h-6 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} 
          />
        </div>
      </div>

      <main className="container max-w-md mx-auto p-4">
        <QuickActions />
        <Balance />
      </main>
    </div>
  );
};

export default Index;