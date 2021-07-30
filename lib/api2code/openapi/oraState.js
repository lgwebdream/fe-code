const ora = require('ora');

const oasGenStatus = {
  spinner: ora('Generate code based on OAS'),
  start() {
    this.spinner.start();
  },

  read() {
    this.spinner.text = 'Reading OpenApi spec file...';
  },

  parse() {
    this.spinner.text = 'Start parsing...';
    this.spinner.color = 'yellow';
  },

  generate() {
    this.spinner.text = 'Start Generating...';
    this.spinner.color = 'green';
  },

  success() {
    this.spinner.stop();
  },
};

module.exports = {
  oasGenStatus,
};
