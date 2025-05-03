import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test",
    {
      name: '@storybook/addon-a11y',
      options: {
        enabled: true,
        enableByDefault: true
      }
    }
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  "staticDirs": [
    { "from": "./assets", "to": "/assets" }
  ]
};
export default config;