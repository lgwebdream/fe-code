const { join } = require('path');

module.exports = {
  noMainTemplatePath: join(__dirname, 'template'),
  react17CommonTemplatePath: join(__dirname, 'template-react17/common'),
  vue2NoneTemplatePath: join(__dirname, 'template-vue2/none'),
  vue2ElementTemplatePath: join(__dirname, 'template-vue2/element'),
  vue2CommonTemplatePath: join(__dirname, 'template-vue2/common'),
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
      snowpack: '^3.8.1',
    },
  },
  templateSnowpackConfig: {
    mount: {
      dist: '/',
      src: '/',
    },
  },
};
