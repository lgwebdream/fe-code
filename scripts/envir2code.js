const { prompt } = require('inquirer');
const { writeJsonSync, pathExistsSync } = require('fs-extra');
const { green, yellow, red } = require('chalk');
const { join } = require('path');
const shell = require('shelljs');
const { initConfig, CONFIG_NAME } = require('../lib/defaultConfig');

const runnerPath = join(__dirname, '..', 'build/index.js');
const configPath = join(__dirname, '..', CONFIG_NAME);
let collection = {};

const finishCommand = () => {
  writeJsonSync(
    configPath,
    { ...initConfig, ...collection },
    {
      spaces: 2,
    },
  );
  const { root, projectName } = collection;
  const resolvePath = join(process.cwd(), root, projectName);
  if (pathExistsSync(resolvePath)) {
    const questions = [
      {
        type: 'confirm',
        name: 'overrideOutput',
        message: yellow(
          `'${resolvePath}' has already existed, do you want to override it?`,
        ),
      },
    ];
    prompt(questions).then(answers => {
      if (answers.overrideOutput) {
        console.info(green(`generate ${CONFIG_NAME}`));
        try {
          shell.exec(`rm -rf ${resolvePath}`);
          shell.exec(`node ${runnerPath} ${configPath}`);
          console.info(green(`init project successfully`));
        } catch (e) {
          console.info(red(e));
        }
      }
    });
  } else {
    console.info(green(`generate ${CONFIG_NAME}`));
    try {
      shell.exec(`node ${runnerPath} ${configPath}`);
      console.info(green(`init project successfully`));
    } catch (e) {
      console.info(red(e));
    }
  }
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
    filter(input) {
      return input.trim();
    },
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
      filter(input) {
        return input.trim();
      },
      validate(input) {
        const done = this.async();
        setTimeout(() => {
          if (!input) {
            done('Project name cannot be empty');
            return;
          }
          done(null, true);
        }, 0);
      },
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
    .description('Initial project')
    .action(() => {
      start();
    });
};

module.exports = envir2code;
