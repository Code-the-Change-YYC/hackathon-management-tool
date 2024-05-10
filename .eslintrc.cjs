/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const prettierConfig = require("./prettier.config.cjs");

const project = path.join(__dirname, "./tsconfig.json");
const backend = path.join(__dirname, "./amplify/tsconfig.json");

/** @type {import("eslint").Linter.Config} */
const config = {
  settings: {
    react: {
      version: "detect",
    },
  },
  overrides: [
    {
      extends: [
        // "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:promise/recommended",
      ],
      files: [
        "./src/**/*.ts",
        "./src/**/*.tsx",
        "./amplify/**/*.ts",
        "./amplify/**/*.tsx",
      ],
      parserOptions: {
        project: {
          include: [project, backend],
        },
      },
      rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-explicit-any": "error",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier", "promise"],
  extends: [
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/recommended",
    "plugin:@next/next/recommended",
    "plugin:prettier/recommended",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    eqeqeq: ["error", "smart"],
    "prettier/prettier": ["error", prettierConfig],
    "no-eval": "error",
    "no-var": "error",
    "prettier/prettier": "error",
    "no-restricted-imports": ["error", { patterns: [".*"] }],
    "tailwindcss/no-custom-classname": "off",
    "tailwindcss/classnames-order": "off", // tcss prettier plugin handles this
    "require-await": "off",
    "@typescript-eslint/require-await": "off",
  },
};

module.exports = config;
