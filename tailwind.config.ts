import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
        blackish: "#222222",
        "pastel-pink": "#FFD2DC",
        "dark-pink": "#FF4D6F",
      },
      borderRadius: {
        "20": "20px",
      },
    },
  },
  plugins: [],
};
export default config;
