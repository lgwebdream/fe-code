const {
  readdirSync,
  readFile,
  writeFile,
  createReadStream,
  createWriteStream,
  existsSync,
  mkdirSync,
} = require('fs');
const { join } = require('path');

// ignore file
const ignoreFiles = [
  'node_modules',
  '.DS_Store',
  'dist',
  'yarn.lock',
  'package-lock.json',
  'package.json',
  'tsconfig.json',
];

// TODO replace files
const replaceFiles = [];

const handleError = err => err && console.error(err);

/**
 * replace file
 *
 * @param {*} fromFile
 * @param {*} toFile
 * @param {*} options
 * @returns
 */
const replaceArgsToFile = (fromFile, toFile, options) => {
  if (!options) return;

  readFile(fromFile, 'utf8', (err, data) => {
    if (err) {
      handleError(err);
      return;
    }

    // TODO replace template code

    writeFile(toFile, data, 'utf8', handleError);
  });
};

/**
 * copy file
 *
 * @param {*} fromPath
 * @param {*} toPath
 * @param {*} options
 */
const generateReactCode = (fromPath, toPath, options) => {
  if (!existsSync(fromPath)) return;

  // not exist and mkdir
  !existsSync(toPath) && mkdirSync(toPath);

  const files = readdirSync(fromPath, { withFileTypes: true });

  for (const file of files) {
    if (!ignoreFiles.includes(file.name)) {
      const fromFilePath = join(fromPath, file.name);
      const toFilePath = join(toPath, file.name);

      if (file.isFile()) {
        if (replaceFiles.includes(file.name)) {
          // replace args
          replaceArgsToFile(fromFilePath, toFilePath, options);
        } else {
          // copy file
          const reader = createReadStream(fromFilePath);
          const writer = createWriteStream(toFilePath);
          reader.pipe(writer);
        }
      } else {
        generateReactCode(fromFilePath, toFilePath);
      }
    }
  }
};

module.exports = {
  generateReactCode,
};
