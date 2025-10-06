// /** @type {import("prettier").Config} */
const config = {
  plugins: [
    require.resolve("@ianvs/prettier-plugin-sort-imports"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
  endOfLine: "auto",
  trailingComma: "all",
  semi: true,
  importOrder: [
    "^@(.*)$",
    "^~/(?!components)(.*)$",
    "^~/components(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

module.exports = config;
