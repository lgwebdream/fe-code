const { templatePackageJson, templateSnowpackConfig } = require('./config');
const { dependencies, devDependencies } = require('../../dependencies.config');
const { mergeBasicDependencies } = require('../utils');

module.exports = {
  getPackageJson({
    ui,
    main,
    projectName,
    isTypescript,
    isSass,
    isLess,
    isLint,
    isPrettier,
  }) {
    const result = JSON.parse(JSON.stringify(templatePackageJson));

    if (isTypescript) {
      result.devDependencies['@snowpack/plugin-typescript'] =
        devDependencies['@snowpack/plugin-typescript'];
    }
    if (isSass) {
      result.devDependencies['@snowpack/plugin-sass'] =
        devDependencies['@snowpack/plugin-sass'];
    }
    if (isLess) {
      result.devDependencies['snowpack-plugin-less'] =
        devDependencies['snowpack-plugin-less'];
    }
    if (main === 'vue') {
      result.dependencies['@morgul/snowpack-plugin-vue2'] =
        dependencies['@morgul/snowpack-plugin-vue2'];
    }

    return mergeBasicDependencies(result, {
      isLint,
      isPrettier,
      projectName,
      ui,
      main,
      isTypescript,
    });
  },

  getSnowpackConfigJson({ ui, main, isTypescript, isSass, isLess }) {
    const result = JSON.parse(JSON.stringify(templateSnowpackConfig));

    if (main === 'vue') {
      result.plugins.push('@morgul/snowpack-plugin-vue2');
    }
    if (isTypescript) {
      result.plugins.push('@snowpack/plugin-typescript');
    }
    if (ui === 'antd') {
      result.packageOptions.push('antd');
    } else if (ui === 'element') {
      result.packageOptions.push('element-ui');
    }
    if (isSass) {
      result.plugins.push('@snowpack/plugin-sass');
    }
    if (isLess) {
      result.plugins.push('snowpack-plugin-less');
    }
    return result;
  },
};
