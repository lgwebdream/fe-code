const inquirer = require('inquirer');
const generateInterface = require('../lib/api2code/generateInterface');
const generateCRUD = require('../lib/api2code/generateCRUD');
const loadConfig = require('../lib/loadConfig');
const { removeEmpty, getCwdPath } = require('../lib/utils');

const config = loadConfig();

const handleTargetMap = {
  interface: generateInterface,
  CRUD: generateCRUD,
};

// main questions
const promptList = [
  {
    type: 'list',
    name: 'target',
    message: 'Please select the type of generation',
    choices: Object.keys(handleTargetMap),
  },
  {
    type: 'confirm',
    name: 'skip',
    message: 'skip all the files generated before ? ',
  },
  {
    type: 'list',
    name: 'language',
    message: 'Please select the coding language you used',
    choices: ['JavaScript', 'Typescript'],
    when: ({ target }) => target === 'CRUD',
  },
  {
    type: 'list',
    name: 'requestLib',
    message: 'Please select the request library you used',
    choices: ['axios', 'jQuery', 'fetch' /** graphQL */],
    when: ({ target }) => target === 'CRUD',
  },
  {
    type: 'list',
    name: 'codeStyle',
    message: 'Please select the style for code',
    choices: ['code-snippets', 'service'],
    when: ({ target }) => target === 'CRUD',
  },
];

// main program
const api2code = program => {
  program
    .command('api2code')
    .alias('a2c')
    .description('🌽 api translation typescript')

    .option('-u, --url <url>', 'api addres(domain or ip)', config.request.url)
    .option('-p, --path <path>', 'api path')
    .option(
      '-b, --body <body>',
      'data json path for http body, only post method.',
    )
    .option('-i, --input <input>', 'input json file')
    .action(options => {
      const { url, output, path, body, input } = options;

      inquirer.prompt(promptList).then(({ target, ...props }) => {
        handleTargetMap[target](
          removeEmpty({
            url,
            path,
            output,
            input: input && resolve(process.cwd(), input),
            body: body && resolve(process.cwd(), body),
            ...props
          }),
        );
      });
    });
};
module.exports = api2code;
