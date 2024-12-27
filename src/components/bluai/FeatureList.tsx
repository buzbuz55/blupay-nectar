import { FeatureButton } from "./FeatureButton";
import { featureButtons } from "./featureData";

export const FeatureList = () => {
  return (
    <div className="space-y-3 overflow-y-auto max-h-[60vh] pr-2">
      {featureButtons.map((feature, index) => (
        <FeatureButton
          key={index}
          icon={feature.icon}
          label={feature.label}
          route={feature.route}
        />
      ))}
    </div>
  );
};