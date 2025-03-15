/** @type (import('tailwindcss')).Config) */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        colors: {
            deep blue: "#061bb0",
            dark blue: "#0c2b9a",
            blue: "#1e3a8a",
            haze blue: "#1893f8",
            light blue: "#3d5af1",
            cyan: "#00b3b3",
            dark cyan: "#009fb3",
            light cyan: "#88e5f0",
            light brown: "#f1d1b5",
            brown: "#c68c53",
            dark brown: "#a66a3e",
            white: "#f1e1d9",
            black: "#1e1917",
            gray: "#626965",
            dark gray: "#3f4441",
            light gray: "#978580",
        }
        extend: {},
        fontfamily: {
            body: ['Josefin Sans'],
            special: ['Roboto']
        }
    },
    plugins: [],
};