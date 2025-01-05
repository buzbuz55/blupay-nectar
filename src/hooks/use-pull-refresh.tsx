import { useState, useEffect, useCallback, RefObject } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface PullRefreshOptions {
  onRefresh: () => Promise<void>;
  threshold?: number;
  refreshMessage?: string;
  disabled?: boolean;
}

export const usePullRefresh = (
  containerRef: RefObject<HTMLElement>,
  options: PullRefreshOptions
) => {
  const [startY, setStartY] = useState(0);
  const [pulling, setPulling] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();
  const threshold = options.threshold || 50;

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (options.disabled || document.documentElement.scrollTop > 0) return;
    setStartY(e.touches[0].pageY);
  }, [options.disabled]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!startY || options.disabled) return;
    
    const currentY = e.touches[0].pageY;
    const diff = currentY - startY;
    
    if (diff > threshold && !pulling) {
      setPulling(true);
      e.preventDefault();
    }
  }, [startY, pulling, threshold, options.disabled]);

  const handleTouchEnd = useCallback(async () => {
    if (pulling && !refreshing && !options.disabled) {
      setRefreshing(true);
      try {
        await options.onRefresh();
        toast({
          title: "Updated",
          description: options.refreshMessage || "Content has been refreshed",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to refresh. Please try again.",
          variant: "destructive",
        });
        console.error('Refresh error:', error);
      } finally {
        setRefreshing(false);
      }
    }
    setStartY(0);
    setPulling(false);
  }, [pulling, refreshing, options, toast]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [containerRef, handleTouchStart, handleTouchMove, handleTouchEnd]);

  return {
    pulling,
    refreshing,
  };
};