import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#013684", dark: "#012556" },
        red: { DEFAULT: "#E20A17", dark: "#c00813" },
        gold: { DEFAULT: "#D4A84B", soft: "#f4e4c0" },
        ink: "#1A1A2E",
        ivory: "#FAF7F2",
        canvas: "#f7f8fb",
        muted: "#6b7280",
        line: "#e5e7eb",
        ok: "#10b981",
        warn: "#f59e0b",
        confidential: { DEFAULT: "#fef3f2", border: "#f5c6c3" },
        
       
        dark: {
          bg: "#0a0a0f",
          card: "#14141f",
          border: "#2a2a3a",
          text: "#e5e5e5",
          muted: "#8a8a9a",
        }
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      maxWidth: { content: "1100px" },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.04)",
        lift: "0 10px 28px rgba(0,0,0,0.10)",
        navy: "0 8px 24px rgba(1,54,132,0.10)",
        "dark-card": "0 1px 3px rgba(0,0,0,0.3)",
        "dark-lift": "0 10px 28px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;