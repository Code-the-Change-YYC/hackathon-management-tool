import type { Config, PluginAPI } from "tailwindcss/types/config";

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
        "strawberry-red": "#ef4444",
        "pastel-pink": "#FFD2DC",
        "medium-pink": "#FF859C",
        "dark-pink": "#FF4D6F",
        "fuzzy-peach": "#FFD7C5",
        grapefruit: "#FF6B54",
        "pastel-green": "#BAFBE4",
        "dark-green": "#00D3A9",
        "regal-blue": "#396fb3",
        "lilac-purple": "#D6C9FF",
        "awesome-purple": "#A689FF",
        "awesomer-purple": "#7055FD",
        "light-grey": "#F2F2F2",
        "dashboard-grey": "#E5E5E5",
        "grey-purple": "#4B486D",
        "mint-green": "#D4FAEF",
        "medium-grey": "#D9D9D9",
        "ehhh-grey": "#C5C5C5",
        "dark-grey": "#333333",
      },
      borderRadius: {
        "20": "20px",
      },
    },
  },

  plugins: [
    function ({ addUtilities }: PluginAPI) {
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
        "::-webkit-details-marker": {
          display: "none",
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
export default config;
