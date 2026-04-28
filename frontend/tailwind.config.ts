import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  darkMode: "class",

  theme: {
    extend: {
      fontFamily: {
        sans: ["Cera Pro", "system-ui", "sans-serif"],
      },

      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",

        "brand-light": "#e0e9ff", // 100
        "brand-medium": "#3b82f6", // 500 == 700
        "brand-dark": "#1e3a8a", // 800 == 900

        surface: "var(--color-surface)",
        "surface-light": "var(--color-surface-light)",

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
          primary: "var(--color-primary)",
          secondary: "var(--color-secondary)",
        },

        border: "var(--color-border)",
      },

      boxShadow: {
        card: "0 4px 14px var(--color-card-shadow)",
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
