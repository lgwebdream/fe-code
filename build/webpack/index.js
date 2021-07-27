const { copySync, removeSync, ensureDirSync, outputFileSync, writeJsonSync } = require('fs-extra');
const { join } = require('path');

const { getInitTemplate, getCommonTemplate, getPackageJson, getWebpackConfigJson } = require('./utils');

const { setPackageProps, addReadMe } = require('../utils');

const {
  indexHtml: getIndexHtml,
  indexJs: getIndexJs,
  app: getApp,
} = require('../template/vue2');

const init = root => {
  removeSync(root);
  ensureDirSync(root);
};

const process = config => {
  const {
    mainFramework: main,
    uiFramework: ui,
    projectName,
    $resolveRoot: root,
    templatePath,
  } = config;

  const resolveTemplatePath = join(root, templatePath);

  if (main === 'vue') {
    // generate index.html
    const html = getIndexHtml({ projectName });
    outputFileSync(join(resolveTemplatePath, html.file), html.text);

    // generate index.js
    const js = getIndexJs({ ui });
    outputFileSync(join(resolveTemplatePath, js.file), js.text);

    // generate App.vue
    const appObj = getApp({ ui });
    outputFileSync(join(resolveTemplatePath, appObj.file), appObj.text);

    // copy common files
    copySync(getCommonTemplate(main), root);

    // generate package.json
    writeJsonSync(join(root, 'package.json'), getPackageJson({ ui, main }), {
      spaces: 2,
    });
  }
};

module.exports = config => {
  init(config.$resolveRoot);
  process(config);
};

