import { Button } from "@/components/ui/button";
import { X, Delete } from "lucide-react";

interface NumberPadProps {
  onNumberClick: (num: string) => void;
  onDelete: () => void;
  onClear: () => void;
}

export const NumberPad = ({ onNumberClick, onDelete, onClear }: NumberPadProps) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <Button
          key={num}
          variant="outline"
          onClick={() => onNumberClick(num.toString())}
          className="h-14 text-xl font-medium hover:bg-gray-100"
        >
          {num}
        </Button>
      ))}
      <Button
        variant="outline"
        onClick={() => onNumberClick('.')}
        className="h-14 text-xl font-medium hover:bg-gray-100"
      >
        .
      </Button>
      <Button
        variant="outline"
        onClick={() => onNumberClick('0')}
        className="h-14 text-xl font-medium hover:bg-gray-100"
      >
        0
      </Button>
      <Button
        variant="outline"
        onClick={onDelete}
        className="h-14 text-xl font-medium hover:bg-gray-100"
      >
        <Delete className="h-6 w-6" />
      </Button>
    </div>
  );
};