import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Institucional Rio
        primary: {
          50: "#F0F4FF",
          100: "#E0E9FF",
          200: "#C7D5FF",
          300: "#A4B9FF",
          400: "#7B8EFF",
          500: "#3B82F6",
          600: "#1E3A8A", // Primary (azul institucional)
          700: "#1e40af",
          800: "#1e3a8a",
          900: "#172554",
        },
        secondary: {
          50: "#F0F4FF",
          100: "#E0E9FF",
          200: "#C7D5FF",
          300: "#A4B9FF",
          400: "#7B8EFF",
          500: "#3B82F6", // Secondary (azul mais claro)
          600: "#2563EB",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#172554",
        },
        // Cores Semânticas
        alert: "#DC2626",
        attention: "#F59E0B",
        info: "#2563EB",
        success: "#16A34A",
        neutral: "#D1D5DB",
      },
      backgroundColor: {
        surface: "#FFFFFF",
        "surface-light": "#F9FAFB",
      },
      textColor: {
        primary: "#111827",
        secondary: "#6B7280",
      },
      fontFamily: {
        sans: ["Cera Pro", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
