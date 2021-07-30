const getOAS = require('./getOAS');
// const { writeFile } = require('../../utils/fileSystem');
// const getServer = require('./parser/getServer');
const getServices = require('./parser/getServices');
// const parseRef = require('./parseRef');

const handleOpenapi = options => {
  getOAS(options.input).then(res => {
    // writeFile(options.output, JSON.stringify(res));
    // const server = getServer(res);
    const services = getServices(res);
    console.log(services);
  });
};

module.exports = handleOpenapi;
