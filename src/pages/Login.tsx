import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/common/Logo";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  const creditCards = [
    {
      title: "Brighten your holidays with a new card",
      image: null,
      offer: null,
      color: "white",
    },
    {
      title: "$200 bonus offer",
      image: "/lovable-uploads/9ce88fcf-6663-4dfe-a1e4-3e05415953b7.png",
      offer: "$200",
      color: "red",
    },
    {
      title: "0% intro APR offer",
      image: "/lovable-uploads/9ce88fcf-6663-4dfe-a1e4-3e05415953b7.png",
      offer: "0%",
      color: "white",
    },
    {
      title: "25,000 points offer",
      image: "/lovable-uploads/9ce88fcf-6663-4dfe-a1e4-3e05415953b7.png",
      offer: "25,000",
      color: "blue",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-4 space-y-8">
      {/* Logo */}
      <div className="max-w-md mx-auto pt-8 flex justify-center">
        <Logo size="lg" />
      </div>

      {/* Login Form */}
      <Card className="max-w-md mx-auto p-6 shadow-lg rounded-xl space-y-6">
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="h-12 text-lg"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 text-lg"
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Checkbox id="saveUserId" />
              <label
                htmlFor="saveUserId"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-blue-600"
              >
                Save User ID
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="faceId" />
              <label
                htmlFor="faceId"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-blue-600"
              >
                Set up Face ID
              </label>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-full"
          >
            Log In
          </Button>

          <div className="text-center">
            <a href="#" className="text-blue-600 text-sm hover:underline">
              Forgot ID/Password?
            </a>
          </div>
        </form>
      </Card>

      {/* FDIC Information */}
      <div className="max-w-md mx-auto space-y-4">
        <p className="text-gray-600 italic">Bank of America deposit products:</p>
        <div className="flex items-center space-x-2">
          <img
            src="/lovable-uploads/9ce88fcf-6663-4dfe-a1e4-3e05415953b7.png"
            alt="FDIC"
            className="h-6"
          />
          <p className="text-sm text-gray-600">
            FDIC-Insured · Backed by the full faith and credit of the U.S.
            Government
          </p>
        </div>

        <div className="flex justify-center space-x-4 text-blue-600">
          <a href="#" className="hover:underline">
            My Balance®
          </a>
          <span>|</span>
          <a href="#" className="hover:underline">
            Enroll
          </a>
        </div>
      </div>

      {/* Footer Links */}
      <div className="max-w-md mx-auto flex justify-center space-x-4 text-blue-600">
        <a href="#" className="hover:underline">
          Locations
        </a>
        <span>|</span>
        <a href="#" className="hover:underline">
          Contact us
        </a>
      </div>

      <div className="max-w-md mx-auto text-center text-sm text-gray-600">
        <p>
          Learn more about Merrill's background on{" "}
          <a href="#" className="text-blue-600 hover:underline">
            FINRA's BrokerCheck
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
