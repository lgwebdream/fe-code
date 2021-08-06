const { prompt } = require('inquirer');
const { writeJsonSync, pathExistsSync, ensureDirSync } = require('fs-extra');
const { green, yellow } = require('chalk');
const { join } = require('path');
const shell = require('shelljs');
const {
  initConfig,
  CONFIG_NAME,
  defaultConfig: { projectName: defaultProjectName },
} = require('../lib/defaultConfig');

const runnerPath = join(__dirname, '..', 'build/index.js');
let collection = {};

const finishCommand = () => {
  const { root, projectName } = collection;
  const resolvePath = join(process.cwd(), root, projectName);
  const configPath = join(resolvePath, CONFIG_NAME);
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
        shell.exec(`rm -rf ${resolvePath}`);
        ensureDirSync(resolvePath);
        writeJsonSync(
          configPath,
          { ...initConfig, ...collection },
          {
            spaces: 2,
          },
        );
        console.info(green(`generate ${CONFIG_NAME}`));
        shell.exec(`node ${runnerPath} ${configPath}`);
      }
    });
  } else {
    ensureDirSync(resolvePath);
    writeJsonSync(
      configPath,
      { ...initConfig, ...collection },
      {
        spaces: 2,
      },
    );
    console.info(green(`generate ${CONFIG_NAME}`));
    shell.exec(`node ${runnerPath} ${configPath}`);
  }
};

const commonPartQuestions = [
  {
    type: 'checkbox',
    name: 'featureList',
    choices: [
      // {
      //   name: 'babel',
      //   value: 'babel',
      // },
      {
        name: 'typescript',
        value: 'typescript',
      },
      // {
      //   name: 'unit Testing',
      //   value: 'unitTest',
      // },
      // {
      //   name: 'Linter/Formatter',
      //   value: 'lint',
      // },
      // {
      //   name: 'E2E Testing',
      //   value: 'e2e',
      // },
      {
        name: 'sass',
        value: 'sass',
      },
      {
        name: 'less',
        value: 'less',
      },
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
      choices: ['antd', 'none'], // 'material'
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
      choices: ['antd', 'element', 'none'], // 'material',
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
      default: defaultProjectName,
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
      default: 'snowpack',
      choices: ['snowpack', 'vite'], // 'webpack'
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
