import swc from 'unplugin-swc';
import { defineConfig, defaultExclude } from 'vitest/config';

export default defineConfig({
  appType: 'custom',
  root: './src',
  test: {
    globals: true,
    exclude: [...defaultExclude],
    mockReset: true,
    typecheck: {
      enabled: true,
      tsconfig: './tsconfig.json',
      exclude: [...defaultExclude],
      checker: 'tsc',
    },
  },
  plugins: [
    // This is required to build the test files with SWC
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: 'es6' },
    }),
  ],
});
