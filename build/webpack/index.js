const { writeJsonSync, outputFileSync } = require('fs-extra');
const { join } = require('path');
const beautify = require('js-beautify').js;
const { getPackageJson, getWebpackConfigJs } = require('./utils');
const { PACKAGE_JSON, WEBPACK_CONFIG_JS } = require('./config');
const { jsonFormatted } = require('../template/lint');

module.exports = ({
  mainFramework: main,
  uiFramework: ui,
  projectName,
  $resolveRoot,
  $featureChecks: { typescript: isTypescript, sass: isSass, less: isLess },
}) => {
  // generate package.json
  writeJsonSync(
    join($resolveRoot, PACKAGE_JSON),
    getPackageJson({ ui, main, projectName, isTypescript, isSass, isLess }),
    jsonFormatted,
  );

  // generate webpack.config.js
  const webpackConfig = getWebpackConfigJs({
    ui,
    main,
    isTypescript,
    isSass,
    isLess,
  });
  outputFileSync(
    join($resolveRoot, WEBPACK_CONFIG_JS),
    beautify(webpackConfig, {
      indent_size: 2,
      space_in_empty_paren: true,
    }),
  );
};
