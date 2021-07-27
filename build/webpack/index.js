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

  // main:react
  const resolveTemplatePath = join(root, templatePath);

  // todo remove this condition when vue/none framework done
  if (main === 'react') {
    // generate index.html
    const html = getIndexHtml({ projectName });
    outputFileSync(join(resolveTemplatePath, html.file), html.text);

    // generate index.js/jsx
    const js = getIndexJs({ ui });
    outputFileSync(join(resolveTemplatePath, js.file), js.text);

    // generate App.js/jsx
    const appObj = getApp({ ui });
    outputFileSync(join(resolveTemplatePath, appObj.file), appObj.text);

    // copy common files
    copySync(getCommonTemplate(main), root);

    // generate package.json
    writeJsonSync(join(root, 'package.json'), getPackageJson({ ui, main }), {
      spaces: 2,
    });

    // generate snowpack.config.json
    writeJsonSync(
      join(root, 'webpack.config.js'),
      getWebpackConfigJson({ ui }),
      {
        spaces: 2,
      },
    );
  } else {
    // main:vue/none
    copySync(getInitTemplate(main, ui), root);
    // copy common files
    copySync(getCommonTemplate(main), root);

    // change package.json name
    setPackageProps(join(root, 'package.json'), {
      name: projectName,
    });
  }
  // add overview info to readme.md
  addReadMe(join(root, 'README.md'), projectName);
};

module.exports = config => {
  init(config.$resolveRoot);
  process(config);
};

