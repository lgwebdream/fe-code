const path = require('path');
const axios = require('axios');
const { load } = require('js-yaml');
const RefParser = require('json-schema-ref-parser');
const { exists, readFile } = require('../../utils/fileSystem');
const { oasGenStatus } = require('./oraState');

const readSpecFromDisk = async input => {
  const filePath = path.resolve(process.cwd(), input);
  const fileExists = await exists(filePath);
  if (fileExists) {
    try {
      const content = await readFile(filePath, 'utf8');
      return JSON.parse(content.toString());
    } catch (e) {
      throw new Error(`Could not read OpenApi spec: "${filePath}"`);
    }
  }
  throw new Error(`Could not find OpenApi spec: "${filePath}"`);
};

const readSpecFromNetwork = url =>
  new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(res => resolve(res.data))
      .catch(err => reject(new Error(err)));
  });

const readOAS = input => {
  return /https?:\/\//.test(input)
    ? readSpecFromNetwork(input)
    : readSpecFromDisk(input);
};

const getOAS = async input => {
  oasGenStatus.read();
  const extension = path.extname(input).toLowerCase();
  const content = await readOAS(input); // get OAS from network or disk
  oasGenStatus.parse();
  return RefParser.dereference(
    /.ya?ml$/.test(extension) ? load(content) : content,
  );
};

module.exports = getOAS;
