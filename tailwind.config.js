/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'sust-wall': "url('../img/sust_wall.jpeg')",
        'sust-audi': "url('../img/qq.jpg')"
      },
      fontFamily: {
        'sawarabi': ['"Sawarabi Mincho", serif'],
        'garamond': ['"EB Garamond", serif'],
        'hack': ['"Hack", monospace']
      }
    },
  },
  corePlugins: {
    preflight: false
  },
  plugins: [],
}

