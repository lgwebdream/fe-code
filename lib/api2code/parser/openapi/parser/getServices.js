const camelCase = require('camelcase');
const parseParams = require('./parseParams');

const getServiceName = path => {
  return path.match(/^\/(\w+)/)[1];
};

const handleMethodsGroup = (path, methodsGroup) => {
  const servicePath = [];
  for (const method in methodsGroup) {
    if (methodsGroup.hasOwnProperty(method)) {
      const request = methodsGroup[method];
      const functionName = camelCase(path.split('/'), {
        pascalCase: true,
      });
      const eachRequest = {
        method: method.toLocaleUpperCase(),
        path,
        name: `${method}${functionName}`, // unsupport dynamic route now.
        requestParams: parseParams(method, request),
        description: request.description,
      };
      servicePath.push(eachRequest);
    }
  }
  return servicePath;
};

const expandEachPath = services => {
  const servicesObj = {};
  services.forEach((serviceValue, serviceKey) => {
    const pathArray = [];
    serviceValue.forEach(pathValue => {
      pathArray.push(...pathValue);
    });
    servicesObj[serviceKey] = pathArray;
  });
  return servicesObj;
};

const splitServices = paths => {
  const services = new Map(); // key: service name, value: service
  for (const path in paths) {
    if (paths.hasOwnProperty(path)) {
      const methodsGroup = paths[path];
      const serviceName = getServiceName(path);
      const eachPath = [path, handleMethodsGroup(path, methodsGroup)];
      services.get(serviceName)
        ? services.get(serviceName).set(...eachPath)
        : services.set(serviceName, new Map([eachPath]));
    }
  }
  return services;
};

const getServices = openApi => {
  const splitedServices = splitServices(openApi.paths);
  const services = expandEachPath(splitedServices);
  return services;
};

module.exports = getServices;
