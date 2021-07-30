const RefParser = require('json-schema-ref-parser');

const parseRef = json => {
  return RefParser.bundle(json);
};

module.exports = parseRef;
