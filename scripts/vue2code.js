const { join } = require('path');
const { prompt } = require('inquirer');
const ora = require('ora');
const { generateVueCode, initVueBase } = require('../lib/utils/vue2Code');
const loadConfig = require('../lib/loadConfig');
const { transformArr2TrueObj } = require('../utils');

const confirmQuestions = [
  { key: 'isNeedQuery', text: '查询' },
  { key: 'isNeedAdd', text: '添加' },
  { key: 'isNeedEdit', text: '编辑' },
  { key: 'isNeedDelete', text: '删除' },
  { key: 'isNeedDefine', text: '单条自定义' },
  { key: 'isNeedBatchDelete', text: '批量删除' },
  { key: 'isNeedBatchDefine', text: '批量自定义' },
];

// 交互问题采集
const questions = [
  {
    type: 'input',
    name: 'model',
    message: '新模块名称（英文）:',
    default: 'model-a',
  },
  {
    type: 'input',
    name: 'file',
    message: '新模块文件名称（英文）:',
    default: 'index',
  },
  {
    type: 'confirm',
    name: 'isReset',
    message: '是否需要初始化/重置基础组件:',
    default: 'N',
  },
  {
    type: 'input',
    name: 'title',
    message: '业务标题:',
    default: '标题',
  },
  {
    type: 'list',
    name: 'containerType',
    message: '交互方式:',
    choices: ['Modal', 'Panel'],
    default: 'Modal',
  },
];

confirmQuestions.forEach(it =>
  questions.push({
    type: 'confirm',
    name: it.key,
    message: `是否需要${it.text}功能:`,
    default: 'Y',
  }),
);

// TODO 校验初始化与否，给予合理提示

// 校验是否使用 typescript

const { isTypescript } = transformArr2TrueObj(loadConfig().featureList || []);
const templatePath = join(__dirname, `../lib/vue/${isTypescript ? '' : ''}`);

// const templatePath = join(__dirname, '../lib/vue/');

const vue2code = program => {
  program
    .command('vue2code')
    .alias('v2c')
    .usage('-o <output>')
    .description('🍉 generate vue code of crud')
    .requiredOption('-o, --output <output>', 'path of generation file')

    .action(({ output }) => {
      prompt(questions).then(answers => {
        const { isReset } = answers;

        Object.assign(answers, { isTs: isTypescript });
        // write path
        const toPath = join(process.cwd(), output || '');

        const spinner = ora(
          `🍉 generate vue code of ${answers.model} ...... \n`,
        );

        spinner.start();

        try {
          // init/reset base components
          isReset && initVueBase(templatePath, toPath);

          // generate react crud code
          generateVueCode(templatePath, toPath, answers);

          setTimeout(() => {
            spinner.text = 'generate success';
            setTimeout(() => {
              spinner.stop();
            }, 400);
          }, 1200);
        } catch (error) {
          spinner.stop();
        }
      });
    });
};

module.exports = vue2code;
