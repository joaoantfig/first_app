import React, { useState, useEffect } from 'react';
import { Calculator, Download } from 'lucide-react';

export const Header: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500 rounded-lg">
            <Calculator size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">InterestMate</h1>
            <p className="text-xs text-blue-100 opacity-90">Smart Loan Calculator</p>
          </div>
        </div>

        {deferredPrompt && (
          <button
            onClick={handleInstall}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 active:bg-white/40 text-white px-3 py-2 rounded-lg transition-all text-sm font-medium"
            title="Install App"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Install</span>
          </button>
        )}
      </div>
    </header>
  );
};