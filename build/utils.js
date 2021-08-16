const {
  dependencies: dependenciesConfig,
  devDependencies: devDependenciesConfig,
} = require('../dependencies.config');
const reactSrcTemplate = require('./template/react17');
const vue2SrcTemplate = require('./template/vue2');
const vue3SrcTemplate = require('./template/vue3');
const emptySrcTemplate = require('./template/empty');
const getStyles = require('./template/style');

const getBasicDependenciesConfig = ({
  projectName,
  ui,
  main,
  isTypescript,
  isLint,
  isPrettier,
}) => {
  const dependencies = {};
  const devDependencies = {};
  if (main === 'react') {
    dependencies.react = dependenciesConfig.react;
    dependencies['react-dom'] = dependenciesConfig['react-dom'];
    if (isTypescript) {
      devDependencies.typescript = devDependenciesConfig.typescript;
      devDependencies['@types/react-dom'] =
        devDependenciesConfig['@types/react-dom'];
      devDependencies['@types/react'] = devDependenciesConfig['@types/react'];
    }
  } else if (main === 'vue') {
    dependencies.vue = dependenciesConfig.vue;
  }
  if (ui === 'antd') {
    dependencies.antd = dependenciesConfig.antd;
  } else if (ui === 'element') {
    dependencies['element-ui'] = dependenciesConfig['element-ui'];
  }
  if (isLint) {
    devDependencies.eslint = devDependenciesConfig.eslint;
    if (main === 'react') {
      devDependencies['eslint-plugin-react'] =
        devDependenciesConfig['eslint-plugin-react'];
    }
    if (isPrettier) {
      devDependencies['eslint-config-prettier'] =
        devDependenciesConfig['eslint-config-prettier'];
      devDependencies['eslint-plugin-prettier'] =
        devDependenciesConfig['eslint-plugin-prettier'];
    }
  }

  if (isPrettier) {
    devDependencies.prettier = devDependenciesConfig.prettier;
  }
  return {
    dependencies,
    devDependencies,
    name: projectName,
  };
};

module.exports.mergeBasicDependencies = (config, props) => {
  const basicConfig = getBasicDependenciesConfig(props);
  for (const item in basicConfig) {
    if (basicConfig.hasOwnProperty(item)) {
      const value = basicConfig[item];
      if (typeof value === 'object' && value) {
        config[item] = { ...config[item], ...basicConfig[item] };
      } else {
        config[item] = value;
      }
    }
  }
  return config;
};

module.exports.getSrcTemplate = ({
  ui,
  main,
  projectName,
  buildTool,
  isTypescript,
  isSass,
  isLess,
}) => {
  const srcFilesMap = {
    vue2: vue2SrcTemplate,
    vue3: vue3SrcTemplate,
    react: reactSrcTemplate,
  };
  const scripts = (srcFilesMap[main] || emptySrcTemplate)({
    ui,
    main,
    projectName,
    buildTool,
    isTypescript,
    isSass,
    isLess,
  });
  const styles = getStyles({ isLess, isSass });
  return [...scripts, ...styles];
};
