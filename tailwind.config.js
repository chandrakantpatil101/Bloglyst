// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class", // Enables class-based dark mode
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'),require('@tailwindcss/line-clamp')],
};
