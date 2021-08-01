const { join } = require('path');
const { outputFileSync, removeSync, ensureDirSync } = require('fs-extra');
const { transformArr2TrueObj } = require('./utils');

const getIgnore = require('./template/ignore');
const getReadMe = require('./template/readme');
const { app: getTsConfig } = require('./template/tsconfig');
const { newIndex: reactNewIndex } = require('./template/react17');
const { newIndex: vueNewIndex } = require('./template/vue2');
const { newIndex: emptyNewIndex } = require('./template/empty');

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
const { typescript: isTypescript } = $featureChecks;
const $resolveRoot = join(rootPath, root, projectName);

// init
removeSync($resolveRoot);
ensureDirSync($resolveRoot);

// generate configurations
// todo: remove duplicate src template
runner({
  ...config,
  $featureChecks,
  $resolveRoot,
});

if (buildTool === 'snowpack') {
  // generate src template
  const srcFilesMap = {
    vue: vueNewIndex,
    react: reactNewIndex,
  };
  (srcFilesMap[main] || emptyNewIndex)({
    ui: uiFramework,
    projectName,
    buildTool,
    isTypescript: false,
  }).forEach(({ file, text }) => {
    outputFileSync(join($resolveRoot, templatePath, file), text);
  });
}

// generate ignore files
const ignore = getIgnore();
outputFileSync(join($resolveRoot, ignore.file), ignore.text);

// generate readme.md
const readme = getReadMe({ projectName, buildTool, main });
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
