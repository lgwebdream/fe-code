const { copySync, removeSync, ensureDirSync } = require('fs-extra');
const { join } = require('path');

const { getInitTemplate, getCommonTemplate } = require('./utils');
const { setPackageProps, addReadMe } = require('../utils');

const tempPath = join(__dirname, 'temp');

const init = dist => {
  removeSync(dist);
  removeSync(tempPath);
  ensureDirSync(tempPath);
};

const process = config => {
  const { mainFramework: main, uiFramework: ui, projectName } = config;

  // init project to tempPath
  copySync(getInitTemplate(main, ui), tempPath);

  // copy common files to tempPath
  copySync(getCommonTemplate(main), tempPath);

  // change package.json name
  setPackageProps(join(tempPath, 'package.json'), {
    name: projectName,
  });

  // add overview info to readme.md
  addReadMe(join(tempPath, 'README.md'), projectName);
};

const output = dist => {
  copySync(tempPath, dist);
  removeSync(tempPath);
};

module.exports = config => {
  const { $resolveRoot } = config;
  init($resolveRoot);
  process(config);
  output($resolveRoot);
};
