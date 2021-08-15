const { join } = require('path');
const { outputFileSync, ensureDirSync, writeJsonSync } = require('fs-extra');
const { transformArr2TrueObj, formatCode } = require('../utils');
const getBabel = require('./template/babel');
const getIgnore = require('./template/ignore');
const getLint = require('./template/lint');
const getReadMe = require('./template/readme');
const { getSrcTemplate } = require('./utils');
const { app: getTsConfig } = require('./template/tsconfig');

const rootPath = process.cwd();
const [, , inputConfigPath] = process.argv;
const config = require(inputConfigPath);
const {
  buildTool,
  projectName,
  featureList,
  mainFramework,
  templatePath,
  uiFramework: ui,
} = config;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { name: main, version } = mainFramework;
const runner = require(join(__dirname, buildTool));
const $featureChecks = transformArr2TrueObj(featureList);
const {
  typescript: isTypescript,
  sass: isSass,
  less: isLess,
  lint: isLint,
  prettier: isPrettier,
} = $featureChecks;
const $resolveRoot = join(rootPath, projectName);

ensureDirSync($resolveRoot);

// generate diff
runner({
  ...config,
  $featureChecks,
  $resolveRoot,
});

// generate src template
getSrcTemplate({
  ui,
  main,
  projectName,
  buildTool,
  isTypescript,
  isSass,
  isLess,
}).forEach(({ file, text }) => {
  if (buildTool === 'webpack' && file === 'index.html') {
    outputFileSync(join($resolveRoot, file), text);
  } else {
    outputFileSync(join($resolveRoot, templatePath, file), text);
  }
});

// generate .gitignore, readme.md, eslint, TsConfig files
[
  getIgnore(),
  getReadMe({ projectName }),
  getLint({ main, isPrettier, isLint }),
  ...getTsConfig({
    main,
    buildTool,
    isTypescript,
    includePath: templatePath,
  }),
].forEach(item => {
  if (item) {
    const { file, text } = item;
    outputFileSync(join($resolveRoot, file), text);
  }
});

if (buildTool === 'webpack') {
  // generate .babelrc
  const babel = getBabel();
  writeJsonSync(join($resolveRoot, babel.file), babel.text);
}

// format code
isPrettier && formatCode($resolveRoot);
