/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brown: '#1e140a', // Background color
        taupe: '#8a817c', // Text / secondary background
        gray: '#bcb8b1', // Another option for lighter sections
        cream: '#f4f3ee', // Light text color
        blush: '#e0afa0', // Accent color for links, hover, etc.
      },
      fontFamily: {
        sans: ['Karla', 'sans-serif'], // Default font
        italiana: ['Italiana', 'sans-serif'], // Headings or specific elements
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
      },
    },
  },
  plugins: [],
};
