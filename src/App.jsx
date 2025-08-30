import { useState } from 'react';
import ClarityPopup from './components/ClarityPopup.jsx';
import { ShieldCheck, ShieldAlert, ChevronRight, Code2 } from 'lucide-react';

// --- New, more detailed fake data for the polished UI ---
const safeData = {
  riskLevel: 'safe',
  title: 'SAFE TRANSACTION',
  message: 'This is a standard token swap on a recognized and audited decentralized exchange. The contract interaction is as expected.',
  details: {
    action: 'Swap 0.1 ETH for ~150 USDC',
    permissions: 'Spend 0.1 ETH from your wallet'
  }
};

const dangerData = {
  riskLevel: 'danger',
  title: 'CRITICAL RISK DETECTED',
  message: 'This transaction grants unlimited control over your assets to an unverified contract. This is a common pattern for wallet-draining scams.',
  details: {
    action: 'Approve contract for all operations',
    permissions: 'Transfer ALL NFTs and Tokens'
  }
};
// ----------------------------------------------------

function App() {
  const [popupData, setPopupData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Kept for future backend integration

  const handleSafeClick = () => {
    setPopupData(safeData);
  };
  
  // For the UI demo, this now instantly uses the hard-coded data.
  // You can add your async fetch logic back in here when ready.
  const handleDangerClick = () => {
    setPopupData(dangerData);
  };

  const handleClose = () => {
    setPopupData(null);
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden bg-slate-900 text-white">
      {/* Background Aurora Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute -translate-x-[40rem] -translate-y-[20rem] w-[80rem] h-[80rem] bg-gradient-radial from-blue-500/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute translate-x-[20rem] translate-y-[10rem] w-[60rem] h-[60rem] bg-gradient-radial from-red-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4">
                 <Code2 className="text-blue-400" size={32}/>
                 <h1 className="text-4xl font-bold tracking-tighter">ClaritySign</h1>
            </div>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
                An AI-powered security layer that translates complex transactions into simple, understandable actions before you sign.
            </p>
        </div>
        
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl shadow-2xl shadow-black/20 backdrop-blur-lg">
            <div className="p-6 border-b border-slate-700">
                <h2 className="text-xl font-semibold">Transaction Simulator</h2>
                <p className="text-slate-400">Select a scenario to analyze.</p>
            </div>
            <div className="divide-y divide-slate-700">
                <button onClick={handleSafeClick} className="w-full flex justify-between items-center p-6 hover:bg-slate-700/50 transition-colors duration-200">
                    <div className="flex items-center gap-4">
                        <ShieldCheck className="text-green-400" size={24} />
                        <span className="text-lg">Simulate a Safe Swap</span>
                    </div>
                    <ChevronRight className="text-slate-500"/>
                </button>
                <button onClick={handleDangerClick} className="w-full flex justify-between items-center p-6 hover:bg-slate-700/50 transition-colors duration-200">
                    <div className="flex items-center gap-4">
                        <ShieldAlert className="text-red-400" size={24} />
                        <span className="text-lg">Simulate a Malicious Mint</span>
                    </div>
                    <ChevronRight className="text-slate-500"/>
                </button>
            </div>
        </div>
      </div>
      
      {popupData && (
        <ClarityPopup
          riskLevel={popupData.riskLevel}
          title={popupData.title}
          message={popupData.message}
          details={popupData.details}
          onClose={handleClose}
        />
      )}
    </main>
  );
}

export default App;

