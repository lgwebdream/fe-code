module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: ['airbnb-base', 'airbnb-typescript', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    project: './tsconfig.eslint.json'
  },
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-restricted-syntax': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': [
      'error',
      { allowShortCircuit: true }
    ],
    "import/no-unresolved": [2, { "ignore": ["vue", "react", "react-dom", "vite-plugin-vue2", "mockjs", "@crud/CRUD", "umi-request"] }],
    'global-require': 'off',
    'import/no-dynamic-require': 'off',
    'react/react-in-jsx-scope': 'off',
    "no-shadow": "off",
    "react/jsx-props-no-spreading": 'off',
    "@typescript-eslint/no-shadow": ["error"],
    "import/prefer-default-export": 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js','.jsx','.vue','.tsx', '.ts']
      }
    },
  }
};
