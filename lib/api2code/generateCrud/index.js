const getApiSet = require('./getApiSet');
const genServiceCode = require('./genService');
const emitService = require('./emitService');
const { formatCode } = require('../../../utils');

const generateCrud = async options => {
  const { input, output, jsonType, language } = options;
  const apiSet = await getApiSet(input, jsonType);
  const codeConfig = await genServiceCode(apiSet.apis, language);
  const filePaths = await emitService(codeConfig, output);
  Promise.all(filePaths).then(paths => {
    paths.forEach(path => formatCode(path));
  });
};

module.exports = generateCrud;
