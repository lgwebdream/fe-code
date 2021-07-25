const defaultConfigPath = './config';
const defaultOutput = '../dist';
const { red } = require('chalk');

const rootPath = process.cwd();
const { join: pathJoin } = require('path');

const [, , inputConfigPath, outputPath] = process.argv;

try {
  const config = inputConfigPath
    ? require(pathJoin(rootPath, inputConfigPath))
    : require(defaultConfigPath);
  const runner = require(pathJoin(__dirname, config.build));
  const dist = outputPath ? pathJoin(rootPath, outputPath) : defaultOutput;
  runner(config, dist);
} catch (e) {
  console.info(red(e));
}
