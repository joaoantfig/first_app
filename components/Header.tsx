import React from 'react';
import { Calculator } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="flex items-center gap-3 max-w-lg mx-auto">
        <div className="p-2 bg-blue-500 rounded-lg">
          <Calculator size={24} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">InterestMate</h1>
          <p className="text-xs text-blue-100 opacity-90">Smart Loan Calculator</p>
        </div>
      </div>
    </header>
  );
};