/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000", // rgba(0, 0, 0, 1);
        secondary: "#087658",
        dark50: "#00000091", //rgba(0, 0, 0, 0.57);
        dark100: "#282828", //rgba(40, 40, 40, 1);
        grey50 : "#28282880", // rgba(40, 40, 40, 0.5);
        grey60 : "#282828ab", //rgba(40, 40, 40, 0.67);
        grey70: "#282828b3", // rgba(40, 40, 40, 0.7);
        blue50: "#3169d0", // rgba(49, 105, 208, 1);
        blue60: "#eff5ff", // rgba(239, 245, 255, 1);
        blue70: "#bed3fb", //background: rgba(190, 211, 251, 1);
        white50: "#ffffffbd", // rgba(255, 255, 255, 0.74);
        placeholder: "#00000087", // rgba(0, 0, 0, 0.53);
      }
    },
  },
  plugins: [],
}