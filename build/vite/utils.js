const { templatePackageJson, templateViteConfig } = require('./config');
const { mergeBasicDependencies } = require('../utils');

const { dependencies, devDependencies } = require('../../dependencies.config');
// const uglifyjs = require("uglifyjs");
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

    if (main === 'react') {
      if (isSass) {
        result.devDependencies.sass = devDependencies.sass;
      }
      if (isLess) {
        result.devDependencies.less = devDependencies.less;
      }
      result.devDependencies['vite-plugin-html'] =
        devDependencies['vite-plugin-html'];
      result.dependencies['@vitejs/plugin-react-refresh'] =
        dependencies['@vitejs/plugin-react-refresh'];
    } else if (main === 'vue') {
      if (isTypescript) {
        result.devDependencies['@vue/compiler-sfc'] =
          devDependencies['@vue/compiler-sfc'];
        result.devDependencies['vue-tsc'] = devDependencies['vue-tsc'];
      }
      result.devDependencies['vite-plugin-vue2'] =
        devDependencies['vite-plugin-vue2'];
      result.devDependencies['vue-template-compiler'] =
        devDependencies['vue-template-compiler'];
    } else {
      result.devDependencies['vite-plugin-html'] =
        devDependencies['vite-plugin-html'];
    }
    return mergeBasicDependencies(result, {
      projectName,
      ui,
      main,
      isTypescript,
      isLint,
      isPrettier,
    });
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getViteConfigJs({ ui, main, isTypescript, isSass, isLess }) {
    const result = JSON.parse(JSON.stringify(templateViteConfig));
    result.plugins = [];
    let ViteConfigTemplate = '';
    const exportTemplateArr = [];
    let importExportTemplate = '';
    let scriptTemplate = '';
    if (main === 'vue2') {
      result.plugins = {
        createVuePlugin: 'vite-plugin-vue2',
      };
      const pluginArr = result.plugins;
      // eslint-disable-next-line guard-for-in
      for (const key in pluginArr) {
        importExportTemplate += `import {${key}} from '${pluginArr[key]}';
        `;
        exportTemplateArr.push(`${key}()`);
      }
      ViteConfigTemplate = `${importExportTemplate}
      module.exports = {
        root : './src',
        plugins: [${exportTemplateArr}],
      };`;
    } else if (main === 'vue3') {
      result.plugins = {
        vue: '@vitejs/plugin-vue',
      };
      const pluginArr = result.plugins;
      // eslint-disable-next-line guard-for-in
      for (const key in pluginArr) {
        importExportTemplate += `import {${key}} from '${pluginArr[key]}';
        `;
        exportTemplateArr.push(`${key}()`);
      }
      ViteConfigTemplate = `import { defineConfig } from 'vite';
      ${importExportTemplate}
export default defineConfig({
  root: './src',
  plugins: [vue()]
})`;
    } else if (main === 'react') {
      result.plugins = {
        reactRefresh: '@vitejs/plugin-react-refresh',
        vitePluginHtml: 'vite-plugin-html',
      };
      const pluginArr = result.plugins;
      // eslint-disable-next-line guard-for-in
      for (const key in pluginArr) {
        importExportTemplate += `import ${key} from '${pluginArr[key]}';`;
        exportTemplateArr.push(`${key}()`);
      }
      if (isTypescript) {
        scriptTemplate = '<script type="module" src="/index.tsx"></script>';
      } else {
        scriptTemplate = '<script type="module" src="/index.jsx"></script>';
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
});`;
    } else {
      scriptTemplate = '<script type="module" src="/App.js"></script>';
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
});`;
    }
    if (ui === 'antd') {
      result.packageOptions.push('antd');
    } else if (ui === 'element') {
      result.packageOptions.push('element-ui');
    }
    return ViteConfigTemplate;
  },
};
