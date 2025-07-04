// eslint.config.js
const parserTs = require("@typescript-eslint/parser");
const eslintPluginTs = require("@typescript-eslint/eslint-plugin");

module.exports = [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": eslintPluginTs,
    },
    rules: {
      ...eslintPluginTs.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "off", // desactiva 'any'
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }]
    },
  },
];
