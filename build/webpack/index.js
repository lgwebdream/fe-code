const { writeJsonSync, outputFileSync } = require('fs-extra');
const { join } = require('path');
const { getPackageJson, getWebpackConfigLib, getWebpackConfigJSON } = require('./utils');
const { WEBPACK_CONFIG_JS, PACKAGE_JSON } = require('./config');
const { jsonFormatted } = require('../template/lint');

module.exports = ({
  mainFramework: main,
  uiFramework: ui,
  projectName,
  $resolveRoot,
  $featureChecks: { typescript: isTypescript = false },
}) => {
  // generate package.json
  writeJsonSync(
    join($resolveRoot, PACKAGE_JSON),
    getPackageJson({ ui, main, projectName, isTypescript }),
    jsonFormatted,
  );

  // generate webpack.config.js
  outputFileSync(
    join($resolveRoot, WEBPACK_CONFIG_JS),
    `${getWebpackConfigLib({ ui, main, isTypescript })} const config = ${JSON.stringify(getWebpackConfigJSON({ ui, main, isTypescript }))}`
  );
};
