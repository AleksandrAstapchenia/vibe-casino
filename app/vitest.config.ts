import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appNodeModules = path.join(__dirname, 'node_modules');
const designSystemSrc = path.join(__dirname, 'src/design-system');
const designAppSrc = path.join(__dirname, 'src/ui');

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/test/**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@zone/design-system': path.join(designSystemSrc, 'index.ts'),
      '@zone/ui': designAppSrc,
    },
    modules: [appNodeModules, 'node_modules'],
    dedupe: ['react', 'react-dom'],
  },
});
