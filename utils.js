const { writeJsonSync } = require('fs-extra');
const shell = require('shelljs');
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
    writeJsonSync(packagesPath, packages);
};
/**
 * transform array data to object with truly value
 * @param arr{Array}
 * @return {Object}
 */
module.exports.transformArr2TrueObj = arr =>
  arr.reduce((pre, cur) => ({ ...pre, ...{ [cur]: true } }), {});

/**
 * format code
 * @param src{string} absolute path
 * @return {number}
 */
module.exports.formatCode = src => {
  return shell.exec(`prettier --loglevel error --write ${src} `).code;
};
