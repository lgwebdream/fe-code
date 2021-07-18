const {
  readJsonSync,
  writeJsonSync,
  readFileSync,
  outputFileSync,
} = require('fs-extra');

module.exports = {
  setPackageProps(path, props) {
    const pkg = readJsonSync(path);
    Reflect.ownKeys(props).forEach(p => {
      pkg[p] = props[p];
    });
    writeJsonSync(path, pkg, {
      spaces: 2,
    });
  },
  addReadMe(path, name) {
    const oldReadMe = readFileSync(path.toString());
    const newReadme = `# ${name} \n\nThis is a/an ${name}. \n\n${oldReadMe}`;
    outputFileSync(path, newReadme);
  },
};
