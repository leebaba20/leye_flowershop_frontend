import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3000, // ✅ Changed from 5173 to 3000
    },
    port: 3000, // ✅ Changed from 5173 to 3000
    strictPort: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
