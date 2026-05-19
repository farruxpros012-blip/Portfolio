/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#057a8d',
        'brand-border': '#08abc6',
        accent: '#2cd9f5',
        'accent-red': '#ff383c',
        'brand-light': '#3795a4',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0,0,0,.22)',
        'btn': '0 4px 12px rgba(0,0,0,.3)',
      },
    },
  },
  plugins: [],
}
