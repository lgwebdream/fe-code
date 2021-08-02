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
    text += `import './styles.scss';
`;
  }
  
  if (isLess) {
    text += `import './styles.less';
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
