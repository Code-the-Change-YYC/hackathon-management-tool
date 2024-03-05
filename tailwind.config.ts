import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        omnes: ["var(--font-omnes)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "regal-blue": "#243c5a",
        "awesome-purple": "#A689FF",
        "awesomer-purple": "#7055FD",
        "ehhh-grey": "#C5C5C5",
        "fuzzy-peach": "#FFD7C5",
      },
    },
  },
  plugins: [],
};
export default config;
