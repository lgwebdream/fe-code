module.exports = ({ isTypescript }) => {
  let file = 'index.js';
  let text = `const mountNode = document.getElementById('app');
mountNode.innerHTML = 'hello world';
console.log('empty')`;
  if (isTypescript) {
    file = 'index.ts';
    text = `const mountNode: HTMLElement | null = document.getElementById('app');
mountNode!.innerHTML = 'hello world';

`;
  }

  return {
    text,
    file,
  };
};
