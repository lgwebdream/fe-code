module.exports = ({isTypescript}) => {
  let file = 'App.js';
  let text = `const mountNode = document.getElementById('app');
mountNode.innerHTML = 'hello world';
console.log('empty')`;
  if(isTypescript){
    file = 'App.ts';
    text = `const mountNode:HTMLDivElement = document.getElementById('app');
mountNode.innerHTML = 'hello world';
console.log('empty')`;
  }

  return {
    text,
    file: file,
  };
};
