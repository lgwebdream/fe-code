const customConfig = {
  projectName: 'empty-project',
  buildTool: 'snowpack', // webpack-backup/vite/snowpack; rollup(for feature)
  mainFramework: {
    name: 'vue',
    version: 2
  },
  uiFramework: 'none',
  featureList: [],
  lint: true,
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
