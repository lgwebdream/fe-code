module.exports.getScript = ({ buildTool }) => {
  const scripts = {
    snowpack: '<script type="module" src="index.js"></script>',
    vite: '<script type="module" src="./index.js"></script>',
    webpack: '<script src="bundle.js"></script>',
  };
  return scripts[buildTool];
};
