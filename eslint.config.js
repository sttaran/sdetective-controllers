import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {languageOptions: {globals: globals.browser}},
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "object-curly-spacing": "error",
      "object-property-newline": "error",
      indent: ["error", 2],
    }
  }
];