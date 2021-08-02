module.exports = ({ ui, isTypescript }) => {
  let text = `import React from 'react';
`;
  let file;
  if (ui === 'antd') {
    text += `import { Button } from 'antd';

`;
  }
  if (isTypescript) {
    file = 'App.tsx';
    if (ui === 'antd') {
      text += `const App: React.FC = () => {
  return (
    <>
      <Button>Hello world!</Button>
    </>
  );
};
`;
    } else {
      text = `const App: React.FC = () => {
  return (
    <>
      <h1>Hello world!</h1>
    </>
  );
};
`;
    }
  } else {
    file = 'App.js';
    if (ui === 'antd') {
      text += `const App = () => {
  return (
    <>
      <Button>Hello world!</Button>
    </>
  );
};
`;
    } else {
      text = `const App = () => {
  return (
    <>
      <h1>Hello world!</h1>
    </>
  );
};
`;
    }
  }
  text += `
export default App;
`;
  return {
    text,
    file,
  };
};
