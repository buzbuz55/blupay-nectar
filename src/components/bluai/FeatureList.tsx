import { FeatureButton } from "./FeatureButton";
import { featureButtons } from "./featureData";

interface FeatureListProps {
  onFeatureClick: (route: string) => void;
}

export const FeatureList = ({ onFeatureClick }: FeatureListProps) => {
  return (
    <div className="space-y-3 overflow-y-auto max-h-[60vh] pr-2">
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