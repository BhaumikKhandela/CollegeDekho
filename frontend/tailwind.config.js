/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryGreen: '#00A550',
        secondaryGreen: '#007B3E',
      },
    },
  },
  plugins: [],
}
