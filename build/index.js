const { red } = require('chalk');
const { join } = require('path');
const {
  outputFileSync,
  writeJsonSync,
  removeSync,
  ensureDirSync,
} = require('fs-extra');
const getIgnore = require('./template/ignore');
const getReadMe = require('./template/readme');

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

  // init
  removeSync($resolveRoot);
  ensureDirSync($resolveRoot);

  // process src template & other configuration
  // todo: remove duplicate src template
  runner({
    ...config,
    $featureChecks,
    $resolveRoot,
  });

  // generate ignore files
  const ignore = getIgnore();
  outputFileSync(join($resolveRoot, ignore.file), ignore.text);

  // generate readme.md
  const readme = getReadMe({ projectName, buildTool, main: mainFramework });
  outputFileSync(join($resolveRoot, readme.file), readme.text);

  // generate TsConfig files
  if (isTypescript) {
    const tsConfig = getTsConfig({
      main: mainFramework,
      includePath: templatePath,
      buildTool,
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
