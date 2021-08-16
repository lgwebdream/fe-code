const parseOpenapi = require('./openapi');

const parserMap = {
  Custom: apiConfig => apiConfig, // 内部自定义的数据结构
  OpenAPI: apiConfig => parseOpenapi(apiConfig),
  // ...
};

module.exports = { parserMap };
