const Handlebars = require('handlebars');
const path = require('path');
const { readFile } = require('../../utils/fileSystem');
const helpers = require('./helpers');

const readTemplate = pathStr => readFile(path.join(__dirname, pathStr), 'utf8');

const compileTemplate = async (options, pathStr) => {
  const template = await readTemplate(pathStr);
  return Handlebars.compile(template)(options);
};

Object.entries(helpers).forEach(([key, helper]) => {
  Handlebars.registerHelper(key, helper);
});

module.exports = {
  service: options => compileTemplate(options, './service.hbs'),
  model: options => compileTemplate(options, './model.hbs'),
  core: {},
};
