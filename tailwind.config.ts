import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        amber: {
          DEFAULT: "#C17B2F",
          hover: "#A66421",
        },
        green: {
          DEFAULT: "#2D6A4F",
          hover: "#214E3A",
          focus: "#1E4634",
        },
        terracotta: {
          DEFAULT: "#E07A5F",
          hover: "#D66343",
        },
        cream: "#FAF7F2",
        charcoal: "#1A1A2E",
        "light-green": "#D8F3DC",
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
