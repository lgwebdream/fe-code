const {
  noMainTemplatePath,
  vue2NoneTemplatePath,
  vue2ElementTemplatePath,
  vue2CommonTemplatePath,
  react17NoneTemplatePath,
  react17AntdTemplatePath,
  react17CommonTemplatePath,
} = require('./config');

module.exports = {
  getInitTemplate(framework, ui) {
    if (framework === 'react') {
      if (ui === 'antd') {
        return react17AntdTemplatePath;
      }
      return react17NoneTemplatePath;
    }
    if (framework === 'vue') {
      if (ui === 'element') {
        return vue2ElementTemplatePath;
      }
      return vue2NoneTemplatePath;
    }
    return noMainTemplatePath;
  },

  getCommonTemplate(framework) {
    const commons = {
      vue: vue2CommonTemplatePath,
      react: react17CommonTemplatePath,
    };
    return commons[framework];
  },
};
