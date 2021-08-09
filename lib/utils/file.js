const { join } = require('path');

const {
  readdirSync,
  readFile,
  writeFile,
  createReadStream,
  createWriteStream,
  existsSync,
  mkdirSync,
} = require('fs');

const handleError = err => err && console.error(err) && process.exit(-1);

/**
 * 迁移文件到固定目录
 *
 * @param {*} fromPath 需要迁移的文件夹路径
 * @param {*} toPath 目的文件夹路径
 * @param {*} ignoreFiles 需要忽略的文件名集合
 * @returns
 */
const transferDir = (fromPath, toPath, ignoreFiles = []) => {
  if (!existsSync(fromPath)) return;

  // not exist and mkdir
  !existsSync(toPath) && mkdirSync(toPath);

  const files = readdirSync(fromPath, { withFileTypes: true });

  for (const file of files) {
    if (!ignoreFiles.includes(file.name)) {
      const fromFilePath = join(fromPath, file.name);
      const toFilePath = join(toPath, file.name);

      if (file.isFile()) {
        // copy file
        const reader = createReadStream(fromFilePath);
        const writer = createWriteStream(toFilePath);
        reader.pipe(writer);
      } else {
        transferDir(fromFilePath, toFilePath);
      }
    }
  }
};

/**
 * 重写文件内容
 *
 * @param {*} fromFile
 * @param {*} toFile
 * @param {*} formatter 格式化回调 data => string
 */
const transferFile = (fromFile, toFile, formatter = null) => {
  return new Promise((resolve, reject) => {
    if (!existsSync(fromFile)) {
      reject(`${fromFile} not exist`);
      return;
    }

    readFile(fromFile, 'utf8', (err, data) => {
      if (err) {
        handleError(err);
        reject(err);
        return;
      }

      // formatter for data
      const replaceData =
        formatter && typeof formatter === 'function' ? formatter(data) : data;

      writeFile(toFile, replaceData, 'utf8', err => {
        if (err) {
          handleError(err);
          reject(err);
          return;
        }
        resolve(true);
      });
    });
  });
};

module.exports = {
  transferDir,
  transferFile,
};
