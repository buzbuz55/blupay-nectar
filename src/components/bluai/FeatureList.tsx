import { FeatureButton } from "./FeatureButton";
import { featureButtons } from "./featureData";
import { useEffect, useRef } from "react";

interface FeatureListProps {
  onFeatureClick: (route: string) => void;
}

export const FeatureList = ({ onFeatureClick }: FeatureListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let scrollPos = 0;
    const scrollSpeed = 0.5; // Pixels per frame

    const animate = () => {
      if (!scrollContainer) return;
      
      scrollPos += scrollSpeed;
      
      // Reset scroll position when reaching the bottom
      if (scrollPos >= scrollContainer.scrollHeight - scrollContainer.clientHeight) {
        scrollPos = 0;
      }
      
      scrollContainer.scrollTop = scrollPos;
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameId = requestAnimationFrame(animate);

    // Pause animation on hover
    const handleMouseEnter = () => cancelAnimationFrame(animationFrameId);
    const handleMouseLeave = () => {
      scrollPos = scrollContainer.scrollTop;
      animationFrameId = requestAnimationFrame(animate);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div 
      ref={scrollRef}
      className="space-y-3 overflow-y-auto max-h-[60vh] pr-2 scroll-smooth"
    >
      {featureButtons.map((feature, index) => (
        <FeatureButton
          key={index}
          icon={feature.icon}
          label={feature.label}
          route={feature.route}
          description={feature.description}
          onClick={() => onFeatureClick(feature.route)}
        />
      ))}
    </div>
  );
};