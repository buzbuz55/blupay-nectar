import React from 'react';
import { ChevronLeft, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PaymentHeader = () => {
  return (
    <header className="p-4 flex justify-between items-center">
      <Link to="/pay" className="p-2">
        <ChevronLeft className="h-6 w-6" />
      </Link>
      <Link to="/pay" className="p-2">
        <X className="h-6 w-6" />
      </Link>
    </header>
  );
};