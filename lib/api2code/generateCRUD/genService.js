const camelCase = require('camelcase');
const registerTemplates = require('../template/registerTemplates');
const { extMap, languages } = require('../../utils/constants');

const genServiceCode = async (apis, language, modelsConfig) => {
  const services = [];
  const models = await Promise.all(modelsConfig);
  for (const serviceName in apis) {
    if (apis.hasOwnProperty(serviceName)) {
      const filename = `${camelCase(serviceName, { pascalCase: true })}Service`;
      const eachService = apis[serviceName];
      services.push(
        new Promise((resolve, reject) => {
          registerTemplates
            .service({
              serviceName: filename,
              service: eachService,
              isTs: language === languages.Typescript,
              modelConfig: models.find(
                model => model.serviceName === serviceName,
              ),
            })
            .then(code => resolve({ filename, code, ext: extMap[language] }))
            .catch(err => reject(err));
        }),
      );
    }
  }
  return services;
};

module.exports = genServiceCode;
