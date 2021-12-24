import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import env from 'vite-plugin-env-compatible';
import relay from 'vite-plugin-relay';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: 'window',
  },
  plugins: [react(), tsconfigPaths(), env(), relay],
});
