const path = require('path');
const { mkdir, writeFile } = require('../../utils/fileSystem');

const emitCode = async (codeConfig, output, emitType) => {
  const dir = path.resolve(output, emitType);
  await mkdir(dir, { recursive: true });

  const emitStatus = [];
  for (const code of await Promise.all(codeConfig)) {
    const filePath = path.resolve(dir, `${code.filename}${code.ext || '.ts'}`);
    const awaitFilePath = new Promise((resolve, reject) => {
      writeFile(filePath, code.code)
        .then(() => resolve(filePath))
        .catch(err => reject(err));
    });
    emitStatus.push(awaitFilePath);
  }
  await Promise.all(emitStatus);
};

module.exports = emitCode;
