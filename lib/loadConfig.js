const { cosmiconfigSync } = require('cosmiconfig');
const chalk = require('chalk');

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

const loadConfig = () => {
  const explorer = cosmiconfigSync('fe-code', { searchPlaces });

  if (explorer.search()) {
    return explorer.search().config;
  }
  throw new Error(
    `${chalk.red(
      'A configuration file is required at the root of the project.',
    )}
    ${chalk.cyan('Support:')}
      ${chalk.blue(searchPlaces.join('\n      '))}
    `,
  );
};

module.exports = loadConfig;
