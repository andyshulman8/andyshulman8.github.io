import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  {
    ignores: ["dist/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    // Claude Code hook scripts run in Node, not the browser
    files: [".claude/**/*.{js,cjs,mjs}"],
    languageOptions: {
      globals: globals.node,
      sourceType: "commonjs"
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off"
    }
  },
  {
    files: [".claude/**/*.mjs"],
    languageOptions: {
      sourceType: "module"
    }
  },
  {
    rules: {
      "react/react-in-jsx-scope": "off",  // ← Turn off the annoying rule
      "react/prop-types": "off",  // ← You're using TypeScript, don't need PropTypes
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",
      "jsx-a11y/role-has-required-aria-props": "warn"
    }
  }
];