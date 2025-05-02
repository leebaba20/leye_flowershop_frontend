import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // ✅ Keep this as '/' for Netlify
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3000,
    },
    port: 3000,
    strictPort: true,
    open: true,
    proxy: {
      '/api': {
        target: 'https://leye-flowershop-backend.onrender.com', // ✅ use your Render backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
