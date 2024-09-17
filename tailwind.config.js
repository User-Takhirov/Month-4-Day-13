/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      container: {
        screens: {
          lg: "1200px",
        },
        center: true,
      },
    },
  },
  plugins: [],
};
