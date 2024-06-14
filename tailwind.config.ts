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
        blackish: "#222222",
        "pastel-pink": "#FFD2DC",
        "dark-pink": "#FF4D6F",
        "pastel-green": "#BAFBE4",
        "dark-grey": "#333333",
        "medium-grey": "#D9D9D9",
        "light-grey": "#F2F2F2",
      },
      borderRadius: {
        "20": "20px",
      },
    },
  },

  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        "::-webkit-scrollbar": {
          width: "2px",
          height: "6px",
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: "#FF4D6F",
        },
        "::-webkit-scrollbar-track": {
          backgroundColor: "#D2D2D2",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
export default config;
