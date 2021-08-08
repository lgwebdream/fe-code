const { templatePackageJson, templateWebpackConfig } = require('./config');

const { dependencies, devDependencies } = require('../../dependencies.config');

module.exports = {
  getPackageJson({ ui, main, projectName, isTypescript, isSass, isLess }) {
    const result = JSON.parse(JSON.stringify(templatePackageJson));
    result.name = projectName;

    if (main === 'react') {
      if (isTypescript) {
        result.devDependencies['@types/react'] =
          devDependencies['@types/react'];
        result.devDependencies['@types/react-dom'] =
          devDependencies['@types/react-dom'];
      }
      result.dependencies.react = dependencies.react;
      result.dependencies['react-dom'] = dependencies['react-dom'];
    } else if (main === 'vue') {
      result.dependencies.vue = dependencies.vue;
      result.devDependencies['vue-loader'] = devDependencies['vue-loader'];
      result.devDependencies['vue-template-compiler'] =
        devDependencies['vue-template-compiler'];
    } else {
      console.log('没有选择任何框架，webpack不需要做任何处理！');
    }

    if (isTypescript) {
      result.devDependencies.typescript = devDependencies.typescript;
      result.devDependencies['ts-loader'] = devDependencies['ts-loader'];
    }

    if (isSass) {
      result.devDependencies['sass-loader'] = devDependencies['sass-loader'];
      result.devDependencies['node-sass'] = devDependencies['node-sass'];
    }

    if (isLess) {
      result.devDependencies.less = devDependencies.less;
      result.devDependencies['less-loader'] = devDependencies['less-loader'];
    }

    if (ui === 'antd') {
      result.dependencies.antd = dependencies.antd;
    }

    if (ui === 'element') {
      result.dependencies['element-ui'] = dependencies['element-ui'];
    }

    return result;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getWebpackConfigJs({ ui, main, isTypescript, isSass, isLess }) {
    const result = JSON.parse(JSON.stringify(templateWebpackConfig));
    let WebpackConfigTemplate = '';
    let importExportTemplate = '';
    let ModuleRuleConfig = '';
    let ModuleExtensionsConfig = '';
    const vueBaseCssLoaderConfig = `{
        test: /\\.css$/,
        use: ['vue-style-loader', 'css-loader'],
        exclude: /\\.module\\.css$/,
      },
      {
        test: /\\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\\.module\\.css$/,
      }`;

    const vueSassLoaderConfig = `${vueBaseCssLoaderConfig},{
        test: /\\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
        ]
      }`;

    const vuelessLoaderConfig = `${vueBaseCssLoaderConfig},{
        test: /\\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader',
        ]
      }`;

    const vueBaseLoaderConfig = `{
        test: /\\.vue$/,
        loader: 'vue-loader',
      }, ${
        isSass
          ? vueSassLoaderConfig
          : isLess
          ? vuelessLoaderConfig
          : vueBaseCssLoaderConfig
      }`;

    const devServerConfig =
      'devServer: {\n    hot: true,\n    quiet: true,\n    port: 3000,\n  }';

    if (main === 'vue') {
      if (isTypescript) {
        ModuleRuleConfig = `rules: [
          ${vueBaseLoaderConfig},
        {
          test: /\\.ts(x)?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\\.vue$/],
          },
        },
      ]`;
      } else {
        ModuleRuleConfig = `rules: [
          ${vueBaseLoaderConfig},
        ]`;
      }

      ModuleExtensionsConfig = `extensions: ${
        isTypescript ? "['.js', '.vue', '.tsx', '.ts']" : "['.js', '.vue']"
      }`;

      result.plugins = {
        ...result.plugins,
        VueLoaderPlugin: 'vue-loader/lib/plugin',
      };
      const pluginArr = result.plugins;
      // eslint-disable-next-line guard-for-in
      for (const key in pluginArr) {
        importExportTemplate += `const ${key} = require('${pluginArr[key]}');\n`;
      }
      WebpackConfigTemplate = `${importExportTemplate}
const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  ${devServerConfig},
  module: {
    ${ModuleRuleConfig}
  },
  resolve: {
    ${ModuleExtensionsConfig}
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
    }),
  ],
};

module.exports = config;
`;
    } else if (main === 'react') {
      const reactCssLoaderConfig = `{
          test: /\\.css$/,
          use: ['style-loader', 'css-loader'],
        }, `;

      const reactSassLoaderConfig = `{
          test: /\\.css$/,
          use: ['style-loader', 'css-loader'],
        }, {
        test: /\\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },`;

      const reactlessLoaderConfig = `{
          test: /\\.css$/,
          use: ['style-loader', 'css-loader'],
        }, {
        test: /\\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },`;

      const reactBaseLoaderConfig = `{
            test: /\\.(js|jsx)$/,
            use: 'babel-loader',
            exclude: /node_modules/
          },
          ${
            isSass
              ? reactSassLoaderConfig
              : isLess
              ? reactlessLoaderConfig
              : reactCssLoaderConfig
          }`;

      const reactTypescriptLoaderConfig = `{
            test: /\\.ts(x)?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
          },`;

      if (isTypescript) {
        ModuleRuleConfig = `rules: [
         ${reactBaseLoaderConfig}
         ${reactTypescriptLoaderConfig}
        ]`;
      } else {
        ModuleRuleConfig = `rules: [
          ${reactBaseLoaderConfig}
        ]`;
      }

      ModuleExtensionsConfig = `extensions: ${
        isTypescript ? "['.js','.jsx','.tsx','.ts']" : "['.js','.jsx']"
      }`;

      const pluginArr = result.plugins;
      // eslint-disable-next-line guard-for-in
      for (const key in pluginArr) {
        importExportTemplate += `const ${key} = require('${pluginArr[key]}');\n`;
      }
      WebpackConfigTemplate = `${importExportTemplate}
const config = {
  entry: ${isTypescript ? "'./src/index.tsx'" : "'./src/index.jsx'"},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  ${devServerConfig},
  module: {
    ${ModuleRuleConfig}
  },
  resolve: {
    ${ModuleExtensionsConfig}
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
    }),
  ],
};

module.exports = config;
`;
    } else {
      const pluginArr = result.plugins;
      // eslint-disable-next-line guard-for-in
      for (const key in pluginArr) {
        importExportTemplate += `const ${key} = require('${pluginArr[key]}');\n`;
      }
      WebpackConfigTemplate = `${importExportTemplate}
const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  ${devServerConfig},
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
    }),
  ],
};

module.exports = config;`;
    }
    if (ui === 'antd') {
      result.packageOptions.push('antd');
    }

    if (ui === 'element') {
      result.packageOptions.push('element-ui');
    }

    return WebpackConfigTemplate;
  },
};
