/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        borderColorSemiTransparent: "rgba(51, 47, 121, 1)",
        borderColorActive: "#02E2F4",
        secondary: "#B6B4CA",
        primary: "rgba(255, 255, 255, 0.87)",
      },
      backgroundColor: {
        primary: "#19173D",
        "semi-transparent": "#262450",
        active: "#0DA6C2",
      },
    },
  },
  plugins: [],
};
