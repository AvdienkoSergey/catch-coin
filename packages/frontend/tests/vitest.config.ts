import { defineConfig, type UserConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    globals: true,
  },
  resolve: {
    alias: {
      '@catch-coin/frontend-mobile': path.resolve(__dirname, '../app-mobile'),
      '@': path.resolve(__dirname, '../app-mobile/src'),
    },
  },
} as UserConfig); 