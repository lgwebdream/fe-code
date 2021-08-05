const indexJs = require('./indexJs');
const indexHtml = require('./indexHtml');
const app = require('./app');

module.exports = ({ ui, projectName, buildTool, main, isTypescript }) => {
  if (isTypescript) {
    return [
      // indexHtmlTs({ projectName, buildTool }),
      // tsIndex({ ui }),
      // appTs({ ui })
    ];
  }
  return [
    indexHtml({ projectName, buildTool, main, isTypescript }),
    indexJs({ ui }),
    app({ ui }),
  ];
};
