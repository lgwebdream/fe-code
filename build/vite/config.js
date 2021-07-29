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
      start: 'vite dev',
      build: 'vite build',
    },
    dependencies: {},
    devDependencies: {
      vite: devDependencies.vite,
    },
  },
  templateViteConfig: {
    plugins: [
       (devDependencies.vite)()
    ]
  },
};
