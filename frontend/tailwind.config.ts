import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Cera Pro", "system-ui", "sans-serif"],
      },

      colors: {
        primary: {
          DEFAULT: "#111827",
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },

        brand: {
          DEFAULT: "#1e3a8a",
          50: "#f8fbff",
          100: "#e0e9ff",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1e40af",
          800: "#1e3a8a",
          900: "#172554",
        },

        secondary: "#6b7280",

        surface: "#ffffff",
        "surface-light": "#f9fafb",

        alert: "#dc2626",
        attention: "#f59e0b",
        info: "#2563eb",
        success: "#16a34a",
        neutral: "#d1d5db",

        health: "#ef4444",
        education: "#f8b11a",
        assistance: "#18b7b1",

        "health-bg": "#fee2e2",
        "education-bg": "#fff7d6",
        "assistance-bg": "#dff8f7",

        text: {
          primary: "#111827",
          secondary: "#6b7280",
        },
      },

      boxShadow: {
        card: "0 4px 14px rgba(0,0,0,0.06)",
      },

      borderRadius: {
        card: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },

  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
  ],
};

export default config;
