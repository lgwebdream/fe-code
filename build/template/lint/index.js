const lint = {
  rules: {},
  env: {
    es6: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: ['eslint:recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  plugins: [],
};
module.exports = ({ main, isPrettier, isLint }) => {
  if (!isLint) {
    return null;
  }
  if (main === 'react') {
    lint.plugins.push('react');
    lint.parserOptions.ecmaFeatures = {
      jsx: true,
    };
  }
  if (isPrettier) {
    lint.extends.push('plugin:prettier/recommended');
  }
  return {
    file: '.eslintrc.json',
    text: JSON.stringify(lint),
  };
};
