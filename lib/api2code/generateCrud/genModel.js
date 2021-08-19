const camelCase = require('camelcase');
const registerTemplates = require('../template/registerTemplates');

const genModelCode = async (apis, isTs) => {
  const models = [];
  if (!isTs) return models;
  for (const serviceName in apis) {
    if (apis.hasOwnProperty(serviceName)) {
      const filename = `${camelCase(serviceName, { pascalCase: true })}`;
      const eachService = apis[serviceName];

      const interfacesConfig = [];
      for (const eachApi of eachService) {
        const baseName = camelCase(
          eachApi.path.split('/').filter(i => i),
          { pascalCase: true },
        );

        const { path } = eachApi;

        if (eachApi.method === 'POST') {
          const interfaceName = `${baseName}Body`;
          interfacesConfig.push({
            interfaceName,
            data: eachApi.requestParams,
            path,
            type: 'body',
          });
        }

        interfacesConfig.push({
          interfaceName: `${baseName}Response`,
          data: eachApi.response,
          path,
          type: 'response',
        });
      }
      models.push(
        new Promise((resolve, reject) => {
          registerTemplates
            .model({
              interfacesConfig,
            })
            .then(code =>
              resolve({ code, filename, serviceName, interfacesConfig }),
            )
            .catch(err => reject(err));
        }),
      );
    }
  }
  return models;
};

module.exports = genModelCode;
