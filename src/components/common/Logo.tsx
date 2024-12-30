import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ className = "", size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-6",
    md: "h-10",
    lg: "h-14"
  };

  return (
    <Link to="/" className={`inline-block ${className}`}>
      <img
        src="/lovable-uploads/dd955ac8-90f6-4618-9d36-5e699da5e8ad.png"
        alt="BluPay"
        className={`${sizeClasses[size]} w-auto object-contain p-[2px]`}
      />
    </Link>
  );
};