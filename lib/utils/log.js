const logSymbols = require('log-symbols');
const chalk = require('chalk');

const logSuccess = message => console.log(logSymbols.success, chalk.green(message));
const logError = message => console.log(logSymbols.error, chalk.red(message));
const logInfo = message => console.log(logSymbols.info, chalk.blue(message));
const logWarning = message => console.log(logSymbols.warning, chalk.yellow(message));

module.exports = {
  logSuccess,
  logError,
  logInfo,
  logWarning
}