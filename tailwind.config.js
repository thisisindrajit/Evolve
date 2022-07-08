/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      ...defaultTheme.screens,
      xsm: "425px",
      xmd: "852px",
      md: "992px",
    },
    extend: {
      spacing: {
        'screen-60': '60vw',
        'screen-95': '95vw',
      },
      borderColor: {
        "evolve-green": "#14cccc",
      },
      backgroundColor: {
        "evolve-green": "#14cccc",
        "dark-green": "#218f8f",
      },
      textColor: {
        "evolve-green": "#14cccc",
      },
    },
  },
  plugins: [],
};
