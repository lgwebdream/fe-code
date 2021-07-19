const { join } = require('path');

module.exports.custom = {
  main: 'vue', // react/vue
  mainVersion: '2', // react: 16/17, vue: 2/3
  build: 'snowpack', // webpack/vite/snowpack; rollup(for feature)
  ui: 'element', // antd/element/bootstrap/material
  test: 'jest', // chai/mocha
  transpiler: ['typescript'],
  style: ['sass', 'postcss', 'less'],
  lint: ['eslint', 'prettier'],
  node: '10',
  outputPath: join(__dirname, 'dist'),
  projectName: 'demo',
  plugins: [],
};

module.exports.supports = {
  main: ['react', 'vue'],
  build: ['snowpack', 'webpack', 'vite'],
};
