module.exports = ({ projectName, buildTool, main }) => {
  return {
    file: 'README.md',
    text: `# ${projectName}

This is a/an ${projectName}.

## How to run on localhost

First install dependencies:

\`\`\`sh
npm install
\`\`\`

To run in dev mode mode:

\`\`\`sh
npm start
\`\`\`

Then go to http://localhost:8080

To create a production build:

\`\`\`sh
npm run build
\`\`\`

`,
  };
};
