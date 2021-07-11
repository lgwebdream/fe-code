const chalk = require('chalk');
const entry = require('./example/entry');
const templatePath = './example/template.html';
const outputHtmlPath = '../dist/output.html';
const { readFileSync, existsSync } = require('fs-extra');
const { template: utilsTemplate, output: utilsOutput, generateHead, generateBody } = require('./utils');

if(!existsSync(templatePath)){
  console.log(chalk.red(`file '${templatePath}' is not exist`));
  return;
}

const templateStr = readFileSync(templatePath).toString();
const templateMatches = {
  head: generateHead([
    '<meta charSet="UTF-8">',
    '<title>Title</title>'
  ]),
  body: generateBody(entry)
};
const outputStr = utilsTemplate(templateStr, templateMatches);
utilsOutput(outputStr, outputHtmlPath);
console.log(chalk.blue(`render Html in ${outputHtmlPath}`));


