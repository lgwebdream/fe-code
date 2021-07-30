module.exports = ({ ui }) => {
  const headerText = `import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';`;

  const bodyText = `const mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);`;
  let text;

  if (ui === 'antd') {
    text = `${headerText}
import 'antd/dist/antd.css';

${bodyText}`;
  } else {
    text = `${headerText}
    
    ${bodyText}`;
  }
  return {
    text,
    file: 'index.jsx',
  };
};
