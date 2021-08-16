const { writeJsonSync } = require('fs-extra');
const { join } = require('path');
const { getPackageJson, getSnowpackConfigJson } = require('./utils');
const { SNOWPACK_CONFIG_JSON, PACKAGE_JSON } = require('./config');

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
      ui,
      isLint,
      isPrettier,
      main,
      projectName,
      isTypescript,
      isSass,
      isLess,
    }),
  );

  // generate snowpack.config.json
  writeJsonSync(
    join($resolveRoot, SNOWPACK_CONFIG_JSON),
    getSnowpackConfigJson({ ui, main, isTypescript, isSass, isLess }),
  );
};
