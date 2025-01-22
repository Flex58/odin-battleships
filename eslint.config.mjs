import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    plugins: { jest: pluginJest },
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
    },
  },
];
