const { prompt } = require('inquirer');
const { writeJsonSync } = require('fs-extra');
const { green } = require('chalk');

const CONFIG_NAME = '.fecoderc.json';
const { join } = require('path');

const defaultConfig = {
  request: {
    url: 'http://localhost:3000',
    headers: {},
  },
};

let collection = {};

const finishCommand = () => {
  writeJsonSync(
    join(__dirname, '..', CONFIG_NAME),
    { ...defaultConfig, ...collection },
    {
      spaces: 2,
    },
  );
  console.info(green(`generate ${CONFIG_NAME} & init project successfully`));
};

const commonPartQuestions = [
  {
    type: 'checkbox',
    name: 'featureList',
    default: ['babel'],
    choices: [
      'babel',
      'typescript',
      'unit Testing',
      'Linter / Formatter',
      'E2E Testing',
    ],
    message: 'Check the features needed for your project',
  },
  {
    type: 'input',
    name: 'root',
    message: 'Please input the destination of output?',
  },
];
const vuePart = () => {
  const questions = [
    {
      type: 'list',
      name: 'uiFramework',
      choices: ['element', 'none'],
      message: 'Which UI framework do you want to use?',
    },
    ...commonPartQuestions,
  ];
  prompt(questions).then(answers => {
    collection = Object.assign(collection, answers);
    finishCommand();
  });
};

const reactPart = () => {
  const questions = [
    {
      type: 'list',
      name: 'uiFramework',
      choices: ['antd', 'material', 'none'],
      message: 'Which UI framework do you want to use?',
    },
    ...commonPartQuestions,
  ];
  prompt(questions).then(answers => {
    collection = Object.assign(collection, answers);
    finishCommand();
  });
};

const nonePart = () => {
  const questions = [
    {
      type: 'list',
      name: 'uiFramework',
      choices: ['antd', 'material', 'element', 'none'],
      message: 'Which UI framework do you want to use?',
    },
    ...commonPartQuestions,
  ];
  prompt(questions).then(answers => {
    collection = Object.assign(collection, answers);
    finishCommand();
  });
};

const start = () => {
  const questions = [
    {
      type: 'input',
      name: 'projectName',
      default: 'empty project',
      message: 'Please input your project name?',
    },
    {
      type: 'list',
      name: 'buildTool',
      default: 'webpack',
      choices: ['webpack', 'snowpack', 'vite'],
      message: 'Which build tool do you want to use?',
    },
    {
      type: 'list',
      name: 'mainFramework',
      default: 'react',
      choices: ['vue', 'react', 'none'],
      message: 'Which main framework do you want to use?',
    },
  ];
  prompt(questions).then(answers => {
    const { mainFramework } = answers;
    collection = Object.assign(collection, answers);
    if (mainFramework === 'react') {
      reactPart();
    } else if (mainFramework === 'vue') {
      vuePart();
    } else {
      nonePart();
    }
  });
};

const envir2code = program => {
  program
    .command('envir2code')
    .alias('e2c')
    .usage('-o <output>')
    .description('Initial project')
    .action(() => {
      start();
    });
};

module.exports = envir2code;
