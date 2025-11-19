import React, { useState } from 'react';
import { LoanInput } from '../types';
import { DollarSign, Percent, Calendar, ArrowRight } from 'lucide-react';

interface InputFormProps {
  onCalculate: (input: LoanInput) => void;
}

export const InputForm: React.FC<InputFormProps> = ({ onCalculate }) => {
  const [amount, setAmount] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [years, setYears] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && rate && years) {
      onCalculate({
        amount: parseFloat(amount),
        rate: parseFloat(rate),
        years: parseFloat(years)
      });
    }
  };

  const isFormValid = amount !== '' && rate !== '' && years !== '';

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-2 animate-fade-in-up">
      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-600 mb-1">How much do you need?</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <DollarSign className="h-5 w-5 text-blue-500" />
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-lg font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
            placeholder="10,000"
            inputMode="decimal"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-600 mb-1">Interest Rate</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Percent className="h-5 w-5 text-blue-500" />
            </div>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-lg font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
              placeholder="5.5"
              inputMode="decimal"
              step="0.1"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-600 mb-1">Duration (Years)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-blue-500" />
            </div>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-lg font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
              placeholder="5"
              inputMode="numeric"
              required
            />
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full flex items-center justify-center py-4 rounded-2xl text-white font-bold text-lg shadow-lg transition-all transform active:scale-95 ${
            isFormValid 
              ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30' 
              : 'bg-slate-300 cursor-not-allowed'
          }`}
        >
          Calculate Payment
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
      
      <div className="text-center text-xs text-slate-400 mt-4">
        Calculates standard amortized loan payments.
      </div>
    </form>
  );
};