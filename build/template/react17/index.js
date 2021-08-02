const indexJs = require('./indexJs');
const indexHtml = require('./indexHtml');
const sass = require('./sass');
const less = require('./less');
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
    sass({ isSass }),
    less({ isLess }),
  ].filter(Boolean);
};
