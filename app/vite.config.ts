import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { signProxyPlugin } from './vite-plugin-sign-proxy';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appNodeModules = path.join(__dirname, 'node_modules');
const designSystemSrc = path.join(__dirname, 'src/design-system');
const designAppSrc = path.join(__dirname, 'src/ui');

export default defineConfig({
  plugins: [
    react({
      include: [/\/app\/src\/(ui|pages|components)\/.*\.tsx$/],
    }),
    tailwindcss(),
    signProxyPlugin(),
  ],
  resolve: {
    alias: {
      '@zone/design-system': path.join(designSystemSrc, 'index.ts'),
      '@zone/design-system/styles': path.join(designSystemSrc, 'styles/index.css'),
      '@zone/ui': designAppSrc,
    },
    modules: [appNodeModules, 'node_modules'],
    dedupe: ['react', 'react-dom', 'lucide-react', 'sonner', 'clsx', 'tailwind-merge', 'zustand'],
  },
  optimizeDeps: {
    entries: [path.join(__dirname, 'index.html')],
    include: [
      'react',
      'react-dom',
      'react/jsx-dev-runtime',
      'react/jsx-runtime',
      'lucide-react',
      'sonner',
      'clsx',
      'tailwind-merge',
      'zustand',
    ],
  },
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/@solana/wallet-adapter')) return 'wallet-adapter';
          if (id.includes('node_modules/@solana/web3.js')) return 'solana-web3';
          if (id.includes('node_modules/@coral-xyz/anchor')) return 'anchor';
          if (id.includes('node_modules/@tanstack')) return 'query';
          if (id.includes('node_modules/react-router')) return 'router';
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) return 'react';
        },
      },
    },
  },
});
