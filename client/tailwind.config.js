import { fontFamily } from 'tailwindcss/defaultTheme';
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'm-plus-rounded': ['"M PLUS Rounded 1c"', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}