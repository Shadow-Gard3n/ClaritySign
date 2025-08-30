import React, { useState } from "react";

const SkeletonLoader = () => (
    <div className="mt-8 p-6 bg-gray-700/50 rounded-lg space-y-5 animate-pulse">
    <div className="space-y-3">
        <div className="h-5 bg-gray-600/50 rounded w-1/3"></div>
        <div className="h-4 bg-gray-600/50 rounded w-full"></div>
    </div>
    <div className="border-t border-gray-600/50 my-4"></div>
    <div className="space-y-3">
        <div className="h-5 bg-gray-600/50 rounded w-1/4"></div>
        <div className="h-4 bg-gray-600/50 rounded w-full"></div>
    </div>
    <div className="border-t border-gray-600/50 my-4"></div>
    <div className="p-4 bg-yellow-900/50 border border-yellow-700/50 rounded-lg">
       <div className="h-5 bg-yellow-800/50 rounded w-1/3 mb-3"></div>
       <div className="h-4 bg-yellow-800/50 rounded w-full"></div>
    </div>
  </div>
);

function SmartContractExplainer() {
  const [contractAddress, setContractAddress] = useState("");
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleExplainContract = async () => {
    // ... (rest of the function is unchanged)
    if (!contractAddress.trim()) {
      setError("Please paste a contract address before analyzing.");
      return;
    }
    setIsLoading(true);
    setSummary(null);
    setError("");
    try {
      const response = await fetch('/api/explainContract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contractAddress: contractAddress })
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.rugPullRisks || 'An unknown error occurred.');
      }
      const data = await response.json();
      setSummary(data);
    } catch (err) {
      console.error("Failed to fetch contract explanation:", err);
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/10 transition-all duration-300 hover:border-green-400/50">
      <div className="flex items-center mb-6">
        <div className="bg-green-500/20 p-2 rounded-full">
          <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6-4a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="ml-4 text-2xl font-bold text-white">Smart Contract Analyzer</h2>
      </div>

      <input
        type="text"
        className="w-full bg-gray-900/70 text-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        placeholder="Paste a verified contract address..."
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />

      <button
        onClick={handleExplainContract}
        disabled={isLoading}
        className="mt-6 w-full flex items-center justify-center bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
      >
        {isLoading ? (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          "Analyze Contract"
        )}
      </button>

      {error && <p className="mt-4 text-red-400 text-center animate-fade-in-up">{error}</p>}
      {isLoading && <SkeletonLoader />}
      {summary && !isLoading && (
        <div className="mt-8 p-6 bg-gray-700/50 rounded-lg space-y-5 animate-fade-in-up">
          <div>
            <h3 className="font-semibold text-lg text-gray-200 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              Function Permissions:
            </h3>
            <p className="mt-2 text-gray-300 pl-7">{summary.whoCanCall}</p>
          </div>
          <div className="border-t border-gray-600/50 my-4"></div>
          <div>
            <h3 className="font-semibold text-lg text-gray-200 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              Admin Powers:
            </h3>
            <p className="mt-2 text-gray-300 pl-7">{summary.adminPowers}</p>
          </div>
          <div className="border-t border-gray-600/50 my-4"></div>
          <div className="p-4 bg-yellow-900/70 border border-yellow-700 rounded-lg">
            <h3 className="font-bold text-lg text-yellow-300 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              Potential Risks:
            </h3>
            <p className="mt-2 text-yellow-200">{summary.rugPullRisks}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SmartContractExplainer;
