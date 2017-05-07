module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "globals": {
    "process": true,
    "__dirname": true,
    "require": true,
    "module": true,
    "describe": true,
    "beforeEach": true,
    "it": true,
    "expect": true,
    "beforeAll": true
  },
  "rules": {
    "no-console": 0,
    "indent": [
      "error",
      2,
      {"SwitchCase": 1}
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "no-case-declarations": 0,
    "eqeqeq": "warn",
    "react/jsx-uses-vars": "warn",
    "react/jsx-uses-react": 1
  }
}
