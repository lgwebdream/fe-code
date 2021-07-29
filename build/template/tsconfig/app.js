const config = require('./defaultConfig');
const vueShim = {
  text: `declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}`,
  file: 'vue-shim.d.ts',
};
const viteVueEnv = {
  text: `/// <reference types="vite/client" />`,
  file: 'vite-env.d.ts'
}
const viteVueShims = {
  text:  `declare module '*.vue' {
    import { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
  }`,
  file: 'shims-vue.d.ts'
}
  
module.exports = ({main, includePath, buildTool}) => {
  const result = [];
  if (main === 'react') {
    config.compilerOptions.jsx = 'react';
  }
  config.include.push(`./${includePath}/**/*`)
  result.push({
    text: config,
    file: 'tsconfig.json'
  });
  if (buildTool == 'snowpack') {
    if (main === 'vue') {
      result.push(vueShim);
    }
  } else if (buildTool == 'vite') {
    if(main === 'vue'){
      result.push(viteVueShims);
    }
    result.push(viteVueEnv);
  }

  return result;
};
