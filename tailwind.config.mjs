/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // JANGAN LANGSUNG MASUKKAN COLORS DI SINI
    extend: {
      // MASUKKAN DI DALAM EXTEND AGAR WARNA BAWAAN TETAP ADA
      colors: {
        primary: "#0f172a",
        accent: "#2dd4bf",
        success: "#10b981",
        danger: "#ef4444",
      },
    },
  },
  plugins: [],
};

export default config;