import { FeatureButton } from "./FeatureButton";
import { featureButtons } from "./featureData";
import { useRef } from "react";
import { usePullRefresh } from "@/hooks/use-pull-refresh";

interface FeatureListProps {
  onFeatureClick: (route: string) => void;
}

export const FeatureList = ({ onFeatureClick }: FeatureListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { pulling, refreshing } = usePullRefresh(scrollRef, {
    onRefresh: async () => {
      // Simulate refresh delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    },
    refreshMessage: "Features list has been refreshed",
  });

  return (
    <div 
      ref={scrollRef}
      className="space-y-3 overflow-y-auto max-h-[60vh] pr-2 scroll-smooth relative"
    >
      {(pulling || refreshing) && (
        <div className="absolute top-0 left-0 w-full text-center text-sm text-gray-500 py-2 bg-gray-50/80 backdrop-blur-sm">
          {refreshing ? "Refreshing..." : "Release to refresh..."}
        </div>
      )}
      
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