module.exports = {
  content: [
    './pages/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{vue,js,ts,jsx,tsx}',
    './layouts/**/*.{vue,js,ts,jsx,tsx}',
    './app.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'dark-gray': '#222222',
        orange: '#f56b0c',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
