// const getBody = () => {};

const parseGet = ({ parameters }) => {
  const getSchema = {};
  if (!parameters) return getSchema;
  for (const param of parameters) {
    if (param.in === 'query') {
      getSchema[param.name] = {
        required: param.required,
      };
    }
  }
  return getSchema;
};

const parsePost = ({ requestBody }) => {
  const { content } = requestBody;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const reqBody = content['application/json'];
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
