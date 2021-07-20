const axios = require('axios');
const HttpsProxyAgent = require('https-proxy-agent');
const loadConfig = require('../loadConfig');

const {
  request: { url },
  headers,
} = loadConfig();
const httpsAgent = new HttpsProxyAgent(url);

const request = axios.create({
  httpsAgent,
  headers,
});

module.exports = request;
