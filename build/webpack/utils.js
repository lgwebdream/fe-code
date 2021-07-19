const {
  noMainTemplatePath,
  vue2TemplatePath,
  react17TemplatePath,
} = require('./config');

module.exports = {
  getTemplate(framework) {
    const templates = {
      vue: vue2TemplatePath,
      react: react17TemplatePath,
    };
    return templates[framework] || noMainTemplatePath;
  },
};
