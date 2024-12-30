import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ className = "", size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-14"
  };

  return (
    <Link to="/" className={`inline-block ${className}`}>
      <img
        src="/lovable-uploads/b8851ca3-b012-485f-b1bd-4358e0103093.png"
        alt="BluPay"
        className={`${sizeClasses[size]} w-auto object-contain`}
      />
    </Link>
  );
};