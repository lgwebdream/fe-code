const { templatePackageJson, templateWebpackConfigLib, templateWebpackConfigJson } = require('./config');

const { dependencies, devDependencies } = require('../../dependencies.config');

module.exports = {
  getPackageJson({ ui, main, projectName, isTypescript }) {
    const result = JSON.parse(JSON.stringify(templatePackageJson));
    result.name = projectName;
    if (isTypescript) {
      result.devDependencies['ts-loader'] = devDependencies['ts-loader'];
      result.devDependencies.typescript = devDependencies.typescript;
    }
    if (main === 'react') {
      result.dependencies.react = dependencies.react;
      result.dependencies['react-dom'] = dependencies['react-dom'];
    } else if (main === 'vue') {
      result.dependencies.vue = dependencies.vue;
      result.dependencies['vue-loader'] = dependencies['vue-loader'];
    }
    if (ui === 'antd') {
      result.dependencies.antd = dependencies.antd;
    } else if (ui === 'element') {
      result.dependencies['element-ui'] = dependencies['element-ui'];
    }
    return result;
  },

  getWebpackConfigLib({ ui, main, isTypescript }) {
    const result = JSON.parse(JSON.stringify(templateWebpackConfigLib));
    if (main === 'vue') {
      result.concat('const VueLoaderPlugin = require(\'vue-loader/lib/plugin\');');
    }
    if (isTypescript) {
      // 暂时不添加逻辑啊
    }
  },

  getWebpackConfigJSON({ ui, main, isTypescript }) {
    const result = JSON.parse(JSON.stringify(templateWebpackConfigJson));
    result.plugins = [];
    result.module = {
      rules: []
    };
    result.resolve = {
      extensions: [
        '.js',
      ]
    };

    if (main === 'vue') {
      result.plugins.push('new VueLoaderPlugin()');
      result.resolve.extensions.push('.vue');
    }
    if (isTypescript) {
      result.entry = './src/index.ts';
      result.module.rules.push({
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [
            /\.vue$/
          ]
        }
      })
    }
    if (ui === 'antd') {
      console.log('需要补充逻辑！')
    } else if (ui === 'element') {
      console.log('需要补充逻辑！')
    }
    return result;
  }
};
