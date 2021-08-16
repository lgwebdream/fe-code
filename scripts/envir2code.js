const { prompt } = require('inquirer');
const { writeJsonSync, pathExistsSync, ensureDirSync } = require('fs-extra');
const { green, yellow, red, blue } = require('chalk');
const { join } = require('path');
const shell = require('shelljs');
const ora = require('ora');
const { formatCode } = require('../utils');

const {
  initConfig,
  CONFIG_NAME,
  defaultConfig: { projectName: defaultProjectName },
} = require('../lib/defaultConfig');

const runnerPath = join(__dirname, '..', 'build/index.js');
let collection = {};

/**
 * merge the fields of mainFramework, mainFrameworkVersion to mainFramework object
 * @param data{{request: {headers: {}, url: string}, language: string, templatePath: string}}
 * @return {{mainFramework: string}}
 */
const formatOutput = (data = {}) => {
  const { mainFrameworkVersion, mainFramework } = data;
  data.mainFramework = {
    name: mainFramework,
    version: mainFrameworkVersion,
  };
  delete data.mainFrameworkVersion;
  return data;
};
const finishCommand = () => {
  const { projectName } = collection;
  const resolvePath = join(process.cwd(), projectName);
  const configPath = join(resolvePath, CONFIG_NAME);
  const spinner = ora();
  const run = () => {
    spinner.start(`generate ${CONFIG_NAME}...`);
    try {
      ensureDirSync(resolvePath);
      writeJsonSync(
        configPath,
        formatOutput({ ...initConfig, ...collection }),
        {
          spaces: 2,
        },
      );
    } catch (e) {
      spinner.fail(red(`Error: generate ${CONFIG_NAME}`));
      shell.exit(1);
    }
    spinner.start(`generate project...`);
    if (shell.exec(`node ${runnerPath} ${configPath}`).code !== 0) {
      spinner.fail(red(`Error: node ${runnerPath} ${configPath}`));
      shell.exit(1);
    }

    spinner.start(`format code...`);
    if (formatCode(resolvePath) !== 0) {
      spinner.fail(
        red(`Error: prettier --loglevel error --write ${resolvePath}`),
      );
      shell.exit(1);
    }
    spinner.succeed(green(`Project initialization finished!`));

    spinner.stopAndPersist({
      text: `
Get started with the following commands:
  ${blue(`
  $ cd ${projectName}
  $ npm install`)}
`,
    });
  };

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
        spinner.start(`remove ${resolvePath}`);
        if (shell.exec(`rm -rf ${resolvePath}`).code !== 0) {
          shell.echo(`Error: rm -rf ${resolvePath}`);
          spinner.fail(red(`Error: remove ${resolvePath}`));
          shell.exit(1);
          return;
        }
        run();
      }
    });
  } else {
    spinner.start();
    run();
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
        name: 'Typescript',
        value: 'typescript',
      },
      {
        name: 'Unit Testing',
        value: 'unitTest',
      },
      {
        name: 'Eslint',
        value: 'lint',
      },
      {
        name: 'Prettier',
        value: 'prettier',
      },
      // {
      //   name: 'E2E Testing',
      //   value: 'e2e',
      // },
      {
        name: 'Sass',
        value: 'sass',
      },
      {
        name: 'Less',
        value: 'less',
      },
    ],
    message: 'Check the features needed for your project',
  },
];
const vuePart = () => {
  const questions = [
    {
      type: 'list',
      name: 'mainFrameworkVersion',
      choices: [2, 3],
      message: 'Which vue version do you prefer to use?',
    },
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
      default: 'webpack',
      choices: ['webpack', 'snowpack', 'vite'],
      message: 'Which build tool do you want to use?',
    },
    {
      type: 'list',
      name: 'mainFramework',
      default: 'react',
      choices: ['react', 'vue', 'none'],
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
