const getApiSet = require('./getApiSet');
const genServiceCode = require('./genService');
const emitService = require('./emitService');
const { formatCode } = require('../../../utils');
const spinner = require('./spinner');

const generateCrud = async options => {
  const { input, output, jsonType, language } = options;
  spinner.getApiSet();
  const apiSet = await getApiSet(input, jsonType);

  spinner.genCode();
  const codeConfig = await genServiceCode(apiSet.apis, language);

  spinner.emitCode();
  const servicesDir = await emitService(codeConfig, output);

  spinner.formatCode();
  formatCode(servicesDir);

  spinner.success();
};

module.exports = generateCrud;
