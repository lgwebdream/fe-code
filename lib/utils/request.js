const axios = require('axios');
const HttpsProxyAgent = require('https-proxy-agent');
const loadConfig = require('../loadConfig');

const { url } = loadConfig();
const httpsAgent = new HttpsProxyAgent(url);

const request = axios.create({
  httpsAgent,
});

module.exports = request;
