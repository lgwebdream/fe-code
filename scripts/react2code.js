const { join } = require('path');
const { prompt } = require('inquirer');
const ora = require('ora');
const loadConfig = require('../lib/loadConfig');

const { generateReactCode, initReactBase } = require('../lib/utils/react2Code');

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

const config = loadConfig();
// TODO 校验初始化与否，给予合理提示

// 校验是否使用 typescript
const isTypescript = config?.featureList?.includes('typescript');
const templatePath = join(
  __dirname,
  `../lib/react/${isTypescript ? '' : 'build'}`,
);

const react2code = program => {
  program
    .command('react2code')
    .alias('r2c')
    .usage('-o <output>')
    .description('🍉 generate react code of crud')
    .requiredOption('-o, --output <output>', 'path of generation file')

    .action(({ output }) => {
      prompt(questions).then(answers => {
        const { isReset } = answers;

        Object.assign(answers, { isTs: isTypescript });

        // write path
        const toPath = join(process.cwd(), output);

        const spinner = ora(`🍉 generate react code of ${answers.title} \n`);
        spinner.start();

        // init/reset base components
        isReset && initReactBase(templatePath, toPath);

        // generate react crud code
        generateReactCode(templatePath, toPath, answers);

        setTimeout(() => {
          spinner.stop();
        }, 2000);
      });
    });
};

module.exports = react2code;
