const { resolve, basename } = require('path');
const request = require('../utils/request');
const { removeEmpty, path2CamelCase } = require('../utils');
const emitFile = require('../utils/output2File');
const quicktypeJSON = require('../utils/quicktypeJSON');
const fs = require('fs');
const { logInfo, logError, logSuccess } = require('../utils/log');

// emit the interface definations in Typescript
const outputInterface = (data, name, output) => {
  quicktypeJSON('TypeScript', name, JSON.stringify(data))
    .then(({ lines }) => {
      emitFile(resolve(process.cwd(), output), lines.join('\n'));
      logSuccess('generate interface definations successfully!');
    })
    .catch(logError);
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

  try {
    // check the accessibility
    fs.accessSync(options.input, fs.constants.R_OK);
    logInfo('reading the api json file');

    // read json file
    const apiText = fs.readFileSync(options.input, {encoding:'utf-8'});
    const apiJSON = JSON.parse(apiText);
    const name = basename(options.input)
      .split('.')[0]
      .replace(/^(\w)/g, (all, letter) => letter.toUpperCase());
  
    outputInterface(apiJSON, name, options.output);
  } catch (err) {
    logError(err.message || 'the input file can not be accessed!');
  }
};


const generateInterface = options => {
  return options.input ? fromLocalJson(options) : refromRequest(options);
};

module.exports = generateInterface;
