const indexJs = require('./indexJs');
const indexHtml = require('./indexHtml');
const indexHtmlTs = require('./indexHtmlTs');
const app = require('./app');
const tsIndex = require('./indexTs');
const appTs = require('./appTs');

module.exports = {
  indexHtml,
  indexJs,
  app,
};

module.exports.newIndex = ({ ui, projectName, buildTool, isTypescript }) => {
  if (isTypescript) {
    return [
      indexHtmlTs({ projectName, buildTool }),
      tsIndex({ ui }),
      appTs({ ui })
    ]
  } else {
    return [
      indexHtml({ projectName, buildTool }),
      indexJs({ ui }),
      app({ ui }),
    ];
  }
};
