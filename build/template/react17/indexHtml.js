const { getScript } = require('../utils');

module.exports = ({ projectName, buildTool, main, isTypescript }) => {
  return {
    file: 'index.html',
    text: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${projectName}</title>
  ${getScript({ buildTool, main, isTypescript })}
</head>
<body>
<div id="app"></div>
</body>
</html>`,
  };
};
