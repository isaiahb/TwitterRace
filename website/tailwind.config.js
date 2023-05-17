/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html", // <= add this
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        mypurple: '#3751FF',
      },
      textColor: {
        mypurple: '#3751FF',
      },
      fill: {
        mypurple: '#3751FF',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
