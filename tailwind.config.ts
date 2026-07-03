import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        soft: "rgb(var(--color-soft) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        moss: "rgb(var(--color-moss) / <alpha-value>)",
        copper: "rgb(var(--color-copper) / <alpha-value>)",
        basin: "rgb(var(--color-basin) / <alpha-value>)",
        code: "rgb(var(--color-code) / <alpha-value>)",
        codeText: "rgb(var(--color-code-text) / <alpha-value>)"
      },
      borderRadius: {
        card: "8px"
      },
      fontFamily: {
        sans: ["Geist", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      boxShadow: {
        protocol: "0 24px 80px rgb(0 0 0 / 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
