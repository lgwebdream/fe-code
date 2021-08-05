module.exports = ({isTypescript}) => {
  let file = 'index.js';
  let text = `const mountNode = document.getElementById('app');
mountNode.innerHTML = 'hello world';
console.log('empty')`;
  if(isTypescript){
    file = 'index.ts';
    text = `const mountNode:HTMLDivElement = document.getElementById('app');
mountNode.innerHTML = 'hello world';
console.log('empty')`;
  }

  return {
    text,
    file: file,
  };
};
