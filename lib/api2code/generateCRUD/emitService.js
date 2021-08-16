const path = require('path');
const { mkdir, writeFile } = require('../../utils/fileSystem');

const emitService = (codeConfig, output) => {
  const outputBaseDir = path.resolve(process.cwd(), output);
  const baseMkdir = mkdir(outputBaseDir, {
    recursive: true,
  });
  Promise.all([baseMkdir, ...codeConfig]).then(async ([, ...codeArr]) => {
    const servicesDir = path.resolve(outputBaseDir, 'services');
    await mkdir(servicesDir, { recursive: true });
    for (const code of codeArr) {
      writeFile(
        path.resolve(servicesDir, `${code.filename}${code.ext}`),
        code.code,
      );
    }
  });
};

module.exports = emitService;
