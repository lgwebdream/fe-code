const {getScript} = require('../utils');

module.exports = ({ projectName,buildTool }) => {
  return {
    file: 'index.html',
    text: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${projectName}</title>
  ${getScript({buildTool})}
  <%- injectScript %>
</head>
<body>
<div id="app"></div>
</body>
</html>`,
  };
};
