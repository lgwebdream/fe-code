const { templatePackageJson, templateViteConfig } = require('./config');

const { dependencies, devDependencies } = require('../../dependencies.config');

module.exports = {
  getPackageJson({ ui, main, projectName }) {
    const result = JSON.parse(JSON.stringify(templatePackageJson));
    result.name = projectName;
    if (main === 'react') {
      result.dependencies.react = dependencies.react;
      result.dependencies['@vitejs/plugin-react-refresh'] = dependencies['@vitejs/plugin-react-refresh'];
    } else if (main === 'vue') {
      result.devDependencies['vite-plugin-vue2'] = devDependencies['vite-plugin-vue2'];
      result.devDependencies['vue-template-compiler'] = devDependencies['vue-template-compiler'];
      result.dependencies.vue = dependencies.vue;
      console.log('result.dependencies', result.dependencies);
    }
    if (ui === 'antd') {
      result.dependencies.antd = dependencies.antd;
    } else if (ui === 'element') {
      result.dependencies['element-ui'] = dependencies['element-ui'];
    }
    return result;
  },

  getViteConfigJs({ ui, main }) {
    const result = JSON.parse(JSON.stringify(templateViteConfig));
    result.plugins = [];
    if (main === 'vue') {
      result.plugins = {
          createVuePlugin: 'vite-plugin-vue2'
      };
    }
    if (ui === 'antd') {
      result.packageOptions.push('antd');
    } else if (ui === 'element') {
      result.packageOptions.push('element-ui');
    }
    const pluginArr = result.plugins;
    let importExportTemplate  = '';
    let exportTemplate = [];
    for(let key in pluginArr) {
      importExportTemplate += `import {${key}} from '${pluginArr[key]}';`;
      exportTemplate.push(`${key}()`);
    }
    // const ViteConfigTemplate = `import { defineConfig } from 'vite';
    // ${importExportTemplate}
    //   export default defineConfig(${JSON.stringify(exportTemplate)});
    // `
    const ViteConfigTemplate = `${importExportTemplate}
    module.exports = {
      root : './src',
      plugins: [${exportTemplate}],
    };`
   
    return ViteConfigTemplate;
  },
};
