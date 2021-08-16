const indexJs = require('./indexJs');
const indexHtml = require('./indexHtml');
const app = require('./app');

module.exports = ({
  ui,
  projectName,
  main,
  buildTool,
  isTypescript,
  isSass,
  isLess,
}) => {
  return [
    indexHtml({ projectName, buildTool, main, isTypescript }),
    indexJs({ ui, isSass, isLess }),
    app({ ui, isTypescript }),
  ];
};
