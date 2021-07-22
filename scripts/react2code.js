// eslint-disable-next-line no-unused-vars
const { join } = require('path');
const { prompt } = require('inquirer');
const { generateReactCode } = require('../lib/utils/react2Code');

// 交互问题采集
const questions = [
  {
    type: 'list',
    name: 'style',
    message: 'style of writing: ',
    choices: ['hooks', 'class'],
    default: 'hooks',
  },
];

const templatePath = join(__dirname, '../lib/react/');

const react2code = program => {
  program
    .command('react2code')
    .alias('r2c')
    .usage('-o <output>')
    .description('🍉 generate react code of crud')
    .requiredOption('-o, --output <output>', 'path of generation file')

    .action(({ output }) => {
      // console.log(`output@`, output);

      prompt(questions).then(answers => {
        // const { sty le } = answers;
        // console.log(`answer@`, style);

        // write path
        const toPath = join(process.cwd(), output);

        // generate react crud code
        generateReactCode(templatePath, toPath, answers);
      });
    });
};

module.exports = react2code;
