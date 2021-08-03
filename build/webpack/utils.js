const { templatePackageJson, templateWebpackConfig } = require('./config');

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


  getWebpackConfigJs({ ui, main, isTypescript }) {
    const result = JSON.parse(JSON.stringify(templateWebpackConfig));
    result.plugins = [];
    let WebpackConfigTemplate = '';
    let exportTemplateArr = [];
    let importExportTemplate  = '';
    let scriptTemplate = '';

    if (main === 'vue') {
      result.plugins = {
        ...result.plugins,
        VueLoaderPlugin: 'vue-loader/lib/plugin',
      }
      const pluginArr = result.plugins;
      for(let key in pluginArr) {
        importExportTemplate += `const ${key} = require ('${pluginArr[key]}');\n`;
      }
      WebpackConfigTemplate = `${importExportTemplate}
const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.vue'
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};

module.exports = config;
`
    }else if(main === 'react') {

    }

    return WebpackConfigTemplate;
  },
};
