const { devDependencies } = require('../../dependencies.config');
const path = require('path');

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
      dev: 'webpack --mode development',
      build: 'webpack --mode production',
    },
    dependencies: {},
    devDependencies: {
      "webpack": devDependencies.webpack,
      "webpack-cli": devDependencies["webpack-cli"],
    },
  },
  templateWebpackConfigLib : "const webpack = require('webpack');\n" +
    "const path = require('path');",
  templateWebpackConfigJson: {
    entry: './src/index.js',
    output: {
      path: 'path.resolve(__dirname, \'dist\')',
      filename: 'bundle.js'
    }
  },
  PACKAGE_JSON: 'package.json',
  WEBPACK_CONFIG_JS: 'webpack.config.js',
};
