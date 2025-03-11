import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
<<<<<<< HEAD
=======
import path from 'path';
>>>>>>> 2a8cb33 (Initial commit for my project)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
<<<<<<< HEAD
});
=======
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
>>>>>>> 2a8cb33 (Initial commit for my project)
