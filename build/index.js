const defaultConfigPath = './config';
const defaultOutput = './dist';
const { red } = require('chalk');

const rootPath = process.cwd();
const { join: pathJoin } = require('path');

const [, , inputConfigPath = defaultConfigPath, outputPath = defaultOutput] =
  process.argv;

try {
  const config = require(pathJoin(rootPath, inputConfigPath));
  const runner = require(pathJoin(__dirname, `./${config.build}`));
  runner(config, pathJoin(rootPath, outputPath));
} catch (e) {
  console.info(red(e));
}
