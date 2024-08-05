/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}","./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'ceramic-grey': '#CDCDC0',
        'custom-green': '#ACD0C0',
        'new-blue': '#A5C3CF'
      },
    },
  },
  plugins: [],
}

