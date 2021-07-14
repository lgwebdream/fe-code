// mock api
module.exports = {
  'GET /mock/json/list': {
    result: [
      { id: 1, name: '张三', age: 18, title: 'cto' },
      { id: 2, name: '李四', age: 19, title: 'coo' },
      { id: 3, name: '王五', age: 20, title: 'cfo' },
    ],
    success: true,
  },
  'GET /mock/json/add': {
    result: { id: 2, name: '张三', age: 18, title: 'cto' },
    success: true,
  },
  'GET /mock/json/edit': {
    result: { id: 3, name: '张三', age: 18, title: 'cto' },
    success: true,
  },
  'GET /mock/json/delete': {
    result: 3,
    success: true,
  },
  'GET /mock/json/export': {
    result: 'hello world',
    success: true,
  },
};
