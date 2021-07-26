module.exports = ({ ui }) => {
  const commonText = `import React from 'react';`;
  let text;

  if (ui === 'antd') {
    text = `${commonText}
import { Button } from 'antd';

export default class extends React.Component {
  render() {
    return (
      <>
        <Button>Hello world!</Button>
      </>
    );
  }
}`;
  } else {
    text = `${commonText}
export default class extends React.Component {
  render () {
    return (
      <>
        <h1>Hello world!</h1>
      </>
    );
  }
}`;
  }
  return {
    text,
    file: 'App.jsx',
  };
};
