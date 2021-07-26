const { red } = require('chalk');

const rootPath = process.cwd();
const { join: pathJoin } = require('path');

const [, , inputConfigPath] = process.argv;

try {
  const config = require(inputConfigPath);
  const { buildTool, projectName, root } = config;
  const runner = require(pathJoin(__dirname, buildTool));
  config.$resolveRoot = pathJoin(rootPath, root, projectName);
  runner(config);
} catch (e) {
  console.info(red(e));
}
