const { resolve, basename } = require('path');
const ora = require('ora');
const chalk = require('chalk');
const request = require('../../utils/request');
const { removeEmpty, path2CamelCase } = require('../../utils');
const output2File = require('../../utils/output2File');
const quicktypeJSON = require('../../utils/quicktypeJSON');

const spinner = ora('transforming...');

const outputInterface = (data, name, output) => {
  quicktypeJSON('TypeScript', name, JSON.stringify(data))
    .then(({ lines }) => {
      output2File(resolve(process.cwd(), output), lines.join('\n')).then(() => {
        spinner.stop();
        // eslint-disable-next-line no-console
        console.log(chalk.green('successfully 🎉 🎉 🎉'));
      });
    })
    .catch(err => console.error(err));
};

const fromRequest = options => {
  const babyData = options.body ? require(options.body) : null;
  request(
    removeEmpty({
      method: options.httpMethod,
      url: `${options.url}${options.path}`,
      data: babyData,
    }),
  )
    .then(({ data }) =>
      outputInterface(data, path2CamelCase(options.path), options.output),
    )
    .catch(err => console.error(err));
};

const fromLocalJson = options => {
  const dataJson = require(options.input);
  const name = basename(options.input)
    .split('.')[0]
    .replace(/^(\w)/g, (all, letter) => letter.toUpperCase());
  outputInterface(dataJson, name, options.output);
};

const generateInterface = options => {
  spinner.start();
  // 如果有 -i 则通过本地json生成interface
  if (options.input) {
    fromLocalJson(options);
    return;
  }
  fromRequest(options);
};

module.exports = generateInterface;
