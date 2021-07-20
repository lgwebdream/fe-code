const logSymbols = require('log-symbols');
const chalk = require('chalk');

logSuccess = message => console.log(logSymbols.success, chalk.green(message));
logError = message => console.log(logSymbols.error, chalk.red(message));
logInfo = message => console.log(logSymbols.info, chalk.blue(message));
logWarning = message => console.log(logSymbols.warning, chalk.yellow(message));

module.exports = {
  logSuccess,
  logError,
  logInfo,
  logWarning
}