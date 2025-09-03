/**** TailwindCSS Config ****/
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "var(--brand)",
        accent: "var(--accent)",
      },
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

