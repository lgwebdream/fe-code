const { resolve } = require('path');
const request = require('../request');
const { removeEmpty, path2CamelCase } = require('../../utils');
const output2File = require('../../utils/output2File');
const quicktypeJSON = require('../../utils/quicktypeJSON');

const generateInterface = options => {
  let babyData;
  if (options.body) {
    babyData = require(options.body);
  }
  console.log('Interface', options, babyData);
  request(
    removeEmpty({
      method: options.httpMethod,
      url: `${options.url}${options.path}`,
      data: babyData,
    }),
  )
    .then(({ data }) => {
      quicktypeJSON(
        'TypeScript',
        path2CamelCase(options.path),
        JSON.stringify(data),
      )
        .then(({ lines }) => {
          console.log(lines.join('\n'));
          output2File(resolve(process.cwd(), options.output), lines.join('\n'));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.error(err));
};

module.exports = generateInterface;
