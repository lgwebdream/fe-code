const { templatePackageJson, templateWebpackConfig } = require('./config');

const { dependencies, devDependencies } = require('../../dependencies.config');
module.exports = {
  getPackageJson({ ui, main, projectName, isTypescript, isSass, isLess }) {
    const result = JSON.parse(JSON.stringify(templatePackageJson));
    result.name = projectName;
    if (main === 'react') {
      if (isTypescript) {
        result.devDependencies.typescript = devDependencies.typescript;
        result.devDependencies['ts-loader'] = devDependencies['ts-loader'];
        result.devDependencies['@hot-loader/react-dom'] = devDependencies['@hot-loader/react-dom'];
        result.devDependencies['@types/react'] = devDependencies['@types/react'];
        result.devDependencies['@types/react-dom'] = devDependencies['@types/react-dom'];
      }
      if (isSass) {
        result.devDependencies['css-loader'] = devDependencies['css-loader'];
        result.devDependencies['sass-loader'] = devDependencies['sass-loader'];
        result.devDependencies['node-sass'] = devDependencies['node-sass'];
        result.devDependencies['style-loader'] = devDependencies['style-loader'];
      }
      if (isLess) {
        result.devDependencies['css-loader'] = devDependencies['css-loader'];
        result.devDependencies['less-loader'] = devDependencies['less-loader'];
        result.devDependencies['less'] = devDependencies['less'];
        result.devDependencies['style-loader'] = devDependencies['style-loader'];

      }
      result.dependencies.react = dependencies.react;
      result.dependencies['react-dom'] = dependencies['react-dom'];
      result.devDependencies['babel-loader'] = devDependencies['babel-loader'];
      result.devDependencies['@babel/core'] = devDependencies['@babel/core'];
      result.devDependencies['@babel/preset-env'] = devDependencies['@babel/preset-env'];
      result.devDependencies['@hot-loader/react-dom'] = devDependencies['@hot-loader/react-dom'];
      result.devDependencies['@babel/preset-react'] = devDependencies['@babel/preset-react'];
      result.devDependencies['webpack-dev-server'] = devDependencies['webpack-dev-server'];
    } else if (main === 'vue') {
      if (isTypescript) {
        result.devDependencies.typescript = devDependencies.typescript;
        result.devDependencies['ts-loader'] = devDependencies['ts-loader'];
      }
      result.dependencies.vue = dependencies.vue;
      result.devDependencies['vue-loader'] = devDependencies['vue-loader'];
      result.devDependencies['vue-template-compiler'] = devDependencies['vue-template-compiler'];
      result.devDependencies['babel-loader'] = devDependencies['babel-loader'];
      result.devDependencies['@babel/core'] = devDependencies['@babel/core'];
      result.devDependencies['@babel/preset-env'] = devDependencies['@babel/preset-env'];
    } else {
      console.log('没有选择任何框架，webpack不需要做任何处理！')
    }
    if (ui === 'antd') {
      result.dependencies.antd = dependencies.antd;
    } else if (ui === 'element') {
      result.dependencies['element-ui'] = dependencies['element-ui'];
    }
    return result;
  },

  getViteConfigJs({ ui, main , isTypescript, isSass, isLess}) {
    const result = JSON.parse(JSON.stringify(templateWebpackConfig));
    result.plugins = [];
    let ViteConfigTemplate = '';
    let exportTemplateArr = [];
    let importExportTemplate  = '';
    let scriptTemplate = '';
    if (main === 'vue') {
      result.plugins = {
          createVuePlugin: 'vite-plugin-vue2'
      };
      const pluginArr = result.plugins;
      for(let key in pluginArr) {
        importExportTemplate += `import {${key}} from '${pluginArr[key]}';
        `;
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
        if(isTypescript) {
          scriptTemplate = '<script type="module" src="/index.tsx"></script>'
        } else {
          scriptTemplate = '<script type="module" src="/index.jsx"></script>'
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
          injectScript: '${scriptTemplate}', // publicDir作为根目录
        },
      },
    }),
  ]
});`
    } else {
      scriptTemplate = '<script type="module" src="/App.js"></script>'
      ViteConfigTemplate = `import { defineConfig } from 'vite';
  import vitePluginHtml from 'vite-plugin-html';
${importExportTemplate}
export default defineConfig({
  root: './src',
  plugins: [
    vitePluginHtml({
      minify: true,
      inject: {
        injectData: {
          injectScript: '${scriptTemplate}', // publicDir作为根目录
        },
      },
    }),]
});`
    }
    if (ui === 'antd') {
      result.packageOptions.push('antd');
    } else if (ui === 'element') {
      result.packageOptions.push('element-ui');
    }
    return ViteConfigTemplate
  },
};
