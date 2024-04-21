import { defineConfig, mergeConfig } from 'vitest/config';
import vitestConfig from './vitest.config';

export default defineConfig(
  mergeConfig(vitestConfig, {
    test: {
      include: ['**/*.e2e-spec.ts'],
    },
  }),
);
