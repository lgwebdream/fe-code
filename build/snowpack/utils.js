const { templatePackageJson, templateSnowpackConfig } = require('./config');

const { dependencies, devDependencies } = require('../../dependencies.config');

module.exports = {
  getPackageJson({ ui, main, projectName, isTypescript, isSass, isLess }) {
    const result = JSON.parse(JSON.stringify(templatePackageJson));
    result.name = projectName;
    if (isTypescript) {
      result.devDependencies['@snowpack/plugin-typescript'] =
        devDependencies['@snowpack/plugin-typescript'];
      result.devDependencies.typescript = devDependencies.typescript;
      result.devDependencies['vue-class-component'] =
        devDependencies['vue-class-component'];
      if (main === 'react') {
        result.devDependencies['@types/react-dom'] =
          devDependencies['@types/react-dom'];
      }
    }
    if (isSass) {
      result.devDependencies['@snowpack/plugin-sass'] =
        devDependencies['@snowpack/plugin-sass'];
    }
    if (isLess) {
      result.devDependencies['snowpack-plugin-less'] =
        devDependencies['snowpack-plugin-less'];
    }
    if (main === 'react') {
      result.dependencies.react = dependencies.react;
      result.dependencies['react-dom'] = dependencies['react-dom'];
    } else if (main === 'vue') {
      result.dependencies['@morgul/snowpack-plugin-vue2'] =
        dependencies['@morgul/snowpack-plugin-vue2'];
      result.dependencies.vue = dependencies.vue;
    }
    if (ui === 'antd') {
      result.dependencies.antd = dependencies.antd;
    } else if (ui === 'element') {
      result.dependencies['element-ui'] = dependencies['element-ui'];
    }
    return result;
  },

  getSnowpackConfigJson({ ui, main, isTypescript, isSass, isLess }) {
    const result = JSON.parse(JSON.stringify(templateSnowpackConfig));
    result.plugins = [];
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
