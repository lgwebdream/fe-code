const getServices = require('./parser/getServices');
const parseRef = require('./parseRef');

const parseOpenapi = async openapi => {
  const refContent = await parseRef(openapi);
  return getServices(refContent);
};

module.exports = parseOpenapi;
