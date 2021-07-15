const fs = require('promise-fs');
const { resolve } = require('path');
const request = require('../request');
const { removeEmpty } = require('../../utils');
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
      quicktypeJSON('TypeScript', 'JSON', JSON.stringify(data))
        .then(({ lines }) => {
          console.log(lines.join('\n'));
          fs.writeFile(resolve(process.cwd(), options.output), lines.join('\n'))
            .then(res => console.log(res))
            .catch(err => console.error(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.error(err));
};

module.exports = generateInterface;
