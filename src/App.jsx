// import React from "react";
// import Header from "./components/Header";
// import TransactionExplainer from "./components/TransactionExplainer";
// import SmartContractExplainer from "./components/SmartContractExplainer";

// function App() {
//   return (
//     <div className="min-h-screen bg-gray-900 text-white font-sans">
//       <Header />
//       <main className="container mx-auto p-4">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <TransactionExplainer />
//           <SmartContractExplainer />
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;

import React from "react";
import Header from "./components/Header";
import TransactionExplainer from "./components/TransactionExplainer";
import SmartContractExplainer from "./components/SmartContractExplainer";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans antialiased">
      <div className="relative min-h-screen">
        {/* Background Gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
        </div>

        <div className="relative z-10">
          <Header />
          <main className="container mx-auto px-6 py-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                Smart Contract & Transaction Analyzer
              </h1>
              <p className="mt-4 text-lg text-gray-400">
                Demystify blockchain interactions with AI-powered insights.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <TransactionExplainer />
              <SmartContractExplainer />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
