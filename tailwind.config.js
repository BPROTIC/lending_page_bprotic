export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",   // biru utama
        secondary: "#7c3aed", // ungu modern
        dark: "#0f172a",      // dark mode
        light: "#f8fafc"
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 25px rgba(0,0,0,0.1)",
        glow: "0 0 20px rgba(37,99,235,0.5)"
      },
      borderRadius: {
        xl: "1rem",
        '2xl': "1.5rem"
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem"
      }
    },
  },
  plugins: [],
}