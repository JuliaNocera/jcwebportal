module.exports = {
  env: {
    browser: true,
    "jest/globals": true
  },
  extends: [
    "plugin:react-perf/recommended",
    "plugin:react/recommended",
    "standard",
    "prettier",
    "prettier/react",
    "prettier/standard"
  ],
  globals: {
    USE_LOCAL_PROXY: false
  },
  parser: "babel-eslint",
  plugins: ["promise", "react", "react-perf", "jest", "standard", "prettier"],
  rules: {
    "no-alert": "error",
    "no-console": [
      "error",
      {
        allow: ["info", "warn", "debug", "error", "assert"]
      }
    ],
    "prefer-const": "error",
    "react-perf/jsx-no-new-array-as-prop": "warn",
    "react-perf/jsx-no-new-object-as-prop": "warn",
    "react/jsx-filename-extension": "error",
    "react/jsx-sort-props": "error",
    "sort-imports": "error",
    "sort-keys": "error"
  },
  settings: {
    react: {
      version: "16"
    }
  }
};
