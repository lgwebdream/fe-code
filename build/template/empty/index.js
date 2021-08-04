const indexJs = require('./indexJs');
const indexHtml = require('./indexHtml');

module.exports = {
  indexHtml,
  indexJs,
};

module.exports.newIndex = ({ projectName, buildTool, main, isTypescript }) => {
  return [indexHtml({ projectName, buildTool, main, isTypescript }), indexJs({isTypescript})].filter(Boolean);
};
