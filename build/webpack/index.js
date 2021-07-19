const { copySync, removeSync, ensureDir } = require('fs-extra');
const { join } = require('path');
const { custom: configCustom } = require('../config');

const {
  main: customMain,
  outputPath: customOutputPath,
  projectName: customProjectName,
} = configCustom;
const { getTemplate } = require('./utils');
const { setPackageProps, addReadMe } = require('../utils');

const tempPath = join(__dirname, 'temp');

const init = () => {
  removeSync(customOutputPath);
  removeSync(tempPath);
  ensureDir(tempPath);
};

const process = () => {
  copySync(getTemplate(customMain), tempPath);

  // change package.json name
  setPackageProps(join(tempPath, 'package.json'), {
    name: customProjectName,
  });

  // add overview info to readme.md
  addReadMe(join(tempPath, 'README.md'), customProjectName);
};

const output = () => {
  copySync(tempPath, customOutputPath);
  removeSync(tempPath);
};

init();
process();
output();
