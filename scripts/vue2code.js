const { join } = require('path');
const { prompt } = require('inquirer');
const { generateVueCode } = require('../lib/utils/vue2Code');

// 交互问题采集
const questions = [
  {
    type: 'list',
    name: 'version',
    message: 'Select of version: ',
    choices: ['vue2', 'vue3'],
    default: 'vue2',
  },
];

const templatePath = join(__dirname, '../lib/vue/');

const vue2code = program => {
  program
    .command('vue2code')
    .alias('v2c')
    .usage('-o <output>')
    .description('🍉 generate vue code of crud')
    .requiredOption('-o, --output <output>', 'path of generation file')

    .action(({ output }) => {
      prompt(questions).then(answers => {
        // write path
        const toPath = join(process.cwd(), output);

        // generate react crud code
        generateVueCode(templatePath, toPath, answers);
      });
    });
};

module.exports = vue2code;
