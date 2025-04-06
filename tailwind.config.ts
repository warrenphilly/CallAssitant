import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Enable class strategy
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "#191D22",
          secondary: "#5C5F64",
          tertiary: "##45484D",
        },
        primary: {
          100: "#5e94de",
          200: "#75a1e2",
          300: "#8baee6",
          400: "#a0bbeb",
          500: "#b3c8ef",
        },
        // Define Navy shades (adjust as needed)
        navy: {
          50: "#E6EBF5",
          100: "#B0C1E0",
          200: "#7A97CB",
          300: "#4F72B1",
          400: "#2F589A",
          500: "#1A4383", // Mid-tone Navy
          600: "#12356E", // Darker Navy (potential primary background)
          700: "#0B2759", // Even Darker
          800: "#071A40", // Very Dark Navy
          900: "#030F2B", // Almost Black Navy
          950: "#01081A", // Darkest
        },
        // Define Purple shades (adjust as needed)
        purple: {
          50: "#F3E5F5",
          100: "#E1BEE7",
          200: "#CE93D8",
          300: "#BA68C8",
          400: "#AB47BC",
          500: "#9C27B0", // Mid-tone Purple
          600: "#8E24AA", // Slightly Darker Purple (potential secondary accent)
          700: "#7B1FA2",
          800: "#6A1B9A",
          900: "#4A148C",
          950: "#310C5E",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
