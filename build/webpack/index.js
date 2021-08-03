const { writeJsonSync, outputFileSync } = require('fs-extra');
const { join } = require('path');
const { getPackageJson, getWebpackConfigJs } = require('./utils');
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
  const webpackConfig = getWebpackConfigJs({ ui, main, projectName, isTypescript });
  outputFileSync(join($resolveRoot, 'webpack.config.js'), webpackConfig);
};
