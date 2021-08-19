const path = require('path');
const getApiSet = require('./getApiSet');
const genServiceCode = require('./genService');
const genModelCode = require('./genModel');
const emitCode = require('./emitCode');
const { formatCode } = require('../../../utils');
const spinner = require('./spinner');
const { mkdir } = require('../../utils/fileSystem');
const { languages } = require('../../utils/constants');

const generateCrud = async options => {
  const { input, output, jsonType, language } = options;
  const isTs = languages.Typescript === language;
  spinner.getApiSet();
  const apiSet = await getApiSet(input, jsonType);

  spinner.genCode();
  const modelsConfig = await genModelCode(apiSet.apis, isTs);
  const servicesConfig = await genServiceCode(
    apiSet.apis,
    language,
    modelsConfig,
  );

  spinner.emitCode();
  const outputBaseDir = path.resolve(process.cwd(), output);
  await mkdir(outputBaseDir, { recursive: true });
  await Promise.all([
    emitCode(servicesConfig, outputBaseDir, 'services'),
    isTs && emitCode(modelsConfig, outputBaseDir, 'models'),
  ]);

  spinner.formatCode();
  formatCode(outputBaseDir);

  spinner.success();
};

module.exports = generateCrud;
