/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      animation: {
        pop: "pop 4s ease-out forwards",
      },
      keyframes: {
        pop: {
          "0%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.5)",
          },
          "100%": {
            transform: "scale(0) translateY(-40px)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: ["light", "dark", "lemonade"],
  },
};
