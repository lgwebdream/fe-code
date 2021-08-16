const camelCase = require('camelcase');
const registerTemplates = require('../template/registerTemplates');
const { extMap } = require('../../utils');

const genServiceCode = async (apis, language) => {
  const { service } = registerTemplates;
  const services = [];
  for (const serviceName in apis) {
    if (apis.hasOwnProperty(serviceName)) {
      const filename = `${camelCase(serviceName, { pascalCase: true })}Service`;
      services.push(
        new Promise((resolve, reject) => {
          service({
            serviceName: filename,
            service: apis[serviceName],
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
