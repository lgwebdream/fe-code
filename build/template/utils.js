module.exports.getScript = ({ buildTool, main, isTypescript }) => {
  const viteScriptObj = {
    emptyJs: '<script type="module" src="./index.js"></script>',
    emptyTs: '<script type="module" src="./index.ts"></script>',
    reactJs: '<script type="module" src="./index.jsx"></script>',
    reactTs: '<script type="module" src="./index.tsx"></script>',
  };
  let viteScript = '';
  let isTs = '';
  switch (main) {
    case 'react':
      isTs = isTypescript ? 'reactTs' : 'reactJs';
      viteScript = viteScriptObj[isTs];
      break;
    case 'none':
      isTs = isTypescript ? 'emptyTs' : 'emptyJs';
      viteScript = viteScriptObj[isTs];
      break;
    default:
      viteScript = viteScriptObj.emptyJs;
  }

  const scripts = {
    snowpack: '<script type="module" src="index.js"></script>',
    vite: viteScript,
    webpack: '<script src="bundle.js"></script>',
  };
  return scripts[buildTool];
};
