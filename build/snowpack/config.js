const { join } = require('path');

module.exports = {
  noMainTemplatePath: join(__dirname, 'template'),
  react17TemplatePath: join(__dirname, 'template-react17'),
  vue2TemplatePath: join(__dirname, 'template-vue2'),
};
