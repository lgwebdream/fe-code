const {getScript} = require('../utils');

module.exports = ({ projectName, buildTool }) => {
  return {
    file: 'index.html',
    text: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  ${getScript({buildTool})}
</head>
<body>
<div id="app"></div>
</body>
</html>`,
  };
};
