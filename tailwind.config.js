/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "350px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
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
    extend: {
      boxShadow: {
        cyanShadow: "0px 0px 20px 0px rgba(94, 206, 220, 0.5)",
        cyanBigShadow: "10px 10px 1000px 500px rgba(94, 206, 220, 0.3)",
        cyanMediumShadow: "10px 10px 200px 150px rgba(94, 206, 220, 0.5)",
        orangeBigShadow: "10px 10px 10000px 500px rgba(240, 169, 79, 0.3)",
        orangeMediumShadow: "10px 10px 2000px 150px rgba(240, 169, 79, 0.5)",
      },
    },
    fontFamily: {
      body: ["Josefin Sans"],
      special: ["Roboto"],
    },
  },
  plugins: [],
};
