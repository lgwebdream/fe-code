const indexJs = require('./indexJs');
const indexHtml = require('./indexHtml');

module.exports = ({ projectName, buildTool, main, isTypescript }) => {
  return [
    indexHtml({ projectName, buildTool, main, isTypescript }),
    indexJs({ isTypescript }),
  ];
};
