const { outputFileSync, writeJsonSync } = require('fs-extra');
const { join } = require('path');
const { getPackageJson, getSnowpackConfigJson } = require('./utils');
const { newIndex: reactNewIndex } = require('../template/react17');
const { newIndex: vueNewIndex } = require('../template/vue2');
const { newIndex: emptyNewIndex } = require('../template/empty');

module.exports = config => {
  const {
    mainFramework: main,
    uiFramework: ui,
    projectName,
    $resolveRoot: root,
    templatePath,
    buildTool,
    $featureChecks: { typescript: isTypescript = false },
  } = config;
  const srcFilesMap = {
    vue: vueNewIndex,
    react: reactNewIndex,
  };
  (srcFilesMap[main] || emptyNewIndex)({
    ui,
    projectName,
    buildTool,
    isTypescript: false,
  }).forEach(item => {
    outputFileSync(join(root, templatePath, item.file), item.text);
  });

  // generate package.json
  writeJsonSync(
    join(root, 'package.json'),
    getPackageJson({ ui, main, projectName, isTypescript }),
    {
      spaces: 2,
    },
  );

  // generate snowpack.config.json
  writeJsonSync(
    join(root, 'snowpack.config.json'),
    getSnowpackConfigJson({ ui, main, isTypescript }),
    {
      spaces: 2,
    },
  );
};
