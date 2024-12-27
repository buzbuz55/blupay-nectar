import { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const CameraDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const { toast } = useToast();
  const [imageSource, setImageSource] = useState<string | null>(null);

  const handleCameraClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Here you would typically set up a video stream and capture
      stream.getTracks().forEach(track => track.stop());
      toast({
        title: "Camera accessed",
        description: "Ready to take a photo",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
      });
    }
  };

  const handleGalleryClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImageSource(e.target?.result as string);
          toast({
            title: "Image selected",
            description: "Image ready for processing",
          });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4 items-center">
            <Button
              onClick={handleCameraClick}
              className="w-full flex items-center gap-2"
              variant="outline"
            >
              <Camera className="h-5 w-5" />
              Take Photo
            </Button>
            <Button
              onClick={handleGalleryClick}
              className="w-full flex items-center gap-2"
              variant="outline"
            >
              <ImageIcon className="h-5 w-5" />
              Choose from Gallery
            </Button>
          </div>
          {imageSource && (
            <div className="mt-4">
              <img src={imageSource} alt="Selected" className="w-full rounded-lg" />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};