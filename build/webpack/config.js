const { devDependencies } = require('../../dependencies.config');

module.exports = {
  templatePackageJson: {
    name: '',
    version: '1.0.0',
    description: '',
    main: 'index.js',
    keywords: [],
    author: '',
    license: 'ISC',
    scripts: {
      clean: 'rm dist/bundle.js',
      dev: 'webpack serve --mode development',
      build: 'webpack --mode production',
    },
    dependencies: {},
    devDependencies: {
      webpack: devDependencies.webpack,
      'webpack-cli': devDependencies['webpack-cli'],
      'html-webpack-plugin': devDependencies['html-webpack-plugin'],
      'webpack-dev-server': devDependencies['webpack-dev-server'],
      'css-loader': devDependencies['css-loader'],
      'style-loader': devDependencies['style-loader'],
      'babel-loader': '^8.2.2',
      '@babel/core': '^7.14.8',
      '@babel/preset-env': '^7.14.8',
    },
  },
  templateWebpackConfig: {
    plugins: {
      path: 'path',
      HtmlWebpackPlugin: 'html-webpack-plugin',
    },
    packageOptions: [],
  },
  PACKAGE_JSON: 'package.json',
  WEBPACK_CONFIG_JS: 'webpack.config.js',
};
