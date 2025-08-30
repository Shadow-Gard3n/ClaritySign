/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        // ADD THIS WHOLE BLOCK
        keyframes: {
          'fade-in-scale': {
            '0%': { opacity: '0', transform: 'scale(0.95)' },
            '100%': { opacity: '1', transform: 'scale(1)' },
          },
        },
        animation: {
          'fade-in-scale': 'fade-in-scale 0.2s ease-out',
        },
        // END OF BLOCK
      },
    },
    plugins: [],
  }