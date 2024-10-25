/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brown: "#1e140a", // Background color
        taupe: "#8a817c", // Text / secondary background
        gray: "#bcb8b1", // Another option for lighter sections
        cream: "#f4f3ee", // Light text color
        blush: "#e0afa0", // Accent color for links, hover, etc.
      },
      fontFamily: {
        sans: ["Karla", "sans-serif"], // Default font
        italiana: ["Italiana", "sans-serif"], // Headings or specific elements
      },
    },
  },
  plugins: [],
};
