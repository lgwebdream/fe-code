const indexJs = require('./indexJs');
const indexHtml = require('./indexHtml');

module.exports = {
  indexHtml,
  indexJs,
};

module.exports.newIndex = ({ projectName, buildTool, main, isTypescript }) => {
  if (isTypescript) {
    return [];
  }
  return [indexHtml({ projectName, buildTool, main, isTypescript }), indexJs()].filter(Boolean);
};
