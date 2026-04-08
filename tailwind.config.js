/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 0 1px rgba(108, 99, 255, 0.35), 0 25px 80px rgba(108, 99, 255, 0.25)"
      },
      fontFamily: {
        sans: ["Space Grotesk", "ui-sans-serif", "system-ui"]
      }
    },
  },
  plugins: [],
}

