const { cosmiconfigSync } = require('cosmiconfig');
const { defaultConfig } = require('./defaultConfig');

const searchPlaces = [
  '.fecoderc',
  '.fecoderc.json',
  '.fecoderc.yaml',
  '.fecoderc.yml',
  '.fecoderc.js',
  '.fecoderc.cjs',
  // 'fe-code.config.js',
  // 'fe-code.config.cjs',
];

const loadConfig = () => {
  const explorer = cosmiconfigSync('fe-code', { searchPlaces });

  if (explorer.search()) {
    return explorer.search().config;
  }
  return defaultConfig;
};

module.exports = loadConfig;
