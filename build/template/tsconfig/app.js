const { tsConfigTemplate } = require('./indexJS');
const vueHelper = require('./helper');

module.exports = type => {
  let text;
  if (type === 'react') {
    tsConfigTemplate.compilerOptions.jsx = 'react';
    text = tsConfigTemplate;
  } else if (type === 'vue') {
    text = tsConfigTemplate;
  } else {
    text = tsConfigTemplate;
  }
  return {
    text,
    vueHelper,
    file: 'tsconfig.json',
  };
};
