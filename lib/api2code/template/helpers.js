const camelCase = require('camelcase');

const toLowerCase = str => str.toLowerCase();

const path2CamelCase = str => camelCase(str.split('/').filter(i => i));

const diff = (v1, v2) => v1 === v2;

const getType = (currentType, currentPath, interfacesConfig) => {
  const interface = interfacesConfig.find(
    i => i.type === currentType && i.path === currentPath,
  );
  return interface.interfaceName;
};

module.exports = {
  toLowerCase,
  path2CamelCase,
  diff,
  getType,
};
