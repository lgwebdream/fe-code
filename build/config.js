const { join } = require('path');

module.exports.custom = {
  main: 'vue',
  build: 'snowpack',
  ui: '', // todo
  test: 'jest', // todo
  transpiler: ['typescript'], // todo
  style: ['sass', 'postcss', 'less'], // todo
  lint: ['eslint', 'prettier'], // todo
  node: '', // todo
  outputPath: join(__dirname, 'dist'),
  projectName: 'demo', // support for snowpack now
};

module.exports.supports = {
  main: ['react', 'vue'],
  build: ['snowpack', 'webpack', 'vite'],
};
