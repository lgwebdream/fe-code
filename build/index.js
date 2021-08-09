const { join } = require('path');
const { outputFileSync, ensureDirSync, writeJsonSync } = require('fs-extra');
const { transformArr2TrueObj } = require('../utils');
const getBabel = require('./template/babel');
const getIgnore = require('./template/ignore');
const getReadMe = require('./template/readme');
const getStyles = require('./template/style');
const { app: getTsConfig } = require('./template/tsconfig');
const reactSrcTemplate = require('./template/react17');
const vueSrcTemplate = require('./template/vue2');
const emptySrcTemplate = require('./template/empty');
const { jsonFormatted } = require('./template/lint');

const rootPath = process.cwd();
const [, , inputConfigPath] = process.argv;
const config = require(inputConfigPath);
const {
  buildTool,
  projectName,
  root,
  featureList,
  mainFramework: main,
  templatePath,
  uiFramework,
} = config;
const runner = require(join(__dirname, buildTool));
const $featureChecks = transformArr2TrueObj(featureList);
const { typescript: isTypescript, sass: isSass, less: isLess } = $featureChecks;
const $resolveRoot = join(rootPath, root, projectName);

ensureDirSync($resolveRoot);

// generate configurations
runner({
  ...config,
  $featureChecks,
  $resolveRoot,
});

// generate src template
const srcFilesMap = {
  vue: vueSrcTemplate,
  react: reactSrcTemplate,
};
(srcFilesMap[main] || emptySrcTemplate)({
  ui: uiFramework,
  main,
  projectName,
  buildTool,
  isTypescript,
  isSass,
  isLess,
})
  .concat(getStyles({ isLess, isSass }))
  .forEach(({ file, text }) => {
    if (buildTool === 'webpack' && file === 'index.html') {
      outputFileSync(join($resolveRoot, file), text);
    } else {
      outputFileSync(join($resolveRoot, templatePath, file), text);
    }
  });

// generate .gitignore
const ignore = getIgnore();
outputFileSync(join($resolveRoot, ignore.file), ignore.text);

// generate readme.md
const readme = getReadMe({ projectName });
outputFileSync(join($resolveRoot, readme.file), readme.text);

// generate TsConfig files
if (isTypescript) {
  getTsConfig({
    main,
    includePath: templatePath,
    buildTool,
  }).forEach(({ file, text }) => {
    outputFileSync(join($resolveRoot, file), text);
  });
}

if (buildTool === 'webpack') {
  // generate .babelrc
  const babel = getBabel();
  writeJsonSync(join($resolveRoot, babel.file), babel.text, jsonFormatted);
}
