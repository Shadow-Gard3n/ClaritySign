/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Add a custom font family for the cyberpunk theme
        'mono': ['"Share Tech Mono"', 'monospace'],
      },
      colors: {
        // Define our custom color palette
        'cyber-bg': '#0a192f',
        'cyber-surface': 'rgba(17, 34, 64, 0.7)',
        'cyber-cyan': '#64ffda',
        'cyber-blue': '#8892b0',
        'cyber-red': '#ff6464',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Animation for the scan line effect
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'scan-line': 'scan-line 8s linear infinite',
      },
    },
  },
  plugins: [],
}

