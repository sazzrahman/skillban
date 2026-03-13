import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F0F13",
        surface: "#1A1A24",
        "surface-raised": "#24243A",
        primary: "#6366F1",
        "primary-hover": "#4F46E5",
        secondary: "#F59E0B",
        "text-primary": "#F1F5F9",
        "text-secondary": "#94A3B8",
        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444",
        border: "#2E2E45",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
