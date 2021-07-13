const inquirer = require('inquirer');
const generateInterface = require('../lib/api2code/generateInterface');
const generateCRUD = require('../lib/api2code/generateCRUD');

const handleTargetMap = {
  interface: generateInterface,
  CRUD: generateCRUD,
};

const api2code = program => {
  program
    .command('api2code')
    .alias('a2c')
    .description('🌽  API对TypeScript转化')
    .requiredOption('-u, --url <url>', 'api地址')
    .requiredOption('-o, --output <output>', '生成文件路径')
    .action(options => {
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'target',
            message: 'Please select the type of generation.',
            choices: Object.keys(handleTargetMap),
          },
        ])
        .then(({ target }) => {
          const { url, output } = options;
          handleTargetMap[target]({ url, output });
        });
    });
};
module.exports = api2code;
