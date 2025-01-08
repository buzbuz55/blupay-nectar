import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface PaymentConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount: string;
  recipient: string;
  transferMethod: 'standard' | 'zelle';
  bankName?: string;
}

export const PaymentConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  amount,
  recipient,
  transferMethod,
  bankName,
}: PaymentConfirmationDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Payment</DialogTitle>
          <DialogDescription>
            Please review the payment details below
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-center py-4">
            <div className="text-4xl font-bold text-gray-900">${amount}</div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">To:</span>
              <span className="font-medium">{recipient}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Method:</span>
              <span className="font-medium capitalize">{transferMethod}</span>
            </div>
            {transferMethod === 'zelle' && bankName && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Bank:</span>
                <span className="font-medium">{bankName}</span>
              </div>
            )}
          </div>
        </div>
        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Confirm Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};