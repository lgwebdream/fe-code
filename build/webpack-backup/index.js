const { join } = require('path');
const { writeJsonSync, outputFileSync } = require('fs-extra');
const { getPackageJson, getWebpackConfigJs } = require('./utils');
const { WEBPACK_CONFIG_JS, PACKAGE_JSON } = require('./config');
const { jsonFormatted } = require('../template/lint');
const {
  indexHtml: getVueIndexHtml,
  app: getVueApp,
  indexJs: getVueIndexJs,
} = require('../template/vue2');

const getReactInfo = require('../template/react17')

module.exports = ({
  mainFramework: main,
  uiFramework: ui,
  projectName,
  buildTool,
  templatePath,
  $resolveRoot,
  $featureChecks: { typescript: isTypescript = false },
}) => {
  const resolveTemplatePath = join($resolveRoot, templatePath);
  if(main === 'vue') {
    // generate index.html
    html = getVueIndexHtml({ projectName, buildTool });
    // generate index.js/jsx
    js = getVueIndexJs({ ui });
    // generate App.js/jsx
    app = getVueApp({ ui });
  } else if(main === 'react') {
    // generate index.html
    // html = getReactInfo({ projectName, buildTool });
    // // generate index.js/jsx
    // js = getReactInfo({ ui });
    // // generate App.js/jsx
    // app = getReactInfo({ ui });
    // generate index.html
    html = getVueIndexHtml({ projectName, buildTool });
    // generate index.js/jsx
    js = getVueIndexJs({ ui });
    // generate App.js/jsx
    app = getVueApp({ ui });
  }

  // generate index.html
  outputFileSync(join(resolveTemplatePath, html.file), html.text);

  // generate index.js/jsx
  outputFileSync(join(resolveTemplatePath, js.file), js.text);

  // generate App.js/jsx
  app && outputFileSync(join(resolveTemplatePath, app.file), app.text);

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
