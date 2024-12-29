import React from 'react';

interface NumberPadProps {
  onNumberClick: (num: string) => void;
  onDelete: () => void;
}

export const NumberPad: React.FC<NumberPadProps> = ({ onNumberClick, onDelete }) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <button
          key={num}
          onClick={() => onNumberClick(num.toString())}
          className="h-14 text-xl font-medium rounded-xl bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          {num}
        </button>
      ))}
      <button
        onClick={() => onNumberClick('.')}
        className="h-14 text-xl font-medium rounded-xl bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors"
      >
        .
      </button>
      <button
        onClick={() => onNumberClick('0')}
        className="h-14 text-xl font-medium rounded-xl bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors"
      >
        0
      </button>
      <button
        onClick={onDelete}
        className="h-14 text-xl font-medium rounded-xl bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors"
      >
        ←
      </button>
      <button
        className="h-14 text-xl font-medium rounded-xl bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors"
      >
        +
      </button>
    </div>
  );
};