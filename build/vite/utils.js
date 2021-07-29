const { templatePackageJson, templateViteConfig } = require('./config');

const { dependencies, devDependencies } = require('../../dependencies.config');

module.exports = {
  getPackageJson({ ui, main, projectName }) {
    const result = JSON.parse(JSON.stringify(templatePackageJson));
    result.name = projectName;
    if (main === 'react') {
      result.dependencies.react = dependencies.react;
      result.dependencies['react-dom'] = dependencies['react-dom'];
      result.devDependencies['vite-plugin-html'] = devDependencies['vite-plugin-html'];
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
    let ViteConfigTemplate = '';
    let exportTemplateArr = [];
    let importExportTemplate  = '';
    if (main === 'vue') {
      result.plugins = {
          createVuePlugin: 'vite-plugin-vue2'
      };
      const pluginArr = result.plugins;
      for(let key in pluginArr) {
        importExportTemplate += `import {${key}} from '${pluginArr[key]}';`;
        exportTemplateArr.push(`${key}()`);
      }
      ViteConfigTemplate = `${importExportTemplate}
      module.exports = {
        root : './src',
        plugins: [${exportTemplateArr}],
      };`
    } else if(main === 'react'){
        result.plugins = {
            reactRefresh: '@vitejs/plugin-react-refresh',
            vitePluginHtml: 'vite-plugin-html',
        };
        const pluginArr = result.plugins;
        for(let key in pluginArr) {
          importExportTemplate += `import ${key} from '${pluginArr[key]}';`;
          exportTemplateArr.push(`${key}()`);
        }
        ViteConfigTemplate = `import { defineConfig } from 'vite';
        ${importExportTemplate}
        export default defineConfig({
          root: './src',
          plugins: [ 
            reactRefresh(), 
            vitePluginHtml({
              minify: true,
              inject: {
                  injectData: {
                      injectScript: '<script type="module" src="/index.jsx"></script>', // publicDir作为根目录
                  },
              },
            }),
          ]
        });`
    }
    if (ui === 'antd') {
      result.packageOptions.push('antd');
    } else if (ui === 'element') {
      result.packageOptions.push('element-ui');
    }
    return ViteConfigTemplate;
  },
};
