const TS_PRETTIER_RULES = require("eslint-config-prettier/@typescript-eslint")
  .rules;

module.exports = {
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  rules: {
    ...TS_PRETTIER_RULES,

    // Rules that overlap TypeScript errors.
    "default-case": "off",
    "no-dupe-class-members": "off",
    "no-undef": "off",

    // Turn off rules from ESLint and enable TypeScript eq.
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "none",
        ignoreRestSiblings: true,
      },
    ],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "warn",

    "@typescript-eslint/consistent-type-assertions": "warn",
    "@typescript-eslint/array-type": "warn",
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          Number: {
            message: "Use `number` instead.",
            fixWith: "number",
          },
          Boolean: {
            message: "Use `boolean` instead.",
            fixWith: "boolean",
          },
          String: {
            message: "Use `string` instead.",
            fixWith: "string",
          },
        },
        extendDefaults: false,
      },
    ],
  },
};
