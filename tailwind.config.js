/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'baby-blue': '#BFD7ED',
        'blue-grotto': '#60A3D9',
        'royal-blue': '#007AB7',
        'navy-blue': '#003873',
      },
      fontFamily: {
        'sans': ['Tahoma', 'sans-serif'],
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',
      },
    },
  },
  plugins: [],
};
