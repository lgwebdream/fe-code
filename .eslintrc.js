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
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-restricted-syntax': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': [
      'error',
      { allowShortCircuit: true },
    ],
    'global-require': 'off',
    'import/no-dynamic-require': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': "off",
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
  }
};
