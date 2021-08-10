const ora = require('ora');
const { join } = require('path');
const { prompt } = require('inquirer');
const { exec } = require('shelljs');
const { existsSync, mkdirSync } = require('fs-extra');
const {
  generateReactCode,
  initReactBase,
  generateReactMock,
} = require('../lib/utils/react2Code');

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
    type: 'confirm',
    name: 'isTypescript',
    message: '是否使用 Typescript:',
    default: 'Y',
  },
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
  // {
  //   type: 'list',
  //   name: 'containerType',
  //   message: '交互方式:',
  //   choices: ['Modal', 'Panel'],
  //   default: 'Modal',
  // },
];

confirmQuestions.forEach(it =>
  questions.push({
    type: 'confirm',
    name: it.key,
    message: `是否需要${it.text}功能:`,
    default: 'Y',
  }),
);

const react2code = program => {
  program
    .command('react2code')
    .alias('r2c')
    .usage('-o <output>')
    .description('🍉 generate react code of crud')
    .option('-o, --output <output>', 'path of generation file')

    .action(({ output }) => {
      // write path
      const toPath = join(process.cwd(), output || '');

      !existsSync(toPath) && mkdirSync(toPath);

      prompt(questions).then(answers => {
        const { isReset, isTypescript } = answers;

        const reactLibPath = join(__dirname, '../lib/react');

        // template path of jsx/tsx
        const templatePath = join(reactLibPath, `${isTypescript ? '' : 'jsx'}`);

        Object.assign(answers, { isTs: isTypescript });

        const spinner = ora(
          `🍉 generate react code of ${answers.model} ...... \n`,
        );
        spinner.start();

        try {
          // init/reset base components
          isReset && initReactBase(templatePath, toPath);

          // generate react crud code
          generateReactCode(templatePath, toPath, answers);

          // generate mock json
          generateReactMock(reactLibPath, toPath);

          setTimeout(() => {
            spinner.text = 'format code... \n';

            // format code with prettier
            exec(
              `npx prettier -u --write '${toPath}/(components|${answers.model})/*.{tsx,jsx,js,ts}'`,
              () => {
                spinner.text = 'generate success...';
                setTimeout(() => {
                  spinner.stop();
                }, 400);
              },
            );
          }, 500);
        } catch (error) {
          spinner.stop();
        }
      });
    });
};

module.exports = react2code;
