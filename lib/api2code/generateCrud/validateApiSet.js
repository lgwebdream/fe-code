// const tsj = require('ts-json-schema-generator');
const path = require('path');
const Ajv = require('ajv/dist/jtd');
const { readFile } = require('../../utils/fileSystem');

const ajv = new Ajv();

// const config = {
//   path: 'path/to/source/file',
//   tsconfig: 'path/to/tsconfig.json',
//   type: '*', // Or <type-name> if you want to generate schema for that one type only
// };

const validateApiSet = async apiSet => {
  // const schema = tsj.createGenerator(config).createSchema(config.type);
  // const schemaString = JSON.stringify(schema, null, 2);
  // console.log(schemaString);
  const schema = await readFile(path.join(__dirname, './schema.json'), 'utf8');

  const validate = ajv.compile(JSON.parse(schema));

  const res = validate(apiSet);
  console.log(res);
};

module.exports = validateApiSet;
