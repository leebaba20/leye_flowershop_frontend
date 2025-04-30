import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',  // Use '/' for root directory in production (Vercel)
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,  // This is fine for local development
    },
  },
});
