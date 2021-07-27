const fs = require('fs');
const path = require('path');
const codeGenerators = require('../code-templates');
const { logInfo, logError, logSuccess } = require('../../utils/log');
const output2File = require('../../utils/output2File');
const concept = require('../../../constants/concept');

const currentPath = process.cwd();
const exts = {
  [concept.JS]: 'js',
  [concept.TS]: 'ts',
};

/**
 * get api configs from remote server
 * @param {*} options
 */
const loadConfigFromRemote = options => {
  logInfo(`${options} this ability will be supported sooner!`);
};

/**
 * get api configs from local json
 * @param {*} options
 */
const loadConfigFromLocal = ({ input }) => {
  const filePath = path.resolve(process.cwd(), input);
  try {
    // check the accessibility
    fs.accessSync(filePath, fs.constants.R_OK);
    logInfo(`reading the api config file at ${input}`);

    // read json file
    const apiText = fs.readFileSync(filePath, { encoding: 'utf-8' });
    const apiConfigs = JSON.parse(apiText);
    return apiConfigs;
  } catch (err) {
    logError(err.message || 'the input file can not be accessed!');
    return process.exit(0);
  }
};

/**
 * save all the crud code to disk
 * @param {*} glolbalOptions
 * @param {*} apiConfig
 */
const emitFiles = (glolbalOptions, apiConfig) => {
  const { crudCodePath, apis } = apiConfig;
  const { language } = glolbalOptions;
  const ext = exts[language || concept.JS];
  if (glolbalOptions.codeStyle === concept.CodeSnippet) {
    for (const [serviceName, apiInfoArray] of Object.entries(apis)) {
      // merge functions
      const mergedCode = apiInfoArray.reduce((prev, apiInfo) => {
        return prev + '\n\n' + apiInfo.code;
      }, '');
      const outputPath = path.resolve(
        currentPath,
        crudCodePath,
        `${serviceName}.${ext}`,
      );
      // save to disk
      output2File(outputPath, mergedCode);
    }
  } else if (glolbalOptions.codeStyle === concept.Service) {
    logSuccess('should emit as a service');
  }
};

/**
 * main function of CRUD Generator
 * @param {*} options
 */
const generateCRUD = options => {
  const {
    language = concept.JS,
    requestLib = concept.Axios,
    codeStyle = concept.CodeSnippet,
    input = '',
  } = options;

  const apiConfig = input
    ? loadConfigFromLocal(options)
    : loadConfigFromRemote(options);
  const { apis } = apiConfig;

  // pick Code Generator
  const GeneratorKey = `${language}_${requestLib}_${codeStyle}`;
  const CrudCodeGenerator = codeGenerators[GeneratorKey];

  // generate code
  for (const [serviceName, apiInfoArray] of Object.entries(apis)) {
    if (Array.isArray(apiInfoArray)) {
      // generate code
      apiInfoArray = apiInfoArray.map(apiInfo => {
        return CrudCodeGenerator.call(null, apiInfo, serviceName);
      });

      // emit file
      emitFiles(options, apiConfig);
    }
  }
};

module.exports = generateCRUD;
