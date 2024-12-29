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
        src="/lovable-uploads/9d9eafcc-6614-4a41-80b4-c2e29ed0901b.png"
        alt="BluPay"
        className={`${sizeClasses[size]} w-auto`}
      />
    </Link>
  );
};