import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ className = "", size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-12"
  };

  return (
    <Link to="/" className={`inline-block ${className}`}>
      <img
        src="/lovable-uploads/b04a39c1-cecf-4629-9c21-e54be915568b.png"
        alt="BluPay"
        className={`${sizeClasses[size]} w-auto object-contain`}
      />
    </Link>
  );
};