const { cosmiconfigSync } = require('cosmiconfig');

const loadConfig = () => {
  const explorer = cosmiconfigSync('fe-code', {
    searchPlaces: [
      '.fecoderc',
      '.fecoderc.json',
      '.fecoderc.yaml',
      '.fecoderc.yml',
      '.fecoderc.js',
      '.fecoderc.cjs',
      'fe-code.config.js',
      'fe-code.config.cjs',
    ],
  });

  return explorer.search().config;
};

module.exports = loadConfig;
