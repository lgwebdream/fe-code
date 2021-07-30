const {
  copyFile: copyFileCore,
  exists: existsCore,
  readFile: readFileCore,
  writeFile: writeFileCore,
} = require('fs');
const { promisify } = require('util');

const readFile = promisify(readFileCore);
const writeFile = promisify(writeFileCore);
const copyFile = promisify(copyFileCore);
const exists = promisify(existsCore);

module.exports = {
  readFile,
  writeFile,
  copyFile,
  exists,
};
