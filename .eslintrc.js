module.exports = {
  extends: [
    'dicodingacademy',
    'plugin:react/recommended' // Add this line
  ],
  plugins: [
    'react' // Add this line
  ],
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
    // jest: true, // Consider adding if you have Jest tests and `dicodingacademy` doesn't include it
  },
  rules: {
    // You might want to disable this if you are using React 17+ JSX transform
    // 'react/react-in-jsx-scope': 'off',
    // Add or override other React specific rules here if needed
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};