const { sassName, lessName } = require('../../config');
module.exports = ({ ui, isTypescript, isSass, isLess }) => {
  let text = `import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
`;

  let file = 'index.jsx';
  if (ui === 'antd') {
    text += `import 'antd/dist/antd.css';
`;
  }
  if (isSass) {
    text += `import './${sassName}';
`;
  }

  if (isLess) {
    text += `import './${lessName}';
`;
  }

  text += `
const mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);
`;

  if (isTypescript) {
    file = 'index.tsx';
  }
  return {
    text,
    file,
  };
};
