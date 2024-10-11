/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightborderColor: "rgba(128,117,214,255)",
        borderColorSemiTransparent: "rgba(51, 47, 121, 1)",
        borderColorActive: "#02E2F4",
        secondary: "#B6B4CA",
        primary: "rgba(255, 255, 255, 0.87)",
        primaryBorder: "#19173D",
        redError: "#E7042C",
        greanColor: "#62DE71",
        whiteColor: "#FFFFFF",
        activeColor: "#0DA6C2",
        lightBlue: "#15DCE7",
        grey: "#898A8D",
        textBlue: "#141338",
      },
      backgroundColor: {
        primary: "#19173D",
        block: "#444065",
        secondaryBg: "#B6B4CA",
        yellowColor: "#FEAD1D",
        "semi-transparent": "#262450",
        "light-semi-transparent": "#403a98",
        active: "#0DA6C2",
        lightGray: "#D9D9D9",
        darkBlue: "#163368",
      },
    },
  },
  plugins: [],
};
