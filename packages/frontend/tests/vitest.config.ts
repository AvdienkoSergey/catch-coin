import { defineConfig, type UserConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    globals: true,
  },
  resolve: {
    alias: {
      '@catch-coin/frontend-mobile': path.resolve(__dirname, '../mobile'),
      '@': path.resolve(__dirname, '../mobile/src'),
    },
  },
} as unknown as UserConfig); 