import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Enroll = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>

        <h1 className="text-3xl font-bold mb-6">Enroll in BluPay Banking</h1>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Personal Banking</h2>
            <p className="text-gray-600 mb-4">
              Open a personal account and enjoy our comprehensive banking services.
            </p>
            <Button className="w-full">Start Personal Enrollment</Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Business Banking</h2>
            <p className="text-gray-600 mb-4">
              Get the tools and support your business needs to thrive.
            </p>
            <Button className="w-full">Start Business Enrollment</Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Investment Accounts</h2>
            <p className="text-gray-600 mb-4">
              Start your investment journey with our expert guidance.
            </p>
            <Button className="w-full">Open Investment Account</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Enroll;