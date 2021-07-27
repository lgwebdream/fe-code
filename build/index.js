const { red } = require('chalk');
const { join } = require('path');
const { transformArr2TrueObj } = require('../utils');

const rootPath = process.cwd();

const [, , inputConfigPath] = process.argv;

try {
  const config = require(inputConfigPath);
  const { buildTool, projectName, root, featureList } = config;
  const runner = require(join(__dirname, buildTool));

  runner({
    ...config,
    $resolveRoot: join(rootPath, root, projectName),
    $featureChecks: transformArr2TrueObj(featureList),
  });
} catch (e) {
  console.info(red(e));
}
