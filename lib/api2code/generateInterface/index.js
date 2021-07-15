const request = require('../request');
const { removeEmpty } = require('../../utils');

const generateInterface = options => {
  let babydata;
  if (options.body) {
    babydata = require(options.body);
  }
  console.log('Interface', options, babydata);
  request(
    removeEmpty({
      method: options.httpMethod,
      url: `${options.url}${options.path}`,
      data: babydata,
    }),
  )
    .then(({ data }) => console.log(data))
    .catch(err => console.error(err));
};

module.exports = generateInterface;
