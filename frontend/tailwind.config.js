/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'console-bg': '#000',
        'console-text': '#0f0',
        'console-highlight': '#f00'
      },
      fontFamily: {
        'console': ['Courier New', 'monospace']
      }
    },
  },
  plugins: [],
}