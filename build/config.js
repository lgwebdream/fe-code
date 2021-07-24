module.exports = {
  main: 'vue', // react/vue/none
  // mainVersion: '17', // react: 16/17, vue: 2/3
  build: 'snowpack', // webpack/vite/snowpack; rollup(for feature)
  ui: '', // antd/element/bootstrap/material
  // test: 'jest', // chai/mocha
  transpiler: ['typescript'],
  style: ['sass', 'postcss', 'less'],
  // lint: ['eslint', 'prettier'],
  // node: '10',
  outputPath: '../dist',
  projectName: 'demo',
  // plugins: [],
};
