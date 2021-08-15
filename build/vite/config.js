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
      dev: 'vite',
      build: 'vite build',
    },
    dependencies: {},
    devDependencies: {
      vite: devDependencies.vite,
    },
  },
  templateViteConfig: {
    plugins: {},
    packageOptions: [],
  },
  PACKAGE_JSON: 'package.json',
  VITE_CONFIG_JS: 'vite.config.js',
};
