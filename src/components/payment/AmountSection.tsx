import React from 'react';

interface AmountSectionProps {
  amount: string;
  note: string;
  onNoteChange: (note: string) => void;
}

export const AmountSection = ({ amount, note, onNoteChange }: AmountSectionProps) => {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(parseFloat(amount) || 0);

  return (
    <div className="text-center space-y-4 flex-1 flex flex-col justify-center">
      <div className="flex items-center justify-center text-5xl font-semibold">
        <span>$</span>
        <span>{formattedAmount}</span>
      </div>
      <input
        type="text"
        placeholder="What's this for?"
        value={note}
        onChange={(e) => onNoteChange(e.target.value)}
        className="w-full p-4 text-center bg-gray-50 rounded-xl text-gray-600 placeholder:text-gray-400"
      />
    </div>
  );
};