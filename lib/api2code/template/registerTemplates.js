const Handlebars = require('handlebars');
const path = require('path');
const { readFile } = require('../../utils/fileSystem');
const helpers = require('./helpers');

const compileTemplate = pathStr => async options => {
  const template = await readFile(path.join(__dirname, pathStr), 'utf8');
  return Handlebars.compile(template)(options);
};

Object.entries(helpers).forEach(([key, helper]) => {
  Handlebars.registerHelper(key, helper);
});

module.exports = {
  service: options => compileTemplate('./service.hbs')(options),
  model: options => compileTemplate('./model.hbs')(options),
  core: {},
};
