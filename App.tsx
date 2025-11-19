import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { LoanInput, LoanResult, ViewState } from './types';
import { calculateLoan } from './utils/calculations';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.INPUT);
  const [inputData, setInputData] = useState<LoanInput | null>(null);
  const [resultData, setResultData] = useState<LoanResult | null>(null);

  const handleCalculate = (input: LoanInput) => {
    const result = calculateLoan(input);
    setInputData(input);
    setResultData(result);
    setViewState(ViewState.RESULTS);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setViewState(ViewState.INPUT);
    setResultData(null);
    // We keep inputData if we wanted to pre-fill, but for now let's keep it clean or maintain state in InputForm if desired.
    // To keep the "App-like" feel, usually going back lets you edit. 
    // Since state is lifted to InputForm via props if we wanted, but here InputForm manages its own temp state.
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow w-full max-w-lg mx-auto p-4 sm:p-6">
        {viewState === ViewState.INPUT && (
          <div className="animate-fade-in">
            <div className="mb-6">
               <h2 className="text-2xl font-bold text-slate-900">Loan Calculator</h2>
               <p className="text-slate-500">Enter your details below to estimate your payments.</p>
            </div>
            <InputForm onCalculate={handleCalculate} />
          </div>
        )}

        {viewState === ViewState.RESULTS && inputData && resultData && (
          <ResultsDisplay 
            input={inputData} 
            result={resultData} 
            onReset={handleReset} 
          />
        )}
      </main>

      <footer className="p-6 text-center text-slate-400 text-xs max-w-lg mx-auto w-full">
        <p>&copy; {new Date().getFullYear()} InterestMate. Financial figures are estimates.</p>
      </footer>

      {/* Global Styles for Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;