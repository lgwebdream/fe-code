const { templatePackageJson, templateWebpackConfig } = require('./config');

const { devDependencies } = require('../../dependencies.config');
const { mergeBasicDependencies } = require('../utils');

module.exports = {
  getPackageJson({
    isLint,
    isPrettier,
    ui,
    main,
    projectName,
    isTypescript,
    isSass,
    isLess,
  }) {
    const result = JSON.parse(JSON.stringify(templatePackageJson));

    if (main === 'vue') {
      result.devDependencies['vue-loader'] = devDependencies['vue-loader'];
      result.devDependencies['vue-template-compiler'] =
        devDependencies['vue-template-compiler'];
    }

    if (isTypescript) {
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
    return mergeBasicDependencies(result, {
      isLint,
      isPrettier,
      projectName,
      ui,
      main,
      isTypescript,
    });
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getWebpackConfigJs({ ui, main, isTypescript, isSass, isLess }) {
    const result = JSON.parse(JSON.stringify(templateWebpackConfig));
    let WebpackConfigTemplate = '';
    let importExportTemplate = '';
    let ModuleRuleConfig = '';
    let ModuleExtensionsConfig = '';
    let vueBaseCssLoaderConfig = `{
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

    const vueSassLoaderConfig = `{
        test: /\\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
        ]
      }`;

    const vuelessLoaderConfig = `{
        test: /\\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader',
        ]
      }`;

    if (isSass) {
      vueBaseCssLoaderConfig = `${vueBaseCssLoaderConfig},${vueSassLoaderConfig}`;
    }

    if (isLess) {
      vueBaseCssLoaderConfig = `${vueBaseCssLoaderConfig},${vuelessLoaderConfig}`;
    }

    const vueBaseLoaderConfig = `{
        test: /\\.vue$/,
        loader: 'vue-loader',
      }, ${vueBaseCssLoaderConfig}`;

    const devServerConfig =
      'devServer: {\n    hot: true,\n    quiet: false,\n    port: 3000,\n  }';

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
      let reactBaseLoaderConfig = `{
            test: /\\.(js|jsx)$/,
            use: 'babel-loader',
            exclude: /node_modules/
          },{
            test: /\\.css$/,
            use: ['style-loader', 'css-loader'],
          }`;

      const reactSassLoaderConfig = `{
        test: /\\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      }`;

      const reactlessLoaderConfig = `{
        test: /\\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      }`;

      if (isSass) {
        reactBaseLoaderConfig = `${reactBaseLoaderConfig},${reactSassLoaderConfig}`;
      }

      if (isLess) {
        reactBaseLoaderConfig = `${reactBaseLoaderConfig},${reactlessLoaderConfig}`;
      }

      const reactTypescriptLoaderConfig = `{
            test: /\\.ts(x)?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
          }`;

      if (isTypescript) {
        ModuleRuleConfig = `rules: [
         ${reactBaseLoaderConfig},
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
