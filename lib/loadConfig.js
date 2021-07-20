const { cosmiconfigSync } = require('cosmiconfig');

const searchPlaces = [
  '.fecoderc',
  '.fecoderc.json',
  '.fecoderc.yaml',
  '.fecoderc.yml',
  '.fecoderc.js',
  '.fecoderc.cjs',
  'fe-code.config.js',
  'fe-code.config.cjs',
];

const defaultConfig = {
  request: {
    url: 'http://localhost:3000',
    headers: {},
  },
  root: 'src',
  framework: [],
  useTypescript: true,
  language: 'zh-CN',
};

const loadConfig = () => {
  const explorer = cosmiconfigSync('fe-code', { searchPlaces });
  const searched = explorer.search();
  return searched ? searched.config : defaultConfig;
};

module.exports = loadConfig;
