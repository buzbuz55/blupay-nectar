import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CameraDialog } from "@/components/camera/CameraDialog";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Upload, FileCheck, ShieldCheck } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const KYCPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [openCamera, setOpenCamera] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "pending" | "submitted" | "verified"
  >("pending");

  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Here you would typically upload the file to your verification service
        toast({
          title: "Document uploaded",
          description: "Your document has been submitted for verification.",
        });
        setVerificationStatus("submitted");
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-6 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/bluai")}
          className="mr-2"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold">Identity Verification</h1>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Verify Your Identity</CardTitle>
          <CardDescription>
            We need to verify your identity before you can send or receive large
            sums of money.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-5 w-5 text-green-500" />
              <span>Your data is encrypted and secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileCheck className="h-5 w-5 text-blue-500" />
              <span>Quick verification process</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Button
          onClick={() => setOpenCamera(true)}
          className="w-full flex items-center justify-center gap-2"
          variant="outline"
        >
          Take Photo of ID
        </Button>
        <Button
          onClick={handleFileUpload}
          className="w-full flex items-center justify-center gap-2"
          variant="outline"
        >
          <Upload className="h-5 w-5" />
          Upload Document
        </Button>
      </div>

      {verificationStatus === "submitted" && (
        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="text-center">
              <ShieldCheck className="h-12 w-12 text-green-500 mx-auto mb-2" />
              <h3 className="text-lg font-semibold">Verification In Progress</h3>
              <p className="text-gray-500">
                We're reviewing your documents. This usually takes 1-2 business
                days.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <CameraDialog open={openCamera} onOpenChange={setOpenCamera} />
    </div>
  );
};

export default KYCPage;