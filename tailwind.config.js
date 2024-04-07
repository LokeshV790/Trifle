/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        loading: "linear-gradient(45deg,rgba(0,0,0,0.5), rgba(255,255,255,0.15), rgba(0,0,0,0.5))"
      },
      animation: {
        loading: "loading 2s infinite ease-in-out alternate"
      },
      fontFamily: {
        roboto: ["Roboto Flex Variable"],
        overused : ["Overused Grotesk"]
      },
      colors: {
        green_hover: {
          100: "#071a14",
          200:  "#00ba7c"
        },
        heart_pink: {
          100: "#200914",
          200: "#f91880",
        },
        accent: {
          200: "#0a171f",
          100: "#0f4e78",
          800: "#1a8cd8",
          900: "#358ff0",
        },
        grays: {
          100: "#181818",
          200: "#2f3336",
          300: "#64686d",
          400: "#5d6165",
          800: "#202327",
          900: "#e7e9ea",
          100: "#181818",
        },
        primary: {
          100: "#16181c",
          200: "#1d1f23",
        },
        background: "#000000",
        text: {
          900: "#d2d3d4",
          500: "#575b5f",
          400: "#61666a",
        },
      },
    },
  },
  plugins: [],
};
