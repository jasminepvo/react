import { create } from '@storybook/theming/create';

export default create({
  base: 'light',
  
  // Brand
  brandTitle: 'React Components',
  brandUrl: 'https://react.dev',
  brandImage: '/assets/react.svg',
  brandTarget: '_self',

  // UI
  colorPrimary: '#e0afa0', // blush - Accent color
  colorSecondary: '#8a817c', // taupe - Secondary color

  // UI Monochrome
  appBg: '#1e140a', // brown - Background color
  appContentBg: '#f4f3ee', // cream - Content background
  appBorderColor: '#bcb8b1', // gray - Border color
  appBorderRadius: 4,

  // Typography
  fontBase: '"Karla", sans-serif',
  fontCode: '"Karla", monospace',

  // Text colors
  textColor: '#8a817c', // taupe - Main text color
  textInverseColor: '#f4f3ee', // cream - Inverse text color

  // Toolbar default and active colors
  barTextColor: '#f4f3ee', // cream
  barSelectedColor: '#e0afa0', // blush
  barBg: '#1e140a', // brown

  // Form colors
  inputBg: '#f4f3ee', // cream
  inputBorder: '#bcb8b1', // gray
  inputTextColor: '#1e140a', // brown
  inputBorderRadius: 4,

  // Additional customizations for specific elements
  buttonBg: '#e0afa0', // blush
  buttonBorder: '#e0afa0', // blush
  booleanBg: '#8a817c', // taupe
  booleanSelectedBg: '#e0afa0', // blush
}); 