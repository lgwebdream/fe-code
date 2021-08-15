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
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-prototype-builtins': 'off',
    'no-restricted-syntax': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTernary: true },
    ],
    'import/no-unresolved': [
      2,
      {
        ignore: [
          'vue',
          'react',
          '@crud',
          'react-dom',
          'vite-plugin-vue2',
          'mockjs',
          'umi-request',
        ],
      },
    ],
    'global-require': 'off',
    'import/no-dynamic-require': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-shadow': 'off',
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'import/prefer-default-export': 'off',
    'react/destructuring-assignment': [0, 'always'],
    'import/no-extraneous-dependencies': 0,
    'no-param-reassign': 0,
    'no-nested-ternary': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.vue', '.tsx', '.ts'],
      },
    },
  },
};
