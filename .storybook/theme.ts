// This file configures the custom theme for Storybook, which is a development environment
// for UI components. The theme customizes the appearance of the Storybook interface.

import { create } from '@storybook/theming/create';

export default create({
  // Sets the base theme to light mode
  base: 'light',
  
  // Brand section customizes the branding elements in Storybook
  brandTitle: 'React Components', // Title shown in the sidebar
  brandUrl: 'https://react.dev', // URL when clicking the brand title
  brandImage: '/assets/react.svg', // Logo image
  brandTarget: '_self', // Target for brand links
  

  // UI colors for primary interactive elements
  colorPrimary: '#e0afa0', // blush - Accent color for interactive elements
  colorSecondary: '#8a817c', // taupe - Secondary color for less prominent elements

  // UI Monochrome colors define the main interface colors
  appBg: '#f4f3ee', // cream - Sidebar background
  appContentBg: '#f4f3ee', // cream - Content area background
  appBorderColor: '#bcb8b1', // gray - Border color for UI elements
  appBorderRadius: 4, // Border radius for UI elements

  // Typography settings
  fontBase: '"Karla", sans-serif', // Main font for text
  fontCode: '"Karla", monospace', // Font for code blocks

  // Text colors for content
  textColor: '#8a817c', // taupe - Default text color
  textInverseColor: '#f4f3ee', // cream - Text color on dark backgrounds

  // Toolbar customization
  barTextColor: '#e0afa0', // blush - Text color in the toolbar
  barSelectedColor: '#f4f3ee', // cream - Color for selected items in toolbar
  barBg: '#1e140a', // brown - Toolbar background color

  // Form element styling
  inputBg: '#f4f3ee', // cream - Input field background
  inputBorder: '#bcb8b1', // gray - Input field borders
  inputTextColor: '#1e140a', // brown - Text color in input fields
  inputBorderRadius: 4, // Border radius for input fields

  // Additional UI element customizations
  buttonBg: '#e0afa0', // blush - Button background color
  buttonBorder: '#e0afa0', // blush - Button border color
  booleanBg: '#8a817c', // taupe - Boolean control background
  booleanSelectedBg: '#e0afa0', // blush - Selected boolean control background
}); 