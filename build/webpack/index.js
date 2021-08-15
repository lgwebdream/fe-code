const { writeJsonSync, outputFileSync } = require('fs-extra');
const { join } = require('path');
const { getPackageJson, getWebpackConfigJs } = require('./utils');
const { PACKAGE_JSON, WEBPACK_CONFIG_JS } = require('./config');

module.exports = ({
  mainFramework: { name: main },
  uiFramework: ui,
  projectName,
  $resolveRoot,
  $featureChecks,
}) => {
  const {
    typescript: isTypescript,
    sass: isSass,
    less: isLess,
    prettier: isPrettier,
    lint: isLint,
  } = $featureChecks;
  // generate package.json
  writeJsonSync(
    join($resolveRoot, PACKAGE_JSON),
    getPackageJson({
      isPrettier,
      isLint,
      ui,
      main,
      projectName,
      isTypescript,
      isSass,
      isLess,
    }),
  );

  // generate webpack.config.js
  outputFileSync(
    join($resolveRoot, WEBPACK_CONFIG_JS),
    getWebpackConfigJs({
      ui,
      main,
      isTypescript,
      isSass,
      isLess,
    }),
  );
};
