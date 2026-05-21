import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#151518",
        coal: "#202126",
        line: "#e7e2dc",
        pearl: "#f7f5f1",
        redbrand: "#a8141d",
        reddeep: "#6f0d14",
        gold: "#c7a35b"
      },
      boxShadow: {
        premium: "0 24px 80px rgba(20, 20, 20, 0.12)",
        soft: "0 14px 40px rgba(20, 20, 20, 0.08)"
      },
      borderRadius: {
        panel: "8px"
      }
    }
  },
  plugins: []
};

export default config;
