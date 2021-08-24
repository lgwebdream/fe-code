const path = require('path');
const axios = require('axios');
const yaml = require('js-yaml');
const { exists, readFile } = require('../../utils/fileSystem');
const { parserMap } = require('../parser');

const readFromNetwork = url =>
  new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(res => resolve(res.data))
      .catch(err => reject(new Error(err)));
  });

const readFromDisk = async input => {
  const filePath = path.resolve(process.cwd(), input);
  const fileExists = await exists(filePath);
  if (fileExists) {
    try {
      const content = await readFile(filePath, 'utf8');
      return JSON.parse(content.toString());
    } catch (e) {
      throw new Error(`Could not read file: "${filePath}"`);
    }
  }
  throw new Error(`Could not find file: "${filePath}"`);
};

const readApiConfig = input => {
  return /https?:\/\//.test(input)
    ? readFromNetwork(input)
    : readFromDisk(input);
};

const getApiSet = async (input, jsonType) => {
  const extension = path.extname(input).toLowerCase();
  const isYaml = /.ya?ml$/.test(extension);
  const apiConfig = await readApiConfig(input);
  return parserMap[jsonType](isYaml ? yaml.load(apiConfig) : apiConfig);
};

module.exports = getApiSet;
