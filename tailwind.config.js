/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <-- This line tells Tailwind where your code is
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
