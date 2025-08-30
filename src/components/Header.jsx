// src/components/Header.jsx
import React from "react";
import { Github } from 'lucide-react'; // Import the Github icon

function Header() {
  return (
    <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text">
          ClaritySign AI
        </h1>
        <a 
          href="https://github.com/akshatchauhan7/claritysign" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Github size={24} />
        </a>
      </div>
    </header>
  );
}

export default Header;