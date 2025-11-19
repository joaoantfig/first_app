import React, { useState } from 'react';
import { LoanInput, LoanResult } from '../types';
import { formatCurrency } from '../utils/calculations';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ArrowLeft, Sparkles, RefreshCw } from 'lucide-react';
import { getFinancialAdvice } from '../services/geminiService';

interface ResultsDisplayProps {
  input: LoanInput;
  result: LoanResult;
  onReset: () => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ input, result, onReset }) => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [isLoadingAdvice, setIsLoadingAdvice] = useState(false);

  const chartData = [
    { name: 'Principal', value: input.amount },
    { name: 'Interest', value: result.totalInterest },
  ];

  const COLORS = ['#3b82f6', '#f59e0b']; // Blue for principal, Amber for interest

  const handleGetAdvice = async () => {
    setIsLoadingAdvice(true);
    const aiResponse = await getFinancialAdvice(input, result);
    setAdvice(aiResponse);
    setIsLoadingAdvice(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Navigation / Back */}
      <button 
        onClick={onReset}
        className="flex items-center text-slate-500 hover:text-blue-600 transition-colors text-sm font-medium mb-2"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Inputs
      </button>

      {/* Main Result Card */}
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
        <div className="bg-blue-600 p-6 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <p className="text-blue-100 text-sm font-medium mb-1 uppercase tracking-wider">Monthly Payment</p>
          <h2 className="text-4xl font-extrabold tracking-tight">
            {formatCurrency(result.monthlyPayment)}
          </h2>
        </div>
        
        <div className="p-6 grid grid-cols-2 gap-6 divide-x divide-slate-100">
          <div className="text-center">
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-1">Total Interest</p>
            <p className="text-amber-500 font-bold text-lg">{formatCurrency(result.totalInterest)}</p>
          </div>
          <div className="text-center pl-6">
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-1">Total Payback</p>
            <p className="text-slate-800 font-bold text-lg">{formatCurrency(result.totalPayment)}</p>
          </div>
        </div>
      </div>

      {/* Visualization */}
      <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 p-6 border border-slate-100">
        <h3 className="text-slate-800 font-bold text-lg mb-4">Breakdown</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Advisor Section */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl shadow-lg p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-500 rounded-full opacity-20 blur-2xl"></div>
        
        <div className="flex items-center justify-between mb-4 relative z-10">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Sparkles className="text-yellow-300 h-5 w-5" />
            AI Financial Insights
          </h3>
        </div>

        {!advice ? (
          <div className="text-center py-4">
            <p className="text-indigo-200 text-sm mb-6">
              Get a personalized analysis of this loan offer powered by Gemini.
            </p>
            <button
              onClick={handleGetAdvice}
              disabled={isLoadingAdvice}
              className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {isLoadingAdvice ? (
                <>
                  <RefreshCw className="animate-spin h-4 w-4" />
                  Analyzing...
                </>
              ) : (
                "Analyze My Loan"
              )}
            </button>
          </div>
        ) : (
          <div className="animate-fade-in relative z-10">
            <div className="prose prose-invert prose-sm max-w-none">
              <p className="whitespace-pre-line text-indigo-100 leading-relaxed text-sm">
                {advice}
              </p>
            </div>
            <button 
               onClick={() => setAdvice(null)}
               className="mt-4 text-xs text-indigo-400 hover:text-white underline decoration-indigo-400"
            >
              Clear Analysis
            </button>
          </div>
        )}
      </div>
    </div>
  );
};