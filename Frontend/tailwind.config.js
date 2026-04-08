/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyprus: "#0F4C5C",
        tealish: "#1CA7A6",
        surface: {
          light: "#F8FAFC",
          dark: "#0B1F26",
        },
        darkbg: "#0B1F26",
        darkcard: "#122E36",
        sidebar: {
          light: "#003333",
          dark: "#001a1a",
        }
      },
    },
  },
  plugins: [],
};
