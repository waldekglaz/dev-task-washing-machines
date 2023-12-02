/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-grey': '#F8F8F8',
        'custom-text-grey': '#767676',
        'custom-text-blue': '#007AFF'
      }
    },
  },
  plugins: [],
}

