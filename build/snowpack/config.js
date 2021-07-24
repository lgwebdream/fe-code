const { join } = require('path');

module.exports = {
  noMainTemplatePath: join(__dirname, 'template'),
  react17NoneTemplatePath: join(__dirname, 'template-react17/none'),
  react17AntdTemplatePath: join(__dirname, 'template-react17/antd'),
  react17CommonTemplatePath: join(__dirname, 'template-react17/common'),
  vue2NoneTemplatePath: join(__dirname, 'template-vue2/none'),
  vue2ElementTemplatePath: join(__dirname, 'template-vue2/element'),
  vue2CommonTemplatePath: join(__dirname, 'template-vue2/common'),
};
