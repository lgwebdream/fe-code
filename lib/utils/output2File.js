const fs = require('promise-fs');

const output2File = (path, data) => {
  fs.readFile(path, {
    encoding: 'utf8',
  })
    .then(res => {
      fs.writeFile(path, `${res}\n${data}`).catch(err => console.error(err));
    })
    .catch(({ errno }) => {
      if (errno === -2) {
        fs.writeFile(path, data).catch(err => console.error(err));
      }
    });
};

module.exports = output2File;
