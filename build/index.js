const { red } = require('chalk');
const { join } = require('path');
const { outputFileSync, writeJsonSync } = require('fs-extra');
const { transformArr2TrueObj } = require('../utils');
const { app: getTsConfig } = require('./template/tsconfig');

const rootPath = process.cwd();

const [, , inputConfigPath] = process.argv;

try {
  const config = require(inputConfigPath);
  const {
    buildTool,
    projectName,
    root,
    featureList,
    mainFramework,
    templatePath,
  } = config;
  const runner = require(join(__dirname, buildTool));
  const $featureChecks = transformArr2TrueObj(featureList);
  const { typescript: isTypescript } = $featureChecks;
  const $resolveRoot = join(rootPath, root, projectName);
  runner({
    ...config,
    $featureChecks,
    $resolveRoot,
  });

  // generate TsConfig files
  if (isTypescript) {
    const tsConfig = getTsConfig({
      main: mainFramework,
      includePath: templatePath,
    });
    tsConfig.forEach(({ file, text }) => {
      if (typeof text === 'object') {
        writeJsonSync(join($resolveRoot, file), text, {
          spaces: 2,
        });
      } else {
        outputFileSync(join($resolveRoot, file), text);
      }
    });
  }
} catch (e) {
  console.info(red(e));
}
