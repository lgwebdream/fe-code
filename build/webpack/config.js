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
      dev: 'webpack --mode development',
      build: 'webpack --mode production',
    },
    dependencies: {},
    devDependencies: {
      "webpack": devDependencies.webpack,
      "webpack-cli": devDependencies["webpack-cli"],
    },
  },
  templateWebpackConfig: {
    plugins: {
      webpack: 'webpack',
      path: 'path',
    },
    packageOptions: [],
  },
  PACKAGE_JSON: 'package.json',
  WEBPACK_CONFIG_JS: 'webpack.config.js',
};
