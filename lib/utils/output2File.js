const fs = require('promise-fs');
const path = require('path');

const output2File = (dir, filename='', data) =>
  new Promise((resolve, reject) => {
    const handleError = err => {
      reject(err);
      console.error(err);
    };

    const completeDir = path.join(dir,  filename);
    console.log(completeDir);
    fs.readFile(completeDir, {
      encoding: 'utf8',
    })
      .then(res => {
        fs.writeFile(completeDir, `${res}\n${data}`)
          .then(() => resolve())
          .catch(handleError);
      })
      .catch(err => {
        const {errno} = err;
        // no directory or filename
        if (errno === -2 || errno === -4058) {
          fs.mkdirSync(dir,{recursive:true});
          fs.writeFile(completeDir, data)
            .then(() => resolve())
            .catch(handleError);
        }
      });
  });

module.exports = output2File;
