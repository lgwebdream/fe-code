const defaultConfigPath = './config';
const defaultOutput = './dist';

const [, , inputConfigPath = defaultConfigPath, outputPath = defaultOutput] =
  process.argv;

try {
  const config = require(inputConfigPath);
  const runner = require(`./${config.build}`);
  runner(config, outputPath);
} catch (e) {
  console.info(e);
}
