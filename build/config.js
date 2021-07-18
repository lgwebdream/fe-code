module.exports.custom = {
  main: 'vue', // react
  build: 'snowpack',
  ui: '',
  test: 'jest',
  transpiler: ['typescript'],
  style: ['sass', 'postcss', 'less'],
  lint: ['eslint', 'prettier'],
  node: '',
  output: './dist',
};

module.exports.supports = {
  main: ['react', 'vue'],
  build: ['snowpack', 'webpack', 'vite'],
};
