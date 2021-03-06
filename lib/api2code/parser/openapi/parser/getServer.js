const getServer = openApi => {
  const server = openApi.servers?.[0];
  const variables = server?.variables || {};
  let url = server?.url || '';
  for (const variable in variables) {
    if (variables.hasOwnProperty(variable)) {
      url = url.replace(`{${variable}}`, variables[variable].default);
    }
  }
  return url;
};

module.exports = getServer;
