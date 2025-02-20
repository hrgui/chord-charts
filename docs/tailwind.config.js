/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./**/*.md",
    "./*.md",
    "./.vitepress/theme/**/*.{js,ts,vue}",
    "./.vitepress/**/*.{js,ts,vue}",
    "./docs/**/*.md",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
