const config = require('./defaultConfig');
const vueShim = {
  text: `declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}`,
  file: 'vue-shim.d.ts',
};
module.exports = ({main, includePath}) => {
  const result = [];
  if (main === 'react') {
    config.compilerOptions.jsx = 'react';
  }
  config.include.push(`./${includePath}/**/*`)
  result.push({
    text: config,
    file: 'tsconfig.json'
  });
  if (main === 'vue') {
    result.push(vueShim);
  }
  return result;
};
