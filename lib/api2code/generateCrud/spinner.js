const ora = require('ora');

const spinner = {
  ora: ora(''),
  getApiSet() {
    this.ora.start('Start getting api configuration');
  },

  genCode() {
    this.ora.succeed('Get api configuration success');
    this.ora.start('Start generating code');
  },

  emitCode() {
    this.ora.succeed('Code generation successful');
    this.ora.start('Start emiting code');
  },

  formatCode() {
    this.ora.succeed('Code emiting successful');
    this.ora.start('Start format code');
  },

  success() {
    this.ora.succeed('Format code successful');
  },
};

module.exports = spinner;
