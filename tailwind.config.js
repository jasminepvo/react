/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brown: "#2f0601", // Background color
        taupe: "#8a817c", // Text / secondary background
        gray: "#bcb8b1", // Another option for lighter sections
        cream: "#f4f3ee", // Light text color
        blush: "#e0afa0", // Accent color for links, hover, etc.
      },
    },
  },
  plugins: [],
};
