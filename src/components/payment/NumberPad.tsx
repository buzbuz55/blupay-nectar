import { Delete } from "lucide-react";

interface NumberPadProps {
  onNumberClick: (num: string) => void;
  onDelete: () => void;
  onClear: () => void;
}

export const NumberPad = ({ onNumberClick, onDelete, onClear }: NumberPadProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <button
          key={num}
          onClick={() => onNumberClick(num.toString())}
          className="h-14 text-white text-2xl font-light hover:bg-white/10 rounded-xl transition-colors"
        >
          {num}
        </button>
      ))}
      <button
        onClick={() => onNumberClick('.')}
        className="h-14 text-white text-2xl font-light hover:bg-white/10 rounded-xl transition-colors"
      >
        .
      </button>
      <button
        onClick={() => onNumberClick('0')}
        className="h-14 text-white text-2xl font-light hover:bg-white/10 rounded-xl transition-colors"
      >
        0
      </button>
      <button
        onClick={onDelete}
        className="h-14 text-white text-2xl font-light hover:bg-white/10 rounded-xl transition-colors"
      >
        <Delete className="h-6 w-6 mx-auto" />
      </button>
    </div>
  );
};