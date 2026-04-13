import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F9F6F1",
        surface: "#FFFFFF",
        "surface-subtle": "#F4F0EB",
        primary: {
          DEFAULT: "#1E3A1E",
          hover: "#2A5020",
          light: "#3D7034",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#8B6A10",
          light: "#C9971E",
          foreground: "#FFFFFF",
        },
        "text-primary": "#1A1714",
        "text-secondary": "#5A5450",
        "text-muted": "#9A948E",
        border: "#E4E0DA",
        "border-strong": "#CCC8C0",
        "jan-tint": "#EFF5EC",
        "jan-border": "#B8D4B0",
        "karin-tint": "#FBF7EC",
        "karin-border": "#D9C07A",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-pattern":
          "linear-gradient(135deg, rgba(30,58,30,0.92) 0%, rgba(139,106,16,0.55) 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
