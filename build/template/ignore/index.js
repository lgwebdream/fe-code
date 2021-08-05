module.exports = () => {
  return {
    file: '.gitignore',
    text: `node_modules/
coverage/
dist/*
*.log

.DS_Store
.idea
`,
  };
};
