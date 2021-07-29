const {
  removeSync,
  ensureDirSync,
  outputFileSync,
  writeJsonSync,
} = require('fs-extra');
const { join } = require('path');
const { getPackageJson, getViteConfigJs } = require('./utils');
const {
  indexHtml: getReactIndexHtml,
  indexJs: getReactIndexJs,
  app: getReactApp,
} = require('../template/react17');
const {
  indexHtml: getVueIndexHtml,
  app: getVueApp,
  indexJs: getVueIndexJs,
} = require('../template/vue2');
const {
  indexHtml: getEmptyIndexHtml,
  indexJs: getEmptyIndexJs,
} = require('../template/empty');

const getReadMe = require('../template/readme');
const getIgnore = require('../template/ignore');

const init = root => {
  removeSync(root);
  ensureDirSync(root);
};

const process = config => {
  const {
    mainFramework: main,
    uiFramework: ui,
    projectName,
    $resolveRoot: root,
    templatePath,
    buildTool,
    $featureChecks,
  } = config;
  const { typescript: isTypescript = false } = $featureChecks;
  const resolveTemplatePath = join(root, templatePath);
  let html;
  let js;
  let app;

  if (main === 'react') {
    // generate index.html
    html = getReactIndexHtml({ projectName, buildTool });

    // generate index.js/jsx
    js = getReactIndexJs({ ui });

    // generate App.js/jsx
    app = getReactApp({ ui });
  } else if (main === 'vue') {
    // generate index.html
    html = getVueIndexHtml({ projectName, buildTool });

    // generate index.js/jsx
    js = getVueIndexJs({ ui });

    // generate App.js/jsx
    app = getVueApp({ ui });
  } else {
    // generate index.html
    html = getEmptyIndexHtml({ projectName, buildTool });

    // generate index.js/jsx
    js = getEmptyIndexJs({ ui });
  }
  // generate index.html
  outputFileSync(join(resolveTemplatePath, html.file), html.text);

  // generate index.js/jsx
  outputFileSync(join(resolveTemplatePath, js.file), js.text);

  // generate App.js/jsx
  app && outputFileSync(join(resolveTemplatePath, app.file), app.text);

  // add ignore files
  const ignore = getIgnore({ buildTool });
  outputFileSync(join(root, ignore.file), ignore.text);

  // generate vite.config.js
  const viteConfig = getViteConfigJs({ ui, main, isTypescript })
  outputFileSync(join(root, 'vite.config.js'), viteConfig);

  // generate package.json
  writeJsonSync(
    join(root, 'package.json'),
    getPackageJson({ ui, main, projectName, isTypescript }),
    {
      spaces: 2,
    },
  );


  // add readme.md
  const readme = getReadMe({ projectName, buildTool, main });
  outputFileSync(join(root, readme.file), readme.text);
};

module.exports = config => {
  init(config.$resolveRoot);
  process(config);
};
