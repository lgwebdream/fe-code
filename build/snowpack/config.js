const { devDependencies } = require('../../dependencies.config');

module.exports = {
  templatePackageJson: {
    name: 'empty-project',
    version: '1.0.0',
    description: '',
    main: 'index.js',
    keywords: [],
    author: '',
    license: 'ISC',
    scripts: {
      clean: 'rm dist/bundle.js',
      start: 'snowpack dev',
      build: 'snowpack build',
    },
    dependencies: {},
    devDependencies: {
      snowpack: devDependencies.snowpack,
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
};
