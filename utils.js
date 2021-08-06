const { writeJsonSync } = require('fs-extra');
const { componentDependencies } = require('./dependencies.config');

/**
 * patch dependencies to package.json
 * @param packagesPath{string} package path
 * @param main{string} react/vue
 * @return {void}
 */
module.exports.patchPackageJson = ({ packagesPath, main }) => {
  const packages = require(packagesPath);
  const ds = componentDependencies[main];
  ds &&
    Reflect.ownKeys(ds).forEach(item => {
      packages[item] = componentDependencies[item];
    }) &&
    writeJsonSync(packagesPath, packages, {
      spaces: 2,
    });
};
