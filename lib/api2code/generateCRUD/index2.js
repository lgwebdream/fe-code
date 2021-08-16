const getApiSet = require('./getApiSet');
const genServiceCode = require('./genService');
const emitService = require('./emitService');

const generateCrud = async options => {
  const { input, output, jsonType, language } = options;
  const apiSet = await getApiSet(input, jsonType);
  const codeConfig = await genServiceCode(apiSet.apis, language);
  emitService(codeConfig, output);
};

module.exports = generateCrud;
