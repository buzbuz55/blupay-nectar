import React from 'react';
import { Loader2 } from "lucide-react";

interface PaymentLoadingOverlayProps {
  isVisible: boolean;
  message: string;
}

export const PaymentLoadingOverlay = ({
  isVisible,
  message,
}: PaymentLoadingOverlayProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};