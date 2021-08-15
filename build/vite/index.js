const { writeJsonSync, outputFileSync } = require('fs-extra');
const { join } = require('path');
const { getPackageJson, getViteConfigJs } = require('./utils');
const { PACKAGE_JSON, VITE_CONFIG_JS } = require('./config');

module.exports = ({
  mainFramework: { name: main },
  uiFramework: ui,
  projectName,
  $resolveRoot,
  $featureChecks: { typescript: isTypescript, sass: isSass, less: isLess },
}) => {
  // generate package.json
  writeJsonSync(
    join($resolveRoot, PACKAGE_JSON),
    getPackageJson({ ui, main, projectName, isTypescript, isSass, isLess }),
  );

  // generate vite.config.js
  const viteConfig = getViteConfigJs({
    ui,
    main,
    isTypescript,
    sass: isSass,
    less: isLess,
  });
  outputFileSync(join($resolveRoot, VITE_CONFIG_JS), viteConfig);
};
