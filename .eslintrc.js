module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'airbnb-typescript', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    project: './tsconfig.eslint.json',
  },
  rules: {
    'no-console': 'off',
    'no-restricted-syntax': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': [
      'error',
      { allowShortCircuit: true },
    ],
    'react/react-in-jsx-scope': 'off',
  },
  ignorePatterns: [
    '.eslintrc.js',
    'iwr.config.js',
    'examples/react-demo/api/index.js',
  ],
};
