/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      // screens: {
      //   sm: '300px',  // Custom small breakpoint
      //   md: '500px',  // Custom medium breakpoint
      //   lg: '800px', // Custom large breakpoint
      //   xl: '1200px', // Custom extra large breakpoint
      //   '2xl': '1500px', // Custom 2extra large breakpoint
      // },
    },
  },
  plugins: [],
}
