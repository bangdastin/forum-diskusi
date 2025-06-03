module.exports = {
  extends: ['dicodingacademy'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  rules: {

  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};