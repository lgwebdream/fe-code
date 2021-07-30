const { readFile, writeFile } = require('./fileSystem');

const output2File = (path, data) =>
  new Promise((resolve, reject) => {
    const handleError = err => {
      reject(err);
      console.error(err);
    };
    readFile(path, {
      encoding: 'utf8',
    })
      .then(res => {
        writeFile(path, `${res}\n${data}`)
          .then(() => resolve())
          .catch(handleError);
      })
      .catch(({ errno }) => {
        if (errno === -2) {
          writeFile(path, data)
            .then(() => resolve())
            .catch(handleError);
        }
      });
  });

module.exports = output2File;
