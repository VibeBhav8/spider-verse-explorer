import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        spider: {
          dark: "#06070c",
          darker: "#030305",
          cyan: "#00f0ff",
          magenta: "#ff0055",
          yellow: "#ffe600",
          purple: "#9d4edd",
          card: "rgba(15, 17, 26, 0.8)",
          cardHover: "rgba(25, 28, 42, 0.9)",
        },
      },
      boxShadow: {
        "neon-cyan": "0 0 15px rgba(0, 240, 255, 0.5), 0 0 30px rgba(0, 240, 255, 0.2)",
        "neon-magenta": "0 0 15px rgba(255, 0, 85, 0.5), 0 0 30px rgba(255, 0, 85, 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;

