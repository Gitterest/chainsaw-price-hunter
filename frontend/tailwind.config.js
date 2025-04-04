/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css,scss}"
  ],
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        error: 'var(--error)',
      }
    },
  },
  plugins: [],
}
