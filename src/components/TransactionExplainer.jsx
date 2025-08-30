// src/components/TransactionExplainer.jsx

import React, { useState } from "react";

function TransactionExplainer() {
  const [transactionData, setTransactionData] = useState("");
  const [explanation, setExplanation] = useState("");
  const [risk, setRisk] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // This function now makes a real API call
  const handleExplain = async () => {
    if (!transactionData.trim()) {
      setRisk("Please paste transaction data before analyzing.");
      return;
    }
    
    setIsLoading(true);
    setExplanation("");
    setRisk("");

    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transaction: transactionData }) // Send the user's input to the backend
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json(); // Get the AI's response from our backend

      // Update the state with the data from the AI
      setExplanation(data.explanation);
      setRisk(data.risk);

    } catch (error) {
      console.error("Failed to fetch explanation:", error);
      setRisk("Error: Could not retrieve the analysis. Please check the console for details.");
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 p-8 rounded-xl shadow-2xl border border-gray-700">
      <div className="flex items-center mb-6">
        <div className="bg-blue-500 bg-opacity-20 p-2 rounded-full">
          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </div>
        <h2 className="ml-4 text-2xl font-bold text-white">Transaction Explainer</h2>
      </div>

      <textarea
        className="w-full h-48 bg-gray-900 text-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
        placeholder="Paste raw transaction data here..."
        value={transactionData}
        onChange={(e) => setTransactionData(e.target.value)}
      ></textarea>

      <button
        onClick={handleExplain}
        disabled={isLoading}
        className="mt-6 w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
      >
        {isLoading ? (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          "Analyze Transaction"
        )}
      </button>

      {(explanation || risk) && (
        <div className="mt-8 space-y-4">
          {explanation && (
            <div className="p-4 bg-gray-700 bg-opacity-50 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-200">Plain English Summary:</h3>
              <p className="mt-2 text-gray-300">{explanation}</p>
            </div>
          )}
          {risk && (
            <div className="p-4 bg-red-900 bg-opacity-70 border border-red-700 rounded-lg">
              <h3 className="font-bold text-lg text-red-300 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Risk Analysis:
              </h3>
              <p className="mt-2 text-red-200">{risk}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TransactionExplainer;