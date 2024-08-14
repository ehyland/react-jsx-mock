import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

const IS_TEST = process.env.VITEST === 'true';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: IS_TEST ? 'react-jsx-mock' : 'react',
    }),
  ],
  test: {
    setupFiles: 'src/testSetup.ts',
    environment: 'happy-dom',
    globals: true,
  },
});
