// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // This is the magic part!
    proxy: {
      // Any request starting with /api will be forwarded to our backend server
      '/api': {
        target: 'http://localhost:3001', // The address of our backend
        changeOrigin: true,
      },
    },
  },
});