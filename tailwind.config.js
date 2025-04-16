/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      deepblue: "#061bb0",
      darkblue: "#0c2b9a",
      blue: "#1e3a8a",
      hazeblue: "#1893f8",
      lightblue: "#3d5af1",
      cyan: "#00b3b3",
      darkcyan: "#009fb3",
      lightcyan: "#88e5f0",
      lightbrown: "#f1d1b5",
      brown: "#c68c53",
      darkbrown: "#a66a3e",
      white: "#f1e1d9",
      black: "#1e1917",
      gray: "#626965",
      darkgray: "#3f4441",
      lightgray: "#978580",
    },
    extend: {},
    fontFamily: {
      body: ["Josephin Sans"],
      special: ["Roboto"],
    },
  },
  plugins: [],
};
