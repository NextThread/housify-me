/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        '2xl': '2px 2px 2px rgb(0 0 0)',
        '3xl': '0 0 3px rgba(0, 0, 0, .8), 0 0 5px rgba(0, 0, 0, .9)',
      },
      fontFamily: {
        body: ['Cambo'],
        body2:['Josefin Sans'],
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
}

