/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1B1B1F",
        secondary: "#DC1637",
        shape: "#E1E1E8",
        title: "#47474D",
        text: "#7A7A80",
        success: "#03B252",
      },
    },
  },
  plugins: [],
};
