const Handlebars = require('handlebars');
const camelCase = require('camelcase');
const path = require('path');
const { readFile } = require('../../utils/fileSystem');
const { path2CamelCase } = require('../../utils');

const readTemplate = pathStr => readFile(path.join(__dirname, pathStr), 'utf8');

Handlebars.registerHelper('toLowerCase', str => str.toLowerCase());
Handlebars.registerHelper('path2CamelCase', str =>
  camelCase(path2CamelCase(str)),
);
// 判断两个值是否相等
Handlebars.registerHelper('diff', (v1, v2) => v1 === v2);

module.exports = {
  service: async options => {
    const serviceTemplate = await readTemplate('./service.hbs');
    return Handlebars.compile(serviceTemplate)(options);
  },
  core: {},
};
