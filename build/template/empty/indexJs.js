module.exports = () => {
  const text = `const mountNode = document.getElementById('app');
      mountNode.innerHTML = 'hello world';
      console.log('empty')`;
  return {
    text,
    file: 'App.js',
  };
};
