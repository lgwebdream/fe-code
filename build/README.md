# Structure

- snowpack
  - generate package.json
  - generate snowpack.config.json
  - other config
  
- webpack
  - generate package.json
  - generate webpack.config.json
  - other config
    
- vite
  - generate package.json
  - generate vite.config.json
  - other config
    
- template: src, common
  - ignore: create `.gitignore` for all
  - readme: create `README.md` for all
  - empty: src template for empty - no uiFramework, no mainFramework, support for typescript(optional)
  - react17: src template for react 17 - mainFramework: react 17, support for antd(optional), typescript(optional)
  - vue2: src template for vue 2 - - mainFramework: vue 2, support for element-ui(optional), typescript(optional)
  - lint: support for eslint(optional), premitter(optional)
  - style: support for sass(optional), less(optional), stuly(optional)
  - unitTest: support for jest(optional), mocha(optional)
    
- index.js: generate all template
  
- utils: help functions for all

- README.md

## TODO list

君鸿：~~empty framework +tsconfig~~ vite 整合
贤明：~~vue +~~ webpack 整合
~~仙伟：react + snowpack 整合~~

- transpiler: typescript: 差整合 - snowpack done

- lint: eslint/prettier
- style: sass/postcss/less
- framework: vue3
- test: jest/mocha/chai

- plugins:
  - webpack
    - html-webpack-plugin
    - webpack bundle analyzer
    - clean webpack plugin
    - minicss extract
  - snowpack
  - vite

- global nodejs runtime issue check 
