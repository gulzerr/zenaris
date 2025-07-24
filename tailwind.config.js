/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Zenaris brand colors - using a warm, accessible palette
        primary: {
          50: '#fef7ee',
          100: '#fdedd3',
          200: '#fbd7a5',
          300: '#f8bc6d',
          400: '#f59e42',
          500: '#f2811d',
          600: '#e36613',
          700: '#bc4c12',
          800: '#963d16',
          900: '#793315',
        },
      },
    },
  },
  plugins: [],
}
