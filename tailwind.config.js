/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      ...defaultTheme.screens,
      md: "992px",
    },
    extend: {},
  },
  plugins: [],
}
