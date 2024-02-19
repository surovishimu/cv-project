/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customRed: '#B0272E',
        customgray: '#D9D9D9'
      },
    },
  },
  plugins: [require("daisyui")],
}
