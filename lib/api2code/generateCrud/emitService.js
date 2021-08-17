const path = require('path');
const { mkdir, writeFile } = require('../../utils/fileSystem');

const emitService = async (codeConfig, output) => {
  const outputBaseDir = path.resolve(process.cwd(), output);
  const baseMkdir = mkdir(outputBaseDir, {
    recursive: true,
  });
  const [, ...codeArr] = await Promise.all([baseMkdir, ...codeConfig]);
  const servicesDir = path.resolve(outputBaseDir, 'services');
  await mkdir(servicesDir, { recursive: true });
  const emitStatus = [];
  for (const code of codeArr) {
    const serviceFilePath = path.resolve(
      servicesDir,
      `${code.filename}${code.ext}`,
    );
    const awaitFilePath = new Promise((resolve, reject) => {
      writeFile(serviceFilePath, code.code)
        .then(() => resolve(serviceFilePath))
        .catch(err => reject(err));
    });
    emitStatus.push(awaitFilePath);
  }
  await Promise.all(emitStatus);
  return servicesDir;
};

module.exports = emitService;
