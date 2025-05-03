import { defineConfig } from 'vitest/config';
import { mergeConfig } from 'vite';
import viteConfig from './vite.config';
import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(async () => {
  return mergeConfig(
    viteConfig,
    defineConfig({
      test: {
        name: 'storybook',
        root: __dirname,
        environment: 'jsdom',
        setupFiles: ['.storybook/vitest.setup.ts'],
        include: ['src/**/*.stories.{js,jsx,ts,tsx}'],
        browser: {
          enabled: true,
          headless: true,
          name: 'chromium',
          provider: 'playwright',
        },
      },
      plugins: [
        storybookTest({
          configDir: join(__dirname, '.storybook'),
        }),
      ],
    })
  );
}); 