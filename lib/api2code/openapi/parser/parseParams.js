/* eslint-disable @typescript-eslint/no-unused-vars */
const parseGet = ({ parameters }) => {
  return {};
};

const parsePost = ({ requestBody }) => {
  return {};
};

const parseParams = (method, request) => {
  switch (method) {
    case 'get':
      return parseGet(request);
    case 'post':
      return parsePost(request);
    default:
      return {};
  }
};

module.exports = parseParams;
