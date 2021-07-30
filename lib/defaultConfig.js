const customConfig = {
  projectName: 'empty-project',
  buildTool: 'snowpack', // webpack/vite/snowpack; rollup(for feature)
  mainFramework: 'react',
  uiFramework: 'none',
  featureList: ['unit Testing'],
  root: '',
  // mainFrameworkVersion: '17', // react: 16/17, vue: 2/3
  // test: 'jest', // chai/mocha
  // style: ['sass', 'postcss', 'less'],
  // lint: ['eslint', 'prettier'],
  // node: '10',
  // plugins: [],
};
const CONFIG_NAME = '.fecoderc.json';
const initConfig = {
  request: {
    url: 'http://localhost:3000',
    headers: {},
  },
  language: 'zh-CN',
  templatePath: 'src',
};
const defaultConfig = {
  ...initConfig,
  ...customConfig,
};
module.exports.CONFIG_NAME = CONFIG_NAME;
module.exports.initConfig = initConfig;
module.exports.defaultConfig = defaultConfig;
