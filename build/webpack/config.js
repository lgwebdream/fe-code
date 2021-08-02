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
      dev: 'webpack-backup --mode development',
      build: 'webpack-backup --mode production',
    },
    dependencies: {},
    devDependencies: {
      "webpack": devDependencies.webpack,
      "webpack-cli": devDependencies["webpack-cli"],
    },
  },
  templateSnowpackConfig: {
    mount: {
      dist: '/',
      src: '/',
    },
    plugins: [],
    packageOptions: [],
  },
  PACKAGE_JSON: 'package.json',
  SNOWPACK_CONFIG_JSON: 'snowpack.config.json',
};
