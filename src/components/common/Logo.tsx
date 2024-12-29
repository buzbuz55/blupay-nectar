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
        src="/lovable-uploads/ad1f85c8-ce79-4d90-a5c7-19a242c6c028.png"
        alt="BluPay"
        className={`${sizeClasses[size]} w-auto object-contain`}
      />
    </Link>
  );
};