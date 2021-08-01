const indexJs = require('./indexJs');
const indexHtml = require('./indexHtml');
const app = require('./app');

module.exports = {
  indexHtml,
  indexJs,
  app,
};

module.exports.newIndex = ({ ui, projectName, buildTool, isTypescript }) => {
  if (isTypescript) {
    return [
      // indexHtmlTs({ projectName, buildTool }),
      // tsIndex({ ui }),
      // appTs({ ui })
    ]
  } else {
    return [
      indexHtml({ projectName, buildTool }),
      indexJs({ ui }),
      app({ ui }),
    ];
  }
};
