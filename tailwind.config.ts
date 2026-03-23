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
        // Brand colors from DESIGN_SPECS.md
        primary: {
          DEFAULT: "#2ecc71",
          dark: "#27ae60",
          light: "#3ddb84",
        },
        secondary: "#3498db",
        premium: {
          DEFAULT: "#f1c40f",
          dark: "#d4af37",
          light: "#ffd700",
        },
      },
    },
  },
  plugins: [],
};
export default config;
