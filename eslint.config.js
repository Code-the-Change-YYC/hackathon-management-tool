import path from "path";
import { fileURLToPath } from "url";
import pluginPrettier from "eslint-plugin-prettier";
import pluginPromise from "eslint-plugin-promise";
import pluginReact from "eslint-plugin-react";
import pluginTailwindcss from "eslint-plugin-tailwindcss";
import pluginNext from "@next/eslint-plugin-next";
import pluginTypescript from "@typescript-eslint/eslint-plugin";
import parserTypescript from "@typescript-eslint/parser";
import prettierConfig from "./prettier.config.cjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const project = path.join(__dirname, "./tsconfig.json");
const backend = path.join(__dirname, "./amplify/tsconfig.json");

export default [
  {
    ignores: [
      "node_modules/",
      "dist/",
      "build/",
      "coverage/",
      "public/",
      ".next/",
      "out/",
      ".amplify/",
    ],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: parserTypescript,
      parserOptions: {
        project: [project, backend],
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      "@typescript-eslint": pluginTypescript,
      prettier: pluginPrettier,
      promise: pluginPromise,
      react: pluginReact,
      "@next/next": pluginNext,
      tailwindcss: pluginTailwindcss,
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "no-unused-vars": "off",
      "no-eval": "error",
      "no-var": "error",
      eqeqeq: ["error", "smart"],
      "prettier/prettier": ["error", prettierConfig],
      "tailwindcss/no-contradicting-classname": "error",
      "tailwindcss/no-custom-classname": "off",
      "tailwindcss/classnames-order": "off",
      "require-await": "off",
      "@typescript-eslint/require-await": "off",
    },
  },
];
