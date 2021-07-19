const fs = require('promise-fs');

const output2File = (path, data) =>
  new Promise((resolve, reject) => {
    const handleError = err => {
      reject(err);
      console.error(err);
    };
    fs.readFile(path, {
      encoding: 'utf8',
    })
      .then(res => {
        fs.writeFile(path, `${res}\n${data}`)
          .then(() => resolve())
          .catch(handleError);
      })
      .catch(({ errno }) => {
        if (errno === -2) {
          fs.writeFile(path, data)
            .then(() => resolve())
            .catch(handleError);
        }
      });
  });

module.exports = output2File;
