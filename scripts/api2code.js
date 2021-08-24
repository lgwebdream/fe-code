const inquirer = require('inquirer');
const generateInterface = require('../lib/api2code/generateInterface');
const generateCrud = require('../lib/api2code/generateCrud');
const { parserMap } = require('../lib/api2code/parser');
const { removeEmpty } = require('../lib/utils');
const { languages } = require('../lib/utils/constants');

const handleTargetMap = {
  interface: generateInterface,
  crud: generateCrud,
};

// main questions
const promptList = [
  {
    type: 'list',
    name: 'target',
    message: 'Please select the type of generation',
    choices: Object.keys(handleTargetMap),
  },
  // {
  //   type: 'confirm',
  //   name: 'skip',
  //   message: 'skip all the files generated before ? ',
  // },
  {
    type: 'list',
    name: 'jsonType',
    message: 'please select the type of json',
    choices: Object.keys(parserMap),
    when: ({ target }) => target === 'crud',
  },
  {
    type: 'list',
    name: 'language',
    message: 'Please select the coding language you used',
    choices: Object.keys(languages),
    when: ({ target }) => target === 'crud',
  },
  // {
  //   type: 'list',
  //   name: 'requestLib',
  //   message: 'Please select the request library you used',
  //   choices: ['axios', 'fetch' /** graphQL */],
  //   when: ({ target }) => target === 'crud',
  // },
  // {
  //   type: 'list',
  //   name: 'codeStyle',
  //   message: 'Please select the style for code',
  //   choices: ['code-snippets', 'service'],
  //   when: ({ target }) => target === 'crud',
  // },
];

// main program
const api2code = program => {
  program
    .command('api2code')
    .alias('a2c')
    .description('🌽 api translation typescript')
    // .option('-u, --url <url>', 'api addres(domain or ip)', config.request.url)
    // .option('-p, --path <path>', 'api path')
    .requiredOption('-i, --input <input>', 'input json file')
    .requiredOption('-o, --output <output>', 'output code file')
    .action(options => {
      const { output, input } = options;

      inquirer.prompt(promptList).then(({ target, ...props }) => {
        handleTargetMap[target](
          removeEmpty({
            // url,
            // path,
            output,
            input,
            ...props,
          }),
        );
      });
    });
};
module.exports = api2code;
