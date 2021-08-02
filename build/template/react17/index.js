const indexJs = require('./indexJs');
const indexHtml = require('./indexHtml');
const app = require('./app');

module.exports = ({
  ui,
  projectName,
  buildTool,
  isTypescript,
  isSass,
  isLess,
}) => {
  return [
    indexHtml({ projectName, buildTool }),
    indexJs({ ui, isTypescript, isSass, isLess }),
    app({ ui, isTypescript }),
  ].filter(Boolean);
};
